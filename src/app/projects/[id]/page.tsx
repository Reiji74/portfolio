"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, use, useRef, MouseEvent } from "react"
import { ArrowLeft, Copy, ChevronDown, ChevronUp, ZoomIn, ZoomOut, X } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { ThemeToggle } from "@/components/theme-toggle"

type Project = {
  title: string
  description: string
  image: string
  code: string
  platformioIni?: string
  wiringDiagram?: string
  notes?: string
}

const motorCode = `#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// ---- OLED Setup ----
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// ---- Pin Definitions ----
#define IN1     27
#define IN2     26
#define ENA     14
#define POT_PIN 34

// ---- PWM Setup ----
#define PWM_CHANNEL   0
#define PWM_FREQ      1000   // 1kHz
#define PWM_RESOLUTION 8     // 8-bit = 0 to 255

void setup() {
  Serial.begin(115200);

  // Motor pins
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);

  // Set motor direction (forward)
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);

  // PWM setup
  ledcSetup(PWM_CHANNEL, PWM_FREQ, PWM_RESOLUTION);
  ledcAttachPin(ENA, PWM_CHANNEL);

  // OLED init
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED not found!");
    while (true);
  }
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("Motor Speed Control");
  display.display();
  delay(1500);
}

void loop() {
  // Read potentiometer (0 - 4095)
  int potValue = analogRead(POT_PIN);

  // Map to PWM duty cycle (0 - 255)
  int pwmValue = map(potValue, 0, 4095, 0, 255);

  // Map to percentage for display (0 - 100%)
  int speedPercent = map(potValue, 0, 4095, 0, 100);

  // Apply PWM to motor
  ledcWrite(PWM_CHANNEL, pwmValue);

  // Update OLED
  display.clearDisplay();

  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("  Motor Speed Control");
  display.drawLine(0, 10, 127, 10, SSD1306_WHITE);

  display.setTextSize(2);
  display.setCursor(30, 20);
  display.print(speedPercent);
  display.print(" %");

  display.setTextSize(1);
  display.setCursor(0, 48);
  display.print("PWM: ");
  display.print(pwmValue);
  display.print("  RAW: ");
  display.print(potValue);

  display.display();

  delay(100);
}`

