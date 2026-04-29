"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Copy } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { ThemeToggle } from "@/components/theme-toggle"

type Project = {
  title: string
  description: string
  image: string
}

const codeExample = `#include <Arduino.h>
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

const projects: Record<string, Project> = {
  "fscp": {
    title: "Controlling speed of a DC motor",
    description: "A compact hardware project featuring an ESP32 that translates analog potentiometer signals into precise motor speeds. This project showcases I2C peripheral integration, PWM signal generation, and real-time data feedback on a 0.96” OLED screen.",
    image: "/IMG_20260428_143233.jpg",
  },
  "esp32-media-streamer": {
    title: "ESP32 Synchronized Dual-Display Media Streamer",
    description: "A media streamer that plays video on an OLED screen synchronized with audio streamed to a Bluetooth speaker, using a secondary LCD for status updates.",
    image: "/IMG_20260429_120030.jpg",
  },
  "esp32-security-camera": {
    title: "ESP32 Security Camera",
    description: "ESP32-CAM based surveillance system with live streaming and motion detection alerts.",
    image: "https://picsum.photos/seed/securitycam/600/400",
  },
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects[params.id] ?? projects["fscp"]

  const [tab, setTab] = useState<"overview" | "pinout" | "code">("overview")

  function copyCode() {
    navigator.clipboard.writeText(codeExample)
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

            <div className="border border-border rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={900}
                height={550}
                className="object-cover w-full"
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
                  {/* OLED Display */}
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">0.96" OLED Display</td>
                    <td className="px-4 py-3">3V3</td>
                    <td className="px-4 py-3">VCC</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">GND</td>
                    <td className="px-4 py-3">GND</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">Pin 22</td>
                    <td className="px-4 py-3">SCL / SCK</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">Pin 21</td>
                    <td className="px-4 py-3">SDA</td>
                  </tr>

                  {/* 10k Trim Pot */}
                  <tr className="border-t-2 border-border">
                    <td className="px-4 py-3 font-medium text-foreground">10k Trim Potentiometer</td>
                    <td className="px-4 py-3">3V3</td>
                    <td className="px-4 py-3">Left Leg</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">Pin 34</td>
                    <td className="px-4 py-3">Middle</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">GND</td>
                    <td className="px-4 py-3">Right Leg</td>
                  </tr>

                  {/* L298N */}
                  <tr className="border-t-2 border-border">
                    <td className="px-4 py-3 font-medium text-foreground">L298N Motor Driver</td>
                    <td className="px-4 py-3">Pin 27</td>
                    <td className="px-4 py-3">IN1</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">Pin 26</td>
                    <td className="px-4 py-3">IN2</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">Pin 14</td>
                    <td className="px-4 py-3">ENA</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">GND</td>
                    <td className="px-4 py-3">GND</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">VIN / 5V</td>
                    <td className="px-4 py-3">5V</td>
                  </tr>

                  {/* Battery */}
                  <tr className="border-t-2 border-border">
                    <td className="px-4 py-3 font-medium text-foreground">6V External Battery</td>
                    <td className="px-4 py-3">+ve Battery</td>
                    <td className="px-4 py-3">12V (on L298N)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">-ve Battery</td>
                    <td className="px-4 py-3">GND (on L298N)</td>
                  </tr>

                  {/* DC Motor */}
                  <tr className="border-t-2 border-border">
                    <td className="px-4 py-3 font-medium text-foreground">DC Motor</td>
                    <td className="px-4 py-3">OUT1 (on L298N)</td>
                    <td className="px-4 py-3">Motor Terminal 1</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3">OUT2 (on L298N)</td>
                    <td className="px-4 py-3">Motor Terminal 2</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-8 space-y-6">
              <h2 className="text-xl font-semibold">Circuit Wiring</h2>

              <div className="border border-border rounded-lg overflow-hidden">
                <Image
                  src="/Untitled Sketch_bb.png"
                  alt="Circuit diagram"
                  width={1100}
                  height={650}
                  className="object-cover w-full"
                />
              </div>

              <p className="text-muted-foreground">
                The wiring diagram illustrates how the OLED display, potentiometer, and motor driver are connected to the ESP32.
              </p>
            </div>
          </section>
        )}

        {tab === "code" && (
          <section className="space-y-6 max-w-5xl">
            <h2 className="text-xl font-semibold">Source Code</h2>

            <div className="border border-border rounded-lg overflow-hidden">

              <div className="flex items-center justify-between bg-secondary px-4 py-2 text-sm">
                <span className="text-muted-foreground">main.cpp</span>

                <button
                  onClick={copyCode}
                  className="flex items-center gap-1 text-muted-foreground hover:text-[#f5b1aa] transition-colors"
                >
                  <Copy className="h-4 w-4" /> Copy
                </button>
              </div>

              <SyntaxHighlighter
                language="cpp"
                style={oneDark}
                customStyle={{ margin: 0, padding: "1.5rem", background: "transparent" }}
              >
                {codeExample}
              </SyntaxHighlighter>

            </div>
          </section>
        )}

      </main>

    </div>
  )
}
