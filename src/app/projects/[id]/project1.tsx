import type { Project } from "./projects";

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

export const project1: Project = {
  id: "fscp",
  title: "Controlling speed of a DC motor",
  description: "A compact hardware project featuring an ESP32 that translates analog potentiometer signals into precise motor speeds. This project showcases I2C peripheral integration, PWM signal generation, and real-time data feedback on a 0.96” OLED screen.",
  tech: ["ESP32", "DC Motor", "0.96 Inch OLED", "L298N Motor Driver", "10K Trim Potentiometer", "React"],
  difficulty: "Medium",
  image: "/IMG_20260428_143233.jpg",
  code: motorCode,
  wiringDiagram: "/Untitled Sketch_bb.png",
};