const mediaStreamerCode = `#include <Arduino.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <LittleFS.h>
#include "BluetoothA2DPSource.h"
#include <freertos/FreeRTOS.h>
#include <freertos/semphr.h>

// Initialize LCD (Try 0x27 first, if it fails, try 0x3F)
LiquidCrystal_I2C lcd(0x27, 20, 4);
Adafruit_SSD1306 oled(128, 64, &Wire, -1);

// Bluetooth Audio
BluetoothA2DPSource a2dp_source;
File audioFile;
SemaphoreHandle_t fsMutex;

// Video constants
File videoFile;
const int FRAME_SIZE = 1024;
uint8_t frameBuffer[FRAME_SIZE];

unsigned long startTime;
unsigned long lastLCDUpdate = 0;
bool systemActive = false;

// The Bluetooth speaker calls this when it needs more sound bytes
// This function must be fast and non-blocking.
int32_t get_audio_data(Frame *data, int32_t frameCount) {
    if (frameCount <= 0) return 0;

    // Use a mutex to prevent simultaneous access to LittleFS from different tasks.
    // The '0' timeout means we don't block the real-time audio task.
    if (xSemaphoreTake(fsMutex, 0) != pdTRUE) {
        // If the mutex is locked (e.g., by video task), fill with silence to avoid audio stutter.
        memset(data, 0, frameCount * sizeof(Frame));
        return frameCount;
    }

    if (!audioFile) {
        memset(data, 0, frameCount * sizeof(Frame));
        xSemaphoreGive(fsMutex);
        return frameCount;
    }

    // We read mono 16-bit samples from the file and duplicate them for stereo.
    // 1 Frame = 1 stereo sample (Left + Right).
    size_t bytes_to_read_from_file = frameCount * 2;

    // A static buffer is safer and faster than dynamic allocation.
    const int mono_buffer_size = 1024;
    static uint8_t mono_buffer[mono_buffer_size];

    if (bytes_to_read_from_file > mono_buffer_size) {
        bytes_to_read_from_file = mono_buffer_size;
    }

    // Read from file into the temporary mono buffer
    size_t bytes_read = audioFile.read(mono_buffer, bytes_to_read_from_file);

    // If we reached the end of the file, loop and read the rest to fill the buffer
    if (bytes_read < bytes_to_read_from_file) {
        audioFile.seek(0);
        bytes_read += audioFile.read(mono_buffer + bytes_read, bytes_to_read_from_file - bytes_read);
    }

    xSemaphoreGive(fsMutex); // Release the mutex

    // Expand mono samples to interleaved stereo in the output Frame buffer
    int16_t *samples_in = (int16_t*)mono_buffer;
    int mono_samples_read = bytes_read / 2;
    for (int i = 0; i < mono_samples_read; i++) {
        data[i].channel1 = samples_in[i]; // Left channel
        data[i].channel2 = samples_in[i]; // Right channel
    }

    // Fill any remaining frames with silence
    if (mono_samples_read < frameCount) {
        memset(data + mono_samples_read, 0, (frameCount - mono_samples_read) * sizeof(Frame));
    }

    return frameCount;
}

void setup() {
    Serial.begin(115200);

    // I2C Pins for ESP32
    Wire.begin(21, 22);
    Wire.setClock(400000);

    // LCD Startup
    lcd.init();
    lcd.backlight();
    lcd.setCursor(0, 0);
    lcd.print("Initializing...");

    if(!oled.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println("OLED Check Failed");
        while(1);
    }

    if(!LittleFS.begin()) {
        Serial.println("LittleFS Mount Failed");
        lcd.setCursor(0,1); lcd.print("FS Error!");
        while(1);
    }

    fsMutex = xSemaphoreCreateMutex();

    audioFile = LittleFS.open("/audio.bin", "r");
    if (!audioFile) {
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("No audio.bin");
        lcd.setCursor(0, 1);
        lcd.print("Skipping Audio...");
        delay(2000);
    } else {
        // Start Bluetooth A2DP source, connecting to your speaker
        a2dp_source.start("X2", get_audio_data);

        // Wait for Bluetooth to connect with a timeout and feedback
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Connecting BT...");
        unsigned long bt_connect_start = millis();
        while(!a2dp_source.is_connected() && millis() - bt_connect_start < 10000) { // 10 second timeout
            lcd.print(".");
            delay(500);
        }

        if (a2dp_source.is_connected()) {
            lcd.clear();
            lcd.setCursor(0,0);
            lcd.print("BT Connected!");
            delay(1000);
        } else {
            lcd.clear();
            lcd.setCursor(0,0);
            lcd.print("BT Failed!");
            delay(2000); // Allow user to see the message
        }
    }

    // 5 Second Large Countdown
    for(int i = 5; i > 0; i--) {
        oled.clearDisplay();
        oled.setTextSize(4);
        oled.setTextColor(WHITE);
        oled.setCursor(50, 15);
        oled.print(i);
        oled.display();

        lcd.setCursor(0, 1);
        lcd.printf("Starting in: %d ", i);
        delay(1000);
    }

    xSemaphoreTake(fsMutex, portMAX_DELAY);
    videoFile = LittleFS.open("/video.bin", "r");
    if(!videoFile) {
        xSemaphoreGive(fsMutex);
        lcd.clear();
        lcd.print("video.bin not found");
        while(1);
    }
    xSemaphoreGive(fsMutex);

    lcd.clear();
    startTime = millis();
    systemActive = true;
}

const int TARGET_FPS = 20;
const int FRAME_INTERVAL = 1000 / TARGET_FPS;
unsigned long nextFrameTime = 0;

void loop() {
    if(!systemActive) return;

    unsigned long now = millis();

    // --- DETERMINISTIC VIDEO TIMING ---
    if (now >= nextFrameTime) {
        if (nextFrameTime == 0) { nextFrameTime = now; }
        nextFrameTime += FRAME_INTERVAL;
        
        bool hasData = false;

        // Use a mutex to safely access the filesystem, but keep it brief!
        xSemaphoreTake(fsMutex, portMAX_DELAY);
        if (videoFile.available() >= FRAME_SIZE) {
            videoFile.read(frameBuffer, FRAME_SIZE);
            hasData = true;
        } else {
            videoFile.seek(0); // Loop the video
            startTime = millis(); // Reset sync timer on loop
        }
        xSemaphoreGive(fsMutex);

        // Execute the slow OLED rendering outside of the filesystem mutex
        // to prevent blocking the real-time Bluetooth audio task.
        if (hasData) {
            oled.clearDisplay();
            oled.drawBitmap(0, 0, frameBuffer, 128, 64, WHITE);
            oled.display();
        }
    }

    // --- LCD PROGRESS (Low Priority) ---
    // We update the LCD only in the gaps between video frames
    if (now - lastLCDUpdate > 250) {
        lastLCDUpdate = now;
        float seconds = (now - startTime) / 1000.0;

        // Calculate clamped progress values
        int currentSem = (seconds >= 19.0) ? 6 : (int)((seconds / 19.0) * 6);
        int progress = (seconds >= 19.0) ? 50 : (int)((seconds / 19.0) * 50);

        // Always update Lines 1 & 2 to ensure they reach exactly 6/12 and 50%
        // Fixed formatting constraint to remain exactly 20 characters wide!
        lcd.setCursor(0, 0);
        lcd.printf("%2d/12     LOADING...", currentSem);
        lcd.setCursor(0, 1);
        lcd.print("[");
        int filledBlocks = (progress * 14) / 100; // max 100% maps to 14 blocks
        for (int i = 0; i < 14; i++) {
            if (i < filledBlocks) lcd.write(0xFF); // Solid block character
            else lcd.print("=");                   // Empty space filler
        }
        lcd.printf("] %2d%%", progress); // Fixed spacing to prevent cut-off

        if (seconds > 19.0) {
            // Typewriter effect (10 characters per second)
            int typeIndex = (int)((seconds - 19.0) * 10.0);
            if (typeIndex > 40) typeIndex = 40;

            char buf3[21] = "                    "; // 20 spaces
            char buf4[21] = "                    ";
            const char* msg1 = "    GOOD JOB !!!    ";
            const char* msg2 = "YOU ARE HALFWAY DONE";

            if (typeIndex < 20) {
                for (int i = 0; i < typeIndex; i++) buf3[i] = msg1[i];
                buf3[typeIndex] = '_';
            } else {
                strcpy(buf3, msg1);
                if (typeIndex < 40) {
                    for (int i = 0; i < typeIndex - 20; i++) buf4[i] = msg2[i];
                    buf4[typeIndex - 20] = '_';
                } else {
                    strcpy(buf4, msg2);
                }
            }

            lcd.setCursor(0, 2);
            lcd.print(buf3);
            lcd.setCursor(0, 3);
            lcd.print(buf4);
        } else {
            lcd.setCursor(0, 2); lcd.print("                    ");
            lcd.setCursor(0, 3); lcd.print("                    ");
        }
    }
}`

