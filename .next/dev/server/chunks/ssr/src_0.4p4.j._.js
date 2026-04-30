module.exports = [
"[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Slot$3e$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript) <export * as Slot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
            "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
            "icon-sm": "size-8",
            "icon-lg": "size-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Slot$3e$__["Slot"].Root : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        "data-variant": variant,
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/theme-toggle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeToggle",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-ssr] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-ssr] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function ThemeToggle() {
    const { resolvedTheme, setTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
        variant: "outline",
        size: "icon",
        onClick: ()=>setTheme(resolvedTheme === "dark" ? "light" : "dark"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            }, void 0, false, {
                fileName: "[project]/src/components/theme-toggle.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            }, void 0, false, {
                fileName: "[project]/src/components/theme-toggle.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: "Toggle theme"
            }, void 0, false, {
                fileName: "[project]/src/components/theme-toggle.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/theme-toggle.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/projects/[id]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-ssr] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-out.js [app-ssr] (ecmascript) <export default as ZoomOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$prism$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Prism$3e$__ = __turbopack_context__.i("[project]/node_modules/react-syntax-highlighter/dist/esm/prism.js [app-ssr] (ecmascript) <export default as Prism>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$styles$2f$prism$2f$one$2d$dark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__oneDark$3e$__ = __turbopack_context__.i("[project]/node_modules/react-syntax-highlighter/dist/esm/styles/prism/one-dark.js [app-ssr] (ecmascript) <export default as oneDark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$theme$2d$toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/theme-toggle.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
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
}`;
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
}`;
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
    https://github.com/pschatzmann/ESP32-A2DP`;
const projects = {
    "fscp": {
        title: "Controlling speed of a DC motor",
        description: "A compact hardware project featuring an ESP32 that translates analog potentiometer signals into precise motor speeds. This project showcases I2C peripheral integration, PWM signal generation, and real-time data feedback on a 0.96” OLED screen.",
        image: "/IMG_20260428_143233.jpg",
        code: motorCode,
        wiringDiagram: "/Untitled Sketch_bb.png"
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
• The original video was https://youtube.com/shorts/qFCnLxT-BO8`
    },
    "esp32-security-camera": {
        title: "ESP32 Security Camera",
        description: "ESP32-CAM based surveillance system with live streaming and motion detection alerts.",
        image: "https://picsum.photos/seed/securitycam/600/400",
        code: "// TODO: Paste the ESP32 Security Camera code here"
    }
};
function ProjectPage({ params }) {
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(params);
    const project = projects[id] ?? projects["fscp"];
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("overview");
    const [showMainCode, setShowMainCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showIniCode, setShowIniCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [zoomedImage, setZoomedImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [zoomLevel, setZoomLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const scrollContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0,
        left: 0,
        top: 0,
        dragged: false
    });
    const handleMouseDown = (e)=>{
        if (zoomLevel <= 1) return;
        e.preventDefault();
        setIsDragging(true);
        dragPos.current = {
            x: e.clientX,
            y: e.clientY,
            left: scrollContainerRef.current?.scrollLeft || 0,
            top: scrollContainerRef.current?.scrollTop || 0,
            dragged: false
        };
    };
    const handleMouseMove = (e)=>{
        if (!isDragging || !scrollContainerRef.current) return;
        const dx = e.clientX - dragPos.current.x;
        const dy = e.clientY - dragPos.current.y;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            dragPos.current.dragged = true;
        }
        scrollContainerRef.current.scrollLeft = dragPos.current.left - dx;
        scrollContainerRef.current.scrollTop = dragPos.current.top - dy;
    };
    const handleMouseUp = ()=>{
        setIsDragging(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-background text-foreground min-h-screen flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "border-b border-border bg-card",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full px-6 h-14 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center text-sm text-muted-foreground hover:text-[#f5b1aa] transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "h-4 w-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                    lineNumber: 474,
                                    columnNumber: 13
                                }, this),
                                " Back"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                            lineNumber: 473,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "flex items-center gap-8 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setTab("overview"),
                                            className: `hover:text-[#f5b1aa] transition-colors ${tab === "overview" ? "text-[#BDD99F]" : "text-muted-foreground"}`,
                                            children: "Overview"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                            lineNumber: 479,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setTab("pinout"),
                                            className: `hover:text-[#f5b1aa] transition-colors ${tab === "pinout" ? "text-[#BDD99F]" : "text-muted-foreground"}`,
                                            children: "Wiring / Pinout"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                            lineNumber: 483,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setTab("code"),
                                            className: `hover:text-[#f5b1aa] transition-colors ${tab === "code" ? "text-[#BDD99F]" : "text-muted-foreground"}`,
                                            children: "Code"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                            lineNumber: 487,
                                            columnNumber: 15
                                        }, this),
                                        project.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setTab("notes"),
                                            className: `hover:text-[#f5b1aa] transition-colors ${tab === "notes" ? "text-[#BDD99F]" : "text-muted-foreground"}`,
                                            children: "Notes"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                            lineNumber: 492,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                    lineNumber: 478,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$theme$2d$toggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeToggle"], {}, void 0, false, {
                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                    lineNumber: 497,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                            lineNumber: 477,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                    lineNumber: 471,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/projects/[id]/page.tsx",
                lineNumber: 470,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 w-full px-6 py-10 space-y-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "space-y-3 max-w-3xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold",
                                children: project.title
                            }, void 0, false, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 506,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: project.description
                            }, void 0, false, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 507,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                        lineNumber: 505,
                        columnNumber: 9
                    }, this),
                    tab === "overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "grid gap-8 lg:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold",
                                        children: "Project Overview"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 514,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground",
                                        children: "A compact hardware project featuring an ESP32 that translates analog potentiometer signals into precise motor speeds. This project showcases I2C peripheral integration, PWM signal generation, and real-time data feedback on a 0.96” OLED screen."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 515,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 513,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border border-border rounded-lg overflow-hidden cursor-zoom-in",
                                onClick: ()=>{
                                    setZoomedImage(project.image);
                                    setZoomLevel(1);
                                },
                                onContextMenu: (e)=>e.preventDefault(),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: project.image,
                                    alt: project.title,
                                    width: 900,
                                    height: 550,
                                    className: "object-cover w-full pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                    lineNumber: 521,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 520,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                        lineNumber: 511,
                        columnNumber: 11
                    }, this),
                    tab === "pinout" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "space-y-6 max-w-5xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Wiring Connections"
                            }, void 0, false, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 535,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border border-border rounded-lg overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-sm text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "bg-secondary text-secondary-foreground",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 font-medium",
                                                        children: "Component"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                        lineNumber: 541,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 font-medium",
                                                        children: "ESP32 / Source"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                        lineNumber: 542,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 font-medium",
                                                        children: "Component Pin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                        lineNumber: 543,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                lineNumber: 540,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                            lineNumber: 539,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 font-medium text-foreground",
                                                            children: "I2C LCD Display"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 549,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "GND"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 550,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "GND"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 551,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                    lineNumber: 548,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 554,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "VIN"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 555,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "VCC"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 556,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 559,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "Pin 21"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 560,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "SDA"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 561,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                    lineNumber: 558,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 564,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "Pin 22"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 565,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "SCL / SCK"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 566,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                    lineNumber: 563,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-t-2 border-border",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 font-medium text-foreground",
                                                            children: "OLED Display"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 571,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "GND"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 572,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "GND"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 573,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                    lineNumber: 570,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 576,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "3V3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 577,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "VCC"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 578,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                    lineNumber: 575,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 581,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "Pin 21"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 582,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "SDA"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 583,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                    lineNumber: 580,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 586,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "Pin 22"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 587,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3",
                                                            children: "SCL / SCK"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                            lineNumber: 588,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                    lineNumber: 585,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                            lineNumber: 546,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                    lineNumber: 538,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 537,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-8 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold",
                                        children: "Circuit Wiring"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 595,
                                        columnNumber: 15
                                    }, this),
                                    project.wiringDiagram && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border border-border rounded-lg overflow-hidden cursor-zoom-in",
                                        onClick: ()=>{
                                            setZoomedImage(project.wiringDiagram);
                                            setZoomLevel(1);
                                        },
                                        onContextMenu: (e)=>e.preventDefault(),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: project.wiringDiagram,
                                            alt: "Circuit diagram",
                                            width: 1100,
                                            height: 650,
                                            className: "object-cover w-full pointer-events-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                            lineNumber: 599,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 598,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground",
                                        children: "The wiring diagram illustrates how the components are connected to the ESP32."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 609,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 594,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                        lineNumber: 534,
                        columnNumber: 11
                    }, this),
                    tab === "code" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "space-y-6 max-w-5xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Source Code"
                            }, void 0, false, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 618,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border border-border rounded-lg overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between bg-secondary px-4 py-2 text-sm border-b border-border cursor-pointer select-none",
                                        onClick: ()=>setShowMainCode(!showMainCode),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    showMainCode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                        className: "h-4 w-4 text-muted-foreground"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                        lineNumber: 627,
                                                        columnNumber: 35
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: "h-4 w-4 text-muted-foreground"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                        lineNumber: 627,
                                                        columnNumber: 93
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground font-medium",
                                                        children: "main.cpp"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                        lineNumber: 628,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                lineNumber: 626,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    navigator.clipboard.writeText(project.code);
                                                },
                                                className: "flex items-center gap-1 text-muted-foreground hover:text-[#f5b1aa] transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                        lineNumber: 638,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Copy"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                lineNumber: 631,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 622,
                                        columnNumber: 15
                                    }, this),
                                    showMainCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-[600px] overflow-y-auto bg-[#282c34] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#282c34] [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$prism$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Prism$3e$__["Prism"], {
                                            language: "cpp",
                                            style: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$styles$2f$prism$2f$one$2d$dark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__oneDark$3e$__["oneDark"],
                                            customStyle: {
                                                margin: 0,
                                                padding: "1.5rem",
                                                background: "transparent"
                                            },
                                            children: project.code
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                            lineNumber: 644,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 643,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 620,
                                columnNumber: 13
                            }, this),
                            project.platformioIni && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border border-border rounded-lg overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between bg-secondary px-4 py-2 text-sm border-b border-border cursor-pointer select-none",
                                        onClick: ()=>setShowIniCode(!showIniCode),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    showIniCode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                        className: "h-4 w-4 text-muted-foreground"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                        lineNumber: 663,
                                                        columnNumber: 36
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: "h-4 w-4 text-muted-foreground"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                        lineNumber: 663,
                                                        columnNumber: 94
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground font-medium",
                                                        children: "platformio.ini"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                lineNumber: 662,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    navigator.clipboard.writeText(project.platformioIni);
                                                },
                                                className: "flex items-center gap-1 text-muted-foreground hover:text-[#f5b1aa] transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                        lineNumber: 673,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Copy"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                                lineNumber: 666,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 658,
                                        columnNumber: 17
                                    }, this),
                                    showIniCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-[400px] overflow-y-auto bg-[#282c34] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#282c34] [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$prism$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Prism$3e$__["Prism"], {
                                            language: "ini",
                                            style: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$styles$2f$prism$2f$one$2d$dark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__oneDark$3e$__["oneDark"],
                                            customStyle: {
                                                margin: 0,
                                                padding: "1.5rem",
                                                background: "transparent"
                                            },
                                            children: project.platformioIni
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                            lineNumber: 678,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 677,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 657,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                        lineNumber: 617,
                        columnNumber: 11
                    }, this),
                    tab === "notes" && project.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "space-y-6 max-w-3xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold",
                                children: "Project Notes"
                            }, void 0, false, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 690,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-secondary/50 border border-border rounded-lg p-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground whitespace-pre-wrap leading-relaxed",
                                    children: project.notes.split(/(https?:\/\/[^\s]+)/g).map((part, i)=>part.match(/^https?:\/\//) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: part,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-foreground underline hover:text-[#f5b1aa] transition-colors",
                                            children: part
                                        }, i, false, {
                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                            lineNumber: 696,
                                            columnNumber: 21
                                        }, this) : part)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                    lineNumber: 693,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 692,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                        lineNumber: 689,
                        columnNumber: 11
                    }, this),
                    zoomedImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm",
                        onContextMenu: (e)=>e.preventDefault(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-6 right-6 flex items-center gap-2 z-50 shadow-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setZoomLevel((prev)=>Math.min(prev + 0.5, 4)),
                                        className: "p-2 bg-secondary text-foreground rounded-md hover:bg-secondary/80 transition-colors",
                                        title: "Zoom In",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                            lineNumber: 719,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 714,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setZoomLevel((prev)=>Math.max(prev - 0.5, 0.5)),
                                        className: "p-2 bg-secondary text-foreground rounded-md hover:bg-secondary/80 transition-colors",
                                        title: "Zoom Out",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                            lineNumber: 726,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 721,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-px h-6 bg-border mx-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 728,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setZoomedImage(null);
                                            setZoomLevel(1);
                                        },
                                        className: "p-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/80 transition-colors",
                                        title: "Close",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/projects/[id]/page.tsx",
                                            lineNumber: 734,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 729,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 713,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: scrollContainerRef,
                                className: `w-full h-full overflow-auto p-4 flex ${zoomLevel > 1 ? isDragging ? "cursor-grabbing" : "cursor-grab" : "cursor-zoom-out"}`,
                                onClick: ()=>{
                                    if (dragPos.current.dragged) {
                                        dragPos.current.dragged = false;
                                        return;
                                    }
                                    setZoomedImage(null);
                                    setZoomLevel(1);
                                },
                                onMouseDown: handleMouseDown,
                                onMouseMove: handleMouseMove,
                                onMouseUp: handleMouseUp,
                                onMouseLeave: handleMouseUp,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "m-auto flex items-center justify-center",
                                    onClick: (e)=>{
                                        if (!dragPos.current.dragged) {
                                            e.stopPropagation();
                                        }
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: zoomedImage,
                                        alt: "Zoomed project view",
                                        className: "rounded-md pointer-events-none transition-all duration-200 ease-out shadow-2xl",
                                        style: {
                                            maxWidth: zoomLevel === 1 ? '90vw' : 'none',
                                            maxHeight: zoomLevel === 1 ? '90vh' : 'none',
                                            width: zoomLevel !== 1 ? `calc(90vw * ${zoomLevel})` : 'auto'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                                        lineNumber: 759,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/projects/[id]/page.tsx",
                                    lineNumber: 754,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/projects/[id]/page.tsx",
                                lineNumber: 738,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/projects/[id]/page.tsx",
                        lineNumber: 709,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/projects/[id]/page.tsx",
                lineNumber: 503,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/projects/[id]/page.tsx",
        lineNumber: 468,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_0.4p4.j._.js.map