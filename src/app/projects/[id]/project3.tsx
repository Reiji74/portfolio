import type { Project } from "./projects";

const pcStatsCode = `#include <Arduino.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <ArduinoJson.h>

// ─── Display Config ────────────────────────────────────────────────
#define LCD_ADDR    0x27   // Try 0x3F if display is blank
#define LCD_COLS    20
#define LCD_ROWS    4

#define OLED_ADDR   0x3C
#define OLED_WIDTH  128
#define OLED_HEIGHT 64
#define OLED_RESET  -1

// ─── Alert Threshold ───────────────────────────────────────────────
#define TEMP_ALERT  85     // °C

// ─── Objects ───────────────────────────────────────────────────────
LiquidCrystal_I2C lcd(LCD_ADDR, LCD_COLS, LCD_ROWS);
Adafruit_SSD1306 oled(OLED_WIDTH, OLED_HEIGHT, &Wire, OLED_RESET);

// ─── Hardware Data Struct ──────────────────────────────────────────
struct HWData {
  float cpuLoad;
  float cpuTemp;
  float cpuClock;
  float gpuLoad;
  float gpuTemp;
  float gpuClock;
  float gpuVramUsed;
  float gpuVramTotal;
  float ramUsed;
  float ramTotal;
  float diskCFree;
  float diskDFree;
  bool  valid;
};

HWData hw = {0};

// ─── Custom LCD Characters ─────────────────────────────────────────
byte barFull[8]  = {0b11111,0b11111,0b11111,0b11111,0b11111,0b11111,0b11111,0b11111};
byte barEmpty[8] = {0b11111,0b00000,0b00000,0b00000,0b00000,0b00000,0b00000,0b11111};

// ─── Helpers ───────────────────────────────────────────────────────

// Draw a 20-char LCD bar: label(4) + "[" + bar(12) + "]" + value(3)
void lcdBar(uint8_t row, const char* label, float pct) {
  lcd.setCursor(0, row);
  lcd.print(label);  // 4 chars
  lcd.print("[");
  int filled = (int)(pct / 100.0f * 12.0f);
  for (int i = 0; i < 12; i++) {
    lcd.write(i < filled ? (byte)0 : (byte)1);
  }
  lcd.print("]");
  // remaining 3 chars: percentage
  char buf[4];
  snprintf(buf, sizeof(buf), "%3d", (int)pct);
  lcd.print(buf);
}

// Print a fixed-width LCD row (20 chars)
void lcdRow(uint8_t row, const char* fmt, ...) {
  char buf[21];
  va_list args;
  va_start(args, fmt);
  vsnprintf(buf, sizeof(buf), fmt, args);
  va_end(args);
  lcd.setCursor(0, row);
  lcd.print(buf);
  // Pad with spaces to clear old chars
  int len = strlen(buf);
  for (int i = len; i < LCD_COLS; i++) lcd.print(' ');
}

// Draw an OLED horizontal progress bar
void oledBar(int x, int y, int w, int h, float pct, const char* label) {
  oled.setTextSize(1);
  oled.setTextColor(SSD1306_WHITE);
  oled.setCursor(x, y);
  oled.print(label);

  int barX = x;
  int barY = y + 9;
  int fill = (int)(pct / 100.0f * w);
  oled.drawRect(barX, barY, w, h, SSD1306_WHITE);
  oled.fillRect(barX, barY, fill, h, SSD1306_WHITE);

  // Percentage label at end
  char pctBuf[5];
  snprintf(pctBuf, sizeof(pctBuf), "%3d%%", (int)pct);
  oled.setCursor(barX + w + 2, barY);
  oled.print(pctBuf);
}

// Draw alert icon (exclamation triangle) at given position
void oledAlert(int x, int y) {
  // Triangle outline
  oled.drawTriangle(x+8, y, x, y+14, x+16, y+14, SSD1306_WHITE);
  oled.setCursor(x+6, y+4);
  oled.setTextSize(1);
  oled.print("!");
}

// ─── Display Update Functions ──────────────────────────────────────

void updateLCD() {
  // Row 0: CPU info
  lcdRow(0, "CPU:%5.1f%% %.2f GHz", hw.cpuLoad, hw.cpuClock / 1000.0);

  // Row 1: GPU info
  lcdRow(1, "GPU:%5.1f%% %2.0fC", hw.gpuLoad, hw.gpuTemp);

  // Row 2: RAM & VRAM
  lcdRow(2, "R:%.0f/%.0fG V:%.0f/%.0fG", hw.ramUsed, hw.ramTotal, hw.gpuVramUsed, hw.gpuVramTotal);

  // Row 3: Storage
  lcdRow(3, "C:%.0fG D:%.0fG Free", hw.diskCFree, hw.diskDFree);
}

void updateOLED() {
  oled.clearDisplay();

  bool cpuAlert = hw.cpuTemp >= TEMP_ALERT;
  bool gpuAlert = hw.gpuTemp >= TEMP_ALERT;

  // CPU bar  (top half)
  char cpuLabel[24];
  snprintf(cpuLabel, sizeof(cpuLabel), "CPU Util: %.0f%%  %.0fC", hw.cpuLoad, hw.cpuTemp);
  oledBar(0, 0, cpuAlert ? 90 : 112, 8, hw.cpuLoad, cpuLabel);
  if (cpuAlert) oledAlert(110, 0);

  // GPU bar (bottom half)
  char gpuLabel[24];
  snprintf(gpuLabel, sizeof(gpuLabel), "GPU Util: %.0f%%  %.0fC", hw.gpuLoad, hw.gpuTemp);
  oledBar(0, 32, gpuAlert ? 90 : 112, 8, hw.gpuLoad, gpuLabel);
  if (gpuAlert) oledAlert(110, 32);

  oled.display();
}

void showWaiting() {
  lcd.setCursor(0, 0);
  lcd.print("  PC Monitor v1.0   ");
  lcd.setCursor(0, 1);
  lcd.print(" Waiting for data...");
  lcd.setCursor(0, 2);
  lcd.print("  Connect PC agent  ");
  lcd.setCursor(0, 3);
  lcd.print("   via USB Serial   ");

  oled.clearDisplay();
  oled.setTextSize(1);
  oled.setTextColor(SSD1306_WHITE);
  oled.setCursor(10, 20);
  oled.print("Waiting for PC...");
  oled.display();
}

// ─── Serial JSON Parser ────────────────────────────────────────────

void parseSerial(const String& line) {
  JsonDocument doc;
  DeserializationError err = deserializeJson(doc, line);
  if (err) return;

  hw.cpuLoad      = doc["cpu_load"]      | 0.0f;
  hw.cpuTemp      = doc["cpu_temp"]      | 0.0f;
  hw.cpuClock     = doc["cpu_clock"]     | 0.0f;
  hw.gpuLoad      = doc["gpu_load"]      | 0.0f;
  hw.gpuTemp      = doc["gpu_temp"]      | 0.0f;
  hw.gpuClock     = doc["gpu_clock"]     | 0.0f;
  hw.gpuVramUsed  = doc["gpu_vram_used"] | 0.0f;
  hw.gpuVramTotal = doc["gpu_vram_total"]| 0.0f;
  hw.ramUsed      = doc["ram_used"]      | 0.0f;
  hw.ramTotal     = doc["ram_total"]     | 0.0f;
  hw.diskCFree    = doc["disk_c_free"]   | 0.0f;
  hw.diskDFree    = doc["disk_d_free"]   | 0.0f;
  hw.valid = true;
}

// ─── Setup & Loop ──────────────────────────────────────────────────

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);  // SDA, SCL

  // LCD init
  lcd.init();
  lcd.backlight();
  lcd.createChar(0, barFull);
  lcd.createChar(1, barEmpty);

  // OLED init
  if (!oled.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR)) {
    lcd.setCursor(0, 0);
    lcd.print("OLED init failed!   ");
    while (true);
  }
  oled.clearDisplay();
  oled.display();

  showWaiting();
}

void loop() {
  // Read full JSON lines from Serial
  if (Serial.available()) {
    String line = Serial.readStringUntil('\n');
    line.trim();
    int jsonStart = line.indexOf('{');
    if (jsonStart >= 0) {
      parseSerial(line.substring(jsonStart));
    }
  }

  if (hw.valid) {
    updateLCD();
    updateOLED();
  }

  delay(500);
}`

