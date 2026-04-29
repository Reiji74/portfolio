#include <Arduino.h>
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
}