const mediaStreamerPlatformIO = `[env:esp32doit-devkit-v1]
platform = espressif32
board = esp32doit-devkit-v1
framework = arduino
monitor_speed = 115200
board_build.filesystem = littlefs
; This gives you a 3MB app partition and more space for FS
board_build.partitions = huge_app.csv

lib_deps =
    adafruit/Adafruit SSD1306 @ ^2.5.7
    adafruit/Adafruit GFX Library @ ^1.11.5
    marcoschwartz/LiquidCrystal_I2C @ ^1.1.4
    https://github.com/pschatzmann/ESP32-A2DP`

const projects: Record<string, Project> = {
  "fscp": {
    title: "Controlling speed of a DC motor",
    description: "A compact hardware project featuring an ESP32 that translates analog potentiometer signals into precise motor speeds. This project showcases I2C peripheral integration, PWM signal generation, and real-time data feedback on a 0.96” OLED screen.",
    image: "/IMG_20260428_143233.jpg",
    code: motorCode,
    wiringDiagram: "/Untitled Sketch_bb.png",
  },
  "esp32-media-streamer": {
    title: "ESP32 Synchronized Dual-Display Media Streamer",
    description: "A media streamer that plays video on an OLED screen synchronized with audio streamed to a Bluetooth speaker, using a secondary LCD for status updates.",
    image: "/IMG_20260429_120030.jpg",
    code: mediaStreamerCode,
    platformioIni: mediaStreamerPlatformIO,
    wiringDiagram: "/2nd project.png",
    notes: `• note that OLED used is in black and white. 
• The video must be dithered first. You may dither it at https://ditheringstudio.com/en/  
• After the video was dithered, the converted video must changed into BIN file. To convert it, use this command (make sure before that you installed ffmpeg):
  ffmpeg -i ~/Downloads/exp/test.webm -vf "fps=20,scale=128:64,format=monob" -f rawvideo video.bin
• Same if you want the audio file, the audio must be convert into BIN file. You can use this command : ffmpeg -i /home/build_blade/Downloads/cropped.mp4 -f s16le -acodec pcm_s16le -ar 22050 -ac 1 audio.bin
• The audio was converted into mono and 22050Hz sample rate.
• The video and audio file must be named as video.bin and audio.bin, then put it in the root directory of LittleFS.
• The owner could not finish or add the video regarding not enough space in ESP32, so only the video on OLED and LCDwill be shown, but the audio will not be played.
• The original video was https://youtube.com/shorts/qFCnLxT-BO8`,
  },
  "esp32-security-camera": {
    title: "ESP32 Security Camera",
    description: "ESP32-CAM based surveillance system with live streaming and motion detection alerts.",
    image: "https://picsum.photos/seed/securitycam/600/400",
    code: "// TODO: Paste the ESP32 Security Camera code here",
  },
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = projects[id] ?? projects["fscp"]

  const [tab, setTab] = useState<"overview" | "pinout" | "code" | "notes">("overview")
  const [showMainCode, setShowMainCode] = useState(true)
  const [showIniCode, setShowIniCode] = useState(true)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const dragPos = useRef({ x: 0, y: 0, left: 0, top: 0, dragged: false })

  const handleMouseDown = (e: MouseEvent) => {
    if (zoomLevel <= 1) return
    e.preventDefault()
    setIsDragging(true)
    dragPos.current = {
      x: e.clientX,
      y: e.clientY,
      left: scrollContainerRef.current?.scrollLeft || 0,
      top: scrollContainerRef.current?.scrollTop || 0,
      dragged: false
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    const dx = e.clientX - dragPos.current.x
    const dy = e.clientY - dragPos.current.y
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      dragPos.current.dragged = true
    }
    scrollContainerRef.current.scrollLeft = dragPos.current.left - dx
    scrollContainerRef.current.scrollTop = dragPos.current.top - dy
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">

      <header className="border-b border-border bg-card">
        <div className="w-full px-6 h-14 flex items-center justify-between">

          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-[#f5b1aa] transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Link>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-8 text-sm">
              <button onClick={() => setTab("overview")} className={`hover:text-[#f5b1aa] transition-colors ${tab === "overview" ? "text-[#BDD99F]" : "text-muted-foreground"}`}>
                Overview
              </button>

              <button onClick={() => setTab("pinout")} className={`hover:text-[#f5b1aa] transition-colors ${tab === "pinout" ? "text-[#BDD99F]" : "text-muted-foreground"}`}>
                Wiring / Pinout
              </button>

              <button onClick={() => setTab("code")} className={`hover:text-[#f5b1aa] transition-colors ${tab === "code" ? "text-[#BDD99F]" : "text-muted-foreground"}`}>
                Code
              </button>

              {project.notes && (
                <button onClick={() => setTab("notes")} className={`hover:text-[#f5b1aa] transition-colors ${tab === "notes" ? "text-[#BDD99F]" : "text-muted-foreground"}`}>
                  Notes
                </button>
              )}
            </nav>
            <ThemeToggle />
          </div>

        </div>
      </header>

      <main className="flex-1 w-full px-6 py-10 space-y-10">

        <header className="space-y-3 max-w-3xl">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </header>

        {tab === "overview" && (
          <section className="grid gap-8 lg:grid-cols-2">

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Project Overview</h2>
              <p className="text-muted-foreground">
                A compact hardware project featuring an ESP32 that translates analog potentiometer signals into precise motor speeds. This project showcases I2C peripheral integration, PWM signal generation, and real-time data feedback on a 0.96” OLED screen.
              </p>
            </div>

            <div className="border border-border rounded-lg overflow-hidden cursor-zoom-in" onClick={() => { setZoomedImage(project.image); setZoomLevel(1); }} onContextMenu={(e) => e.preventDefault()}>
              <Image
                src={project.image}
                alt={project.title}
                width={900}
                height={550}
                className="object-cover w-full pointer-events-none"
              />
            </div>

          </section>
        )}

        {tab === "pinout" && (
          <section className="space-y-6 max-w-5xl">
            <h2 className="text-xl font-semibold">Wiring Connections</h2>

            <div className="border border-border rounded-lg overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-secondary text-secondary-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Component</th>
                    <th className="px-4 py-3 font-medium">ESP32 / Source</th>
                    <th className="px-4 py-3 font-medium">Component Pin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {/* I2C LCD Display */}
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">I2C LCD Display</td>
                    <td className="px-4 py-3">GND</td>
                    <td className="px-4 py-3">GND</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">VIN</td>
                    <td className="px-4 py-3">VCC</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">Pin 21</td>
                    <td className="px-4 py-3">SDA</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">Pin 22</td>
                    <td className="px-4 py-3">SCL / SCK</td>
                  </tr>

                  {/* OLED Display */}
                  <tr className="border-t-2 border-border">
                    <td className="px-4 py-3 font-medium text-foreground">OLED Display</td>
                    <td className="px-4 py-3">GND</td>
                    <td className="px-4 py-3">GND</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">3V3</td>
                    <td className="px-4 py-3">VCC</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">Pin 21</td>
                    <td className="px-4 py-3">SDA</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">Pin 22</td>
                    <td className="px-4 py-3">SCL / SCK</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-8 space-y-6">
              <h2 className="text-xl font-semibold">Circuit Wiring</h2>

              {project.wiringDiagram && (
                <div className="border border-border rounded-lg overflow-hidden cursor-zoom-in" onClick={() => { setZoomedImage(project.wiringDiagram!); setZoomLevel(1); }} onContextMenu={(e) => e.preventDefault()}>
                  <Image
                    src={project.wiringDiagram}
                    alt="Circuit diagram"
                    width={1100}
                    height={650}
                    className="object-cover w-full pointer-events-none"
                  />
                </div>
              )}

              <p className="text-muted-foreground">
                The wiring diagram illustrates how the components are connected to the ESP32.
              </p>
            </div>
          </section>
        )}

        {tab === "code" && (
          <section className="space-y-6 max-w-5xl">
            <h2 className="text-xl font-semibold">Source Code</h2>

            <div className="border border-border rounded-lg overflow-hidden">

              <div 
                className="flex items-center justify-between bg-secondary px-4 py-2 text-sm border-b border-border cursor-pointer select-none"
                onClick={() => setShowMainCode(!showMainCode)}
              >
                <div className="flex items-center gap-2">
                  {showMainCode ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  <span className="text-muted-foreground font-medium">main.cpp</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(project.code)
                  }}
                  className="flex items-center gap-1 text-muted-foreground hover:text-[#f5b1aa] transition-colors"
                >
                  <Copy className="h-4 w-4" /> Copy
                </button>
              </div>

              {showMainCode && (
                <div className="max-h-[600px] overflow-y-auto bg-[#282c34] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#282c34] [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">
                  <SyntaxHighlighter
                    language="cpp"
                    style={oneDark}
                    customStyle={{ margin: 0, padding: "1.5rem", background: "transparent" }}
                  >
                    {project.code}
                  </SyntaxHighlighter>
                </div>
              )}

            </div>

            {project.platformioIni && (
              <div className="border border-border rounded-lg overflow-hidden">
                <div 
                  className="flex items-center justify-between bg-secondary px-4 py-2 text-sm border-b border-border cursor-pointer select-none"
                  onClick={() => setShowIniCode(!showIniCode)}
                >
                  <div className="flex items-center gap-2">
                    {showIniCode ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    <span className="text-muted-foreground font-medium">platformio.ini</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      navigator.clipboard.writeText(project.platformioIni!)
                    }} 
                    className="flex items-center gap-1 text-muted-foreground hover:text-[#f5b1aa] transition-colors"
                  >
                    <Copy className="h-4 w-4" /> Copy
                  </button>
                </div>
                {showIniCode && (
                  <div className="max-h-[400px] overflow-y-auto bg-[#282c34] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#282c34] [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">
                    <SyntaxHighlighter language="ini" style={oneDark} customStyle={{ margin: 0, padding: "1.5rem", background: "transparent" }}>
                      {project.platformioIni}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {tab === "notes" && project.notes && (
          <section className="space-y-6 max-w-3xl">
            <h2 className="text-xl font-semibold">Project Notes</h2>
            
            <div className="bg-secondary/50 border border-border rounded-lg p-6">
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {project.notes.split(/(https?:\/\/[^\s]+)/g).map((part, i) => 
                  part.match(/^https?:\/\//) ? (
                    <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-[#f5b1aa] transition-colors">
                      {part}
                    </a>
                  ) : (
                    part
                  )
                )}
              </p>
            </div>
          </section>
        )}

        {zoomedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="absolute top-6 right-6 flex items-center gap-2 z-50 shadow-lg">
              <button 
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.5, 4))}
                className="p-2 bg-secondary text-foreground rounded-md hover:bg-secondary/80 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.5, 0.5))}
                className="p-2 bg-secondary text-foreground rounded-md hover:bg-secondary/80 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-border mx-2"></div>
              <button 
                onClick={() => { setZoomedImage(null); setZoomLevel(1); }}
                className="p-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/80 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={scrollContainerRef}
              className={`w-full h-full overflow-auto p-4 flex ${zoomLevel > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-out"}`}
              onClick={() => {
                if (dragPos.current.dragged) {
                  dragPos.current.dragged = false;
                  return;
                }
                setZoomedImage(null);
                setZoomLevel(1);
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="m-auto flex items-center justify-center" onClick={(e) => {
                if (!dragPos.current.dragged) {
                  e.stopPropagation();
                }
              }}>
                <img 
                  src={zoomedImage} 
                  alt="Zoomed project view" 
                  className="rounded-md pointer-events-none transition-all duration-200 ease-out shadow-2xl"
                  style={{ 
                    maxWidth: zoomLevel === 1 ? '90vw' : 'none',
                    maxHeight: zoomLevel === 1 ? '90vh' : 'none',
                    width: zoomLevel !== 1 ? `calc(90vw * ${zoomLevel})` : 'auto',
                  }}
                />
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  )
}