const pcStatsPlatformIO = `[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200
 
lib_deps =
    marcoschwartz/LiquidCrystal_I2C@^1.1.4
    adafruit/Adafruit SSD1306@^2.5.7
    adafruit/Adafruit GFX Library@^1.11.9
    bblanchon/ArduinoJson@^7.0.0`

const pcStatsPython = `"""
PC Hardware Monitor Agent — Windows Edition
=======================================================
Reads CPU, GPU, RAM, and Disk stats then sends them as JSON
over USB Serial to the ESP32 every 2 seconds.

// ... [Rest of your pcStatsPython script] ...

if __name__ == "__main__":
    main()
`

const pcStatsOverview = (
  <div className="space-y-6 text-slate-300">
    <p>
      A complete hardware monitor solution displaying live statistics from a Windows PC. 
      The ESP32 reads data over USB Serial sent by a lightweight Python agent.
    </p>

    <div className="space-y-3">
      <h3 className="text-xl font-gotham font-bold uppercase tracking-widest text-slate-50 border-b-2 border-dashed border-slate-400/30 pb-2 inline-block">Setup</h3>
      
      <div className="space-y-2">
        <h4 className="font-gotham uppercase tracking-wide text-slate-200 mt-4 mb-2">1. ESP32 Firmware (PlatformIO)</h4>
        <ol className="list-decimal list-inside space-y-1 ml-2 text-sm font-gotham-book">
          <li>Open <code>pc_monitor/</code> folder in VSCode with PlatformIO</li>
          <li>Build & Upload &rarr; <code>platformio.ini</code> handles all libraries</li>
          <li>ESP32 shows <em>"Waiting for PC..."</em> until the Python agent connects</li>
        </ol>
      </div>

      <div className="space-y-2 mt-4">
        <h4 className="font-gotham uppercase tracking-wide text-slate-200 mt-4 mb-2">2. Python Agent (Windows PC)</h4>
        <p className="text-sm font-gotham-book"><strong>Install dependencies:</strong></p>
        <pre className="bg-[#405CB1]/70 p-3 rounded-none text-xs font-mono overflow-x-auto text-slate-200 border-2 border-dashed border-slate-400/30">
          <code>pip install pyserial psutil wmi</code>
        </pre>
        
        <p className="text-sm font-gotham-book mt-3"><strong>Install LibreHardwareMonitor:</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-2 text-sm font-gotham-book">
          <li>Download from <a href="https://github.com/LibreHardwareMonitor/LibreHardwareMonitor/releases" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white hover:underline">GitHub</a></li>
          <li>Run <code>LibreHardwareMonitor.exe</code> <strong>as Administrator</strong> (required for temp sensors)</li>
          <li><strong>Important:</strong> In the app, click <strong>Options &rarr; Remote Web Server &rarr; Run</strong> (Port 8085). The Python script relies on this to bypass Windows WMI bugs.</li>
          <li>Leave it running in the background</li>
        </ul>

        <p className="text-sm font-gotham-book mt-3"><strong>Run the agent:</strong></p>
        <pre className="bg-[#405CB1]/70 p-3 rounded-none text-xs font-mono overflow-x-auto text-slate-200 border-2 border-dashed border-slate-400/30">
          <code>python pc_agent.py</code>
        </pre>
        <p className="text-xs font-gotham-book mt-1 text-slate-300">Auto-detects the ESP32 COM port. Override with <code>--port COM5</code></p>
      </div>
    </div>

    <div className="space-y-3">
      <h3 className="text-xl font-gotham font-bold uppercase tracking-widest text-slate-50 border-b-2 border-dashed border-slate-400/30 pb-2 inline-block">What each display shows</h3>
      
      <h4 className="font-gotham uppercase tracking-wide text-slate-200 mt-4 mb-2">20x4 LCD</h4>
      <ul className="list-disc list-inside space-y-1 ml-2 text-sm font-gotham-book">
        <li><strong>Row 0:</strong> CPU Load% and Clock GHz</li>
        <li><strong>Row 1:</strong> GPU Load% and Temp &deg;C</li>
        <li><strong>Row 2:</strong> RAM & VRAM Used / Total GB</li>
        <li><strong>Row 3:</strong> C: and D: drive free space GB</li>
      </ul>

      <h4 className="font-gotham uppercase tracking-wide text-slate-200 mt-4 mb-2">0.96" OLED</h4>
      <ul className="list-disc list-inside space-y-1 ml-2 text-sm font-gotham-book">
        <li><strong>Top half:</strong> CPU Util progress bar + current temp</li>
        <li><strong>Bottom half:</strong> GPU Util progress bar + current temp</li>
        <li><strong>Alert icon (!):</strong> Appears if CPU or GPU temp &ge; 85&deg;C</li>
      </ul>
    </div>
  </div>
);

