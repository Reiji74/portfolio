"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, use, useRef, MouseEvent, ReactNode } from "react"
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
  pythonCode?: string
  wiringDiagram?: string
  notes?: string
  overviewContent?: ReactNode
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

Requirements (install once):
    pip install pyserial psutil wmi

**IMPORTANT**: Windows does not expose hardware temperatures natively.
For CPU/GPU temperatures and GPU usage to report properly, you must 
have OpenHardwareMonitor or LibreHardwareMonitor running in the background.

Usage:
    python pc_agent.py
    python pc_agent.py --port COM3   (override auto-detect)
"""

import serial
import serial.tools.list_ports
import json
import time
import psutil
import argparse
import sys
import os
import urllib.request

try:
    import wmi
    import pythoncom
    HAS_WMI = True
except ImportError:
    HAS_WMI = False

# ─── Config ────────────────────────────────────────────────────────
BAUD_RATE = 115200
INTERVAL  = 2.0    # seconds between updates
DISK_C    = "C:\\\\" # map to Windows C: drive
DISK_D    = "D:\\\\" # map to Windows D: drive
TEMP_ALERT = 85    # °C (console warning only)

# ─── LHM Web Server Alternative (Bypasses WMI) ─────────────────────
def fetch_web_stats(port=8085):
    stats = {
        "cpu_temp": 0.0, "cpu_clock": 0.0, "gpu_load": 0.0,
        "gpu_temp": 0.0, "gpu_clock": 0.0, "gpu_vram_used": 0.0, "gpu_vram_total": 0.0
    }
    try:
        req = urllib.request.Request(f"http://localhost:{port}/data.json")
        with urllib.request.urlopen(req, timeout=1.0) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            
        def walk(node, parent_path):
            nodes = []
            path = f"{parent_path}/{node.get('Text', '')}".lower()
            val_str = node.get("Value", "")
            
            if val_str and val_str != "-" and "images/" not in val_str:
                v_str = ''.join(c for c in val_str if c.isdigit() or c == '.')
                if v_str and v_str != '.':
                    try:
                        val = float(v_str)
                        if "gb" in val_str.lower(): val *= 1024.0
                        nodes.append((path, val))
                    except ValueError:
                        pass
                    
            for c in node.get("Children", []):
                nodes.extend(walk(c, path))
            return nodes
            
        for path, val in walk(data, ""):
            is_gpu = any(kw in path for kw in ["gpu", "radeon", "geforce", "rtx", "gtx", "iris", "arc", "graphics"])
            is_cpu = not is_gpu and any(kw in path for kw in ["cpu", "ryzen", "intel", "amd", "core"])

            if is_cpu:
                if "temperatures" in path and ("package" in path or "core" in path or "ccd" in path or stats["cpu_temp"] == 0):
                    stats["cpu_temp"] = max(stats["cpu_temp"], val)
                elif "clocks" in path and val > 100:
                    stats["cpu_clock"] = max(stats["cpu_clock"], val)
            elif is_gpu:
                if "temperatures" in path and ("core" in path or stats["gpu_temp"] == 0):
                    stats["gpu_temp"] = max(stats["gpu_temp"], val)
                elif "clocks" in path and ("core" in path or "graphics" in path or stats["gpu_clock"] == 0):
                    stats["gpu_clock"] = max(stats["gpu_clock"], val)
                elif "load" in path and ("core" in path or "d3d" in path or stats["gpu_load"] == 0):
                    stats["gpu_load"] = max(stats["gpu_load"], val)
                elif "data" in path and ("memory used" in path or "vram used" in path):
                    stats["gpu_vram_used"] = val / 1024.0
                elif "data" in path and ("memory total" in path or "vram total" in path):
                    stats["gpu_vram_total"] = val / 1024.0
        return stats, True
    except Exception:
        return stats, False

# ─── OHM / LHM WMI Hardware Stats (Temps & GPU) ────────────────────
def get_hardware_stats():
    """Fetch sensor data from OpenHardwareMonitor or LibreHardwareMonitor."""
    stats = {
        "cpu_temp": 0.0,
        "cpu_clock": 0.0,
        "gpu_load": 0.0,
        "gpu_temp": 0.0,
        "gpu_clock": 0.0,
        "gpu_vram_used": 0.0,
        "gpu_vram_total": 0.0
    }
    if not HAS_WMI:
        return stats

    try:
        pythoncom.CoInitialize()
        w = None
        try:
            w = wmi.WMI(namespace="root\\\\LibreHardwareMonitor")
        except wmi.x_wmi:
            try:
                w = wmi.WMI(namespace="root\\\\OpenHardwareMonitor")
            except wmi.x_wmi:
                pass

        if w:
            for s in w.Sensor():
                name = (s.Name or "").lower()
                identifier = getattr(s, "Identifier", "")
                identifier = (identifier or "").lower()
                stype = (s.SensorType or "").lower()
                val = float(s.Value or 0.0)
                ident_name = f"{identifier} {name}"

                is_gpu = any(kw in ident_name for kw in ["gpu", "radeon", "geforce", "rtx", "gtx", "iris", "arc", "graphics"])
                is_cpu = not is_gpu and any(kw in ident_name for kw in ["cpu", "ryzen", "intel", "amd", "core"])

                # CPU Stats
                if is_cpu:
                    if stype == "temperature":
                        if "package" in name or stats["cpu_temp"] == 0.0:
                            stats["cpu_temp"] = val
                    elif stype == "clock" and val > 100:
                        stats["cpu_clock"] = max(stats["cpu_clock"], val)
                
                # GPU Stats
                elif is_gpu:
                    if stype == "temperature":
                        if "core" in name or stats["gpu_temp"] == 0.0:
                            stats["gpu_temp"] = val
                    elif stype == "clock":
                        if "core" in name or "graphics" in name:
                            stats["gpu_clock"] = val
                        elif stats["gpu_clock"] == 0.0 and "memory" not in name:
                            stats["gpu_clock"] = val
                    elif stype == "load":
                        if "core" in name or "graphics" in name or "d3d" in name:
                            stats["gpu_load"] = val
                        elif stats["gpu_load"] == 0.0 and "memory" not in name:
                            stats["gpu_load"] = val
                    elif stype == "data" or stype == "small_data":
                        if "memory used" in name or "vram used" in name:
                            stats["gpu_vram_used"] = val / 1024.0 # MB -> GB
                        elif "memory total" in name or "vram total" in name:
                            stats["gpu_vram_total"] = val / 1024.0

            # Alternative: get total VRAM from Win32_VideoController
            if stats["gpu_vram_total"] == 0.0:
                w_cim = wmi.WMI()
                for vc in w_cim.Win32_VideoController():
                    if vc.AdapterRAM:
                        stats["gpu_vram_total"] = max(stats["gpu_vram_total"], abs(int(vc.AdapterRAM)) / (1024**3))
    except Exception:
        pass
    finally:
        pythoncom.CoUninitialize()
        
    return stats

# ─── CPU Clock Speed ───────────────────────────────────────────────
def get_cpu_clock_mhz():
    # 1. Try Windows Performance Counters (Matches Windows Task Manager)
    if HAS_WMI:
        try:
            pythoncom.CoInitialize()
            w = wmi.WMI() # Connects to default root\\\\cimv2 namespace
            
            base_clock = 0
            for cpu in w.Win32_Processor():
                base_clock = cpu.MaxClockSpeed
                break
                
            perf_pct = 0
            for counter in w.Win32_PerfFormattedData_Counters_ProcessorInformation(Name="_Total"):
                perf_pct = int(counter.PercentProcessorPerformance)
                break
                
            if base_clock > 0 and perf_pct > 0:
                return (base_clock * perf_pct) / 100.0
        except Exception:
            pass
        finally:
            pythoncom.CoUninitialize()

    # 2. Fallback to psutil (usually just shows Base Clock on modern Windows)
    freqs = psutil.cpu_freq()
    if freqs:
        return freqs.current
    return 0.0

# ─── Disk ──────────────────────────────────────────────────────────
def get_disk_free_gb(path):
    try:
        if os.path.exists(path):
            usage = psutil.disk_usage(path)
            return round(usage.free / (1024**3), 1)
    except Exception:
        pass
    return 0.0

# ─── Auto-detect ESP32 Serial Port ────────────────────────────────
def find_esp32_port():
    ports = serial.tools.list_ports.comports()
    for p in ports:
        desc = (p.description or "").lower()
        mfr  = (p.manufacturer or "").lower()
        # Common ESP32 USB-Serial chips on Windows
        if any(kw in desc or kw in mfr for kw in ["cp210", "ch340", "ftdi", "silicon", "usb serial", "usb-serial"]):
            return p.device
    return "COM7"

# ─── Main Stat Collection ──────────────────────────────────────────
def collect_stats() -> dict:
    cpu_load  = psutil.cpu_percent(interval=None)

    hw = get_hardware_stats()

    cpu_clock = hw["cpu_clock"]
    if cpu_clock == 0.0:
        cpu_clock = get_cpu_clock_mhz()

    ram = psutil.virtual_memory()
    ram_used  = round(ram.used  / (1024**3), 2)
    ram_total = round(ram.total / (1024**3), 2)

    return {
        "cpu_load":       round(cpu_load, 1),
        "cpu_temp":       round(hw["cpu_temp"], 1),
        "cpu_clock":      round(cpu_clock, 0),
        "gpu_load":       round(hw["gpu_load"], 1),
        "gpu_temp":       round(hw["gpu_temp"], 1),
        "gpu_clock":      round(hw["gpu_clock"], 0),
        "gpu_vram_used":  round(hw["gpu_vram_used"], 2),
        "gpu_vram_total": round(hw["gpu_vram_total"], 2),
        "ram_used":       ram_used,
        "ram_total":      ram_total,
        "disk_c_free":    get_disk_free_gb(DISK_C),
        "disk_d_free":    get_disk_free_gb(DISK_D),
    }

# ─── Main ──────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="PC Hardware Monitor Agent (Windows)")
    parser.add_argument("--port", help="Serial port (e.g. COM3). Auto-detects if omitted.")
    args = parser.parse_args()

    port = args.port or find_esp32_port()
    if not port:
        print("[ERROR] No serial port found. Plug in your ESP32 and retry.")
        print("        Or specify manually: python pc_agent.py --port COM7")
        sys.exit(1)

    print(f"[OK] Using port: {port}")
    
    _, web_ok = fetch_web_stats()
    if web_ok:
        print("\\n[INFO] Connected to LibreHardwareMonitor via Local Web Server!")
    elif not HAS_WMI:
        print("\\n[WARNING] 'wmi' module not found! Temperatures and GPU will report 0.0")
        print("          Please run: pip install wmi\\n")
    else:
        print("\\n[INFO] Checking Hardware Monitor WMI connection...")
        try:
            pythoncom.CoInitialize()
            w = None
            try:
                w = wmi.WMI(namespace="root\\\\LibreHardwareMonitor")
                print("       -> [OK] Found LibreHardwareMonitor WMI!")
            except Exception:
                try:
                    w = wmi.WMI(namespace="root\\\\OpenHardwareMonitor")
                    print("       -> [OK] Found OpenHardwareMonitor WMI!")
                except Exception:
                    print("       -> [ERROR] Could not find LHM/OHM WMI namespace.")
                    print("       -> IMPORTANT: Are you using 'HWMonitor'? That app does NOT work.")
                    print("       -> You MUST download and run 'LibreHardwareMonitor'.")
            
            if w:
                sns = w.Sensor()
                print(f"       -> {len(sns)} sensors detected.")
                if len(sns) == 0:
                    print("       -> [WARNING] 0 sensors! Try running LibreHardwareMonitor as Administrator.")
        except Exception as e:
            print(f"       -> [ERROR] WMI Test Failed: {e}")
        finally:
            pythoncom.CoUninitialize()
        print()

    # Warm up psutil CPU percent (first call always returns 0.0)
    psutil.cpu_percent(interval=1)

    try:
        ser = serial.Serial(port, BAUD_RATE, timeout=1)
        
        print("[INFO] Waiting 2.5 seconds for ESP32 to reboot...")
        time.sleep(2.5)
        print(f"[OK] Serial open. Sending every {INTERVAL}s — Ctrl+C to stop.\\n")

        while True:
            stats = collect_stats()
            line  = json.dumps(stats, separators=(',', ':')) + "\\n"
            ser.write(line.encode("utf-8"))

            alert = "!" if stats["cpu_temp"] >= TEMP_ALERT or stats["gpu_temp"] >= TEMP_ALERT else " "
            print(f"{alert} CPU Util: {stats['cpu_load']:5.1f}% | Temp: {stats['cpu_temp']:5.1f}C\\n"
                  f"  GPU Util: {stats['gpu_load']:5.1f}% | Temp: {stats['gpu_temp']:5.1f}C | VRAM: {stats['gpu_vram_used']:.2f}/{stats['gpu_vram_total']:.1f}GB\\n"
                  f"  RAM Util: {stats['ram_used']:.1f}/{stats['ram_total']:.1f}GB  |  "
                  f"C:\\\\: {stats['disk_c_free']}GB  D:\\\\: {stats['disk_d_free']}GB\\n")

            time.sleep(INTERVAL)

    except serial.SerialException as e:
        print(f"[ERROR] Serial error: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\\n[OK] Stopped.")

if __name__ == "__main__":
    main()
`

const pcStatsOverview = (
  <div className="space-y-6 text-muted-foreground">
    <p>
      A complete hardware monitor solution displaying live statistics from a Windows PC. 
      The ESP32 reads data over USB Serial sent by a lightweight Python agent.
    </p>

    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">Setup</h3>
      
      <div className="space-y-2">
        <h4 className="font-medium text-foreground">1. ESP32 Firmware (PlatformIO)</h4>
        <ol className="list-decimal list-inside space-y-1 ml-2 text-sm">
          <li>Open <code>pc_monitor/</code> folder in VSCode with PlatformIO</li>
          <li>Build & Upload &rarr; <code>platformio.ini</code> handles all libraries</li>
          <li>ESP32 shows <em>"Waiting for PC..."</em> until the Python agent connects</li>
        </ol>
      </div>

      <div className="space-y-2 mt-4">
        <h4 className="font-medium text-foreground">2. Python Agent (Windows PC)</h4>
        <p className="text-sm"><strong>Install dependencies:</strong></p>
        <pre className="bg-secondary p-3 rounded-md text-xs font-mono overflow-x-auto text-secondary-foreground border border-border">
          <code>pip install pyserial psutil wmi</code>
        </pre>
        
        <p className="text-sm mt-3"><strong>Install LibreHardwareMonitor:</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
          <li>Download from <a href="https://github.com/LibreHardwareMonitor/LibreHardwareMonitor/releases" target="_blank" rel="noopener noreferrer" className="text-[#f5b1aa] hover:underline">GitHub</a></li>
          <li>Run <code>LibreHardwareMonitor.exe</code> <strong>as Administrator</strong> (required for temp sensors)</li>
          <li><strong>Important:</strong> In the app, click <strong>Options &rarr; Remote Web Server &rarr; Run</strong> (Port 8085). The Python script relies on this to bypass Windows WMI bugs.</li>
          <li>Leave it running in the background</li>
        </ul>

        <p className="text-sm mt-3"><strong>Run the agent:</strong></p>
        <pre className="bg-secondary p-3 rounded-md text-xs font-mono overflow-x-auto text-secondary-foreground border border-border">
          <code>python pc_agent.py</code>
        </pre>
        <p className="text-xs mt-1">Auto-detects the ESP32 COM port. Override with <code>--port COM5</code></p>
      </div>
    </div>

    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">What each display shows</h3>
      
      <h4 className="font-medium text-foreground mt-2">20x4 LCD</h4>
      <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
        <li><strong>Row 0:</strong> CPU Load% and Clock GHz</li>
        <li><strong>Row 1:</strong> GPU Load% and Temp &deg;C</li>
        <li><strong>Row 2:</strong> RAM & VRAM Used / Total GB</li>
        <li><strong>Row 3:</strong> C: and D: drive free space GB</li>
      </ul>

      <h4 className="font-medium text-foreground mt-3">0.96" OLED</h4>
      <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
        <li><strong>Top half:</strong> CPU Util progress bar + current temp</li>
        <li><strong>Bottom half:</strong> GPU Util progress bar + current temp</li>
        <li><strong>Alert icon (!):</strong> Appears if CPU or GPU temp &ge; 85&deg;C</li>
      </ul>
    </div>
  </div>
)

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
    title: "ESP32 PC Stats Monitor",
    description: "An ESP32-based hardware monitor that receives PC statistics and displays them on an OLED and LCD screen. The LCD shows CPU, GPU, RAM, VRAM, and free space of drives C and D.",
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
  },
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = projects[id] ?? projects["fscp"]

  const [tab, setTab] = useState<"overview" | "pinout" | "code" | "notes">("overview")
  const [showMainCode, setShowMainCode] = useState(true)
  const [showIniCode, setShowIniCode] = useState(true)
  const [showPythonCode, setShowPythonCode] = useState(true)
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
              {project.overviewContent ? (
                project.overviewContent
              ) : (
                <p className="text-muted-foreground">{project.description}</p>
              )}
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

            {project.pythonCode && (
              <div className="border border-border rounded-lg overflow-hidden">
                <div 
                  className="flex items-center justify-between bg-secondary px-4 py-2 text-sm border-b border-border cursor-pointer select-none"
                  onClick={() => setShowPythonCode(!showPythonCode)}
                >
                  <div className="flex items-center gap-2">
                    {showPythonCode ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    <span className="text-muted-foreground font-medium">pc_agent.py</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      navigator.clipboard.writeText(project.pythonCode!)
                    }} 
                    className="flex items-center gap-1 text-muted-foreground hover:text-[#f5b1aa] transition-colors"
                  >
                    <Copy className="h-4 w-4" /> Copy
                  </button>
                </div>
                {showPythonCode && (
                  <div className="max-h-[400px] overflow-y-auto bg-[#282c34] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#282c34] [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">
                    <SyntaxHighlighter language="python" style={oneDark} customStyle={{ margin: 0, padding: "1.5rem", background: "transparent" }}>
                      {project.pythonCode}
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
