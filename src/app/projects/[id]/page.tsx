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

const codeExample = `#include <WiFi.h>

const char* ssid = "your_wifi";
const char* password = "your_password";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting...");
  }

  Serial.println("Connected to WiFi");
}

void loop() {
}`

const projects: Record<string, Project> = {
  "fscp": {
    title: "Controlling speed of a DC motor",
    description: "Controlling speed of a DC motor using ESP32 and VSCode PlatformIO with for real-time adjustments.",
    image: "https://picsum.photos/seed/smarthome/1200/700",
  },
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects[params.id] ?? projects["fscp"]

  const [tab, setTab] = useState<"overview" | "pinout" | "code" | "files">("overview")

  function copyCode() {
    navigator.clipboard.writeText(codeExample)
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">

      <header className="border-b border-border bg-card">
        <div className="w-full px-6 h-14 flex items-center justify-between">

          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Link>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-8 text-sm">
              <button onClick={() => setTab("overview")} className={`hover:text-primary ${tab === "overview" ? "text-primary" : "text-muted-foreground"}`}>
                Overview
              </button>

              <button onClick={() => setTab("pinout")} className={`hover:text-primary ${tab === "pinout" ? "text-primary" : "text-muted-foreground"}`}>
                Wiring / Pinout
              </button>

              <button onClick={() => setTab("code")} className={`hover:text-primary ${tab === "code" ? "text-primary" : "text-muted-foreground"}`}>
                Code
              </button>

              <button onClick={() => setTab("files")} className={`hover:text-primary ${tab === "files" ? "text-primary" : "text-muted-foreground"}`}>
                Files
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
                This project demonstrates an ESP32‑based IoT system capable of connecting to WiFi,
                communicating with sensors, and controlling devices remotely.
              </p>

              <p className="text-muted-foreground">
                The ESP32 acts as the main controller while connected peripherals handle sensing
                and actuation.
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
            <h2 className="text-xl font-semibold">ESP32 Pinout</h2>

            <div className="border border-border rounded-lg bg-secondary flex items-center justify-center h-[400px]">
              <span className="text-muted-foreground">[ Text Placeholder for ESP32 Pinout ]</span>
            </div>

            <div className="pt-8 space-y-6">
              <h2 className="text-xl font-semibold">Circuit Wiring</h2>

            <div className="border border-border rounded-lg overflow-hidden">
              <Image
                src="https://picsum.photos/seed/circuitdiagram/1100/650"
                alt="Circuit diagram"
                width={1100}
                height={650}
                className="object-cover w-full"
              />
            </div>

            <p className="text-muted-foreground">
              The wiring diagram illustrates how sensors and relays are connected to the ESP32 GPIO pins.
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
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary"
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

        {tab === "files" && (
          <section className="space-y-4 max-w-3xl">
            <h2 className="text-xl font-semibold">Project Files</h2>

            <div className="border border-border rounded-lg divide-y divide-border">

              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-sm">main.cpp</span>
                <span className="text-xs text-muted-foreground">Firmware</span>
              </div>

              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-sm">config.h</span>
                <span className="text-xs text-muted-foreground">Configuration</span>
              </div>

              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-sm">diagram.png</span>
                <span className="text-xs text-muted-foreground">Circuit</span>
              </div>

            </div>
          </section>
        )}

      </main>

    </div>
  )
}
