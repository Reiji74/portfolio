import type { Project } from "./projects";

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

// ... [Rest of your mediaStreamerCode logic] ...
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

export const project2: Project = {
  id: "esp32-media-streamer",
  title: "ESP32 Synchronized Dual-Display Media Streamer",
  description: "A media streamer that plays video on an OLED screen synchronized with audio streamed to a Bluetooth speaker, using a secondary LCD for status updates.",
  tech: ["ESP32", "I2C LCD 20x4", "OLED", "Bluetooth A2DP", "LittleFS", "FreeRTOS"],
  difficulty: "Hard",
  image: "/IMG_20260429_120030.jpg",
  code: mediaStreamerCode,
  platformioIni: mediaStreamerPlatformIO,
  wiringDiagram: "/2nd project.png",
  notes: `• note that OLED used is in black and white. 
• The video must be dithered first. You may dither it at https://ditheringstudio.com/en/  
• After the video was dithered, the converted video must changed into BIN file...
• The original video was https://youtube.com/shorts/qFCnLxT-BO8`,
};