export const project3: Project = {
  id: "esp32-security-camera",
  title: "ESP32 PC Stats Monitor",
  description: "An ESP32-based hardware monitor that receives real-time PC statistics via a Python agent and displays them on an OLED and LCD screen.",
  tech: ["ESP32", "Python", "I2C LCD 20x4", "OLED", "ArduinoJson"],
  difficulty: "Medium",
  overviewContent: pcStatsOverview,
  image: "/IMG_20260502_122212.jpg",
  code: pcStatsCode,
  platformioIni: pcStatsPlatformIO,
  pythonCode: pcStatsPython,
  wiringDiagram: "/2nd project.png",
  notes: `• The ESP32 receives PC hardware statistics and displays them in real-time.
• The LCD is used to show CPU, GPU, RAM, VRAM, and free space for Drive C and D.
• The OLED can be used for graphical representations or additional stats.

Troubleshooting:
• LCD blank: Try changing LCD_ADDR to 0x3F in main.cpp
• GPU / CPU shows 0: Run LibreHardwareMonitor as Administrator and ensure the Remote Web Server is running on Port 8085.
• "No port found": Check Device Manager for ESP32 COM port, use --port COMx
• Garbled LCD text: Check I2C address with an I2C scanner sketch
• CPU clock stuck at base: Your laptop's MSR is locked. Ensure LHM is running as Admin so Python can pull the live Performance Counters.`,
};