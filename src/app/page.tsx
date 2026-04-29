"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Cpu, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

const projects = [
  {
    slug: "fscp",
    title: "Controlling speed of a DC motor",
    description: "A compact hardware project featuring an ESP32 that translates analog potentiometer signals into precise motor speeds. This project showcases I2C peripheral integration, PWM signal generation, and real-time data feedback on a 0.96” OLED screen.",
    tech: ["ESP32", "DC Motor", "0.96 Inch OLED","L298N Motor Driver", "10K Trim Potentiometer", "React"],
    image: "/IMG_20260428_143233.jpg",
    difficulty: "Medium",
  },
  {
    slug: "esp32-weather-station",
    title: "ESP32 Weather Station",
    description: "Environmental monitoring station measuring temperature, humidity, and air pressure with web dashboard.",
    tech: ["ESP32", "DHT22", "BME280", "IoT"],
    image: "https://picsum.photos/seed/weatherstation/600/400",
    difficulty: "Easy",
  },
  {
    slug: "esp32-security-camera",
    title: "ESP32 Security Camera",
    description: "ESP32-CAM based surveillance system with live streaming and motion detection alerts.",
    tech: ["ESP32-CAM", "WiFi", "C++"],
    image: "https://picsum.photos/seed/securitycam/600/400",
    difficulty: "Hard",
  },
]

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">

      <header className="border-b border-border bg-card">
        <div className="w-full px-6 h-16 flex items-center justify-between">

          <div className="font-semibold tracking-tight">ESP32 Lab</div>

          <nav className="flex items-center gap-8 text-sm">
            <a href="#projects" className="text-muted-foreground hover:text-[#f5b1aa] transition-colors duration-150">
              Projects
            </a>
            <a href="#about" className="text-muted-foreground hover:text-[#f5b1aa] transition-colors duration-150">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-[#f5b1aa] transition-colors duration-150">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button className="bg-[#BDD99F] text-black hover:bg-[#BDD99F]/90">
              GitHub
            </Button>
          </div>

        </div>
      </header>

      <main className="flex-1 w-full px-6 py-10 space-y-16">

        <section className="flex flex-col justify-center py-6">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              ESP32 Projects by <span className="text-[#BDD99F]">Danish Iman</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              I build IoT and embedded systems using ESP32. This dashboard showcases hardware builds, firmware experiments, and connected applications.
            </p>

            <Button className="bg-[#BDD99F] text-black hover:bg-[#BDD99F]/90">
              Explore Projects
            </Button>
          </div>
        </section>

        <section id="projects" className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Projects</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.slug} className="bg-card border-border hover:border-[#BDD99F]/60 transition-colors duration-150">

                <Link href={`/projects/${project.slug}`} className="block">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>

                <CardHeader>
                  <div className="mb-2">
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm ${
                      project.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
                      project.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' :
                      project.difficulty === 'Hard' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>

                  <CardTitle className="text-lg">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="hover:text-[#BDD99F] transition-colors duration-150"
                    >
                      {project.title}
                    </Link>
                  </CardTitle>

                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-[#f5b1aa] text-black px-2 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="about" className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">About</h2>
            <p className="text-muted-foreground">
              I develop embedded systems using ESP32, focusing on IoT connectivity, sensor integration, and real‑time control systems.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {["ESP32", "Arduino", "IoT", "WiFi", "React"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm bg-[#f5b1aa] text-black rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="space-y-4 max-w-xl">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="text-muted-foreground">
            Interested in collaborating or discussing embedded systems projects? Feel free to reach out.
          </p>

          <Button className="bg-[#BDD99F] text-black hover:bg-[#BDD99F]/90">
            <Mail className="mr-2 h-4 w-4" /> Contact Me
          </Button>
        </section>

      </main>

      <footer className="border-t border-border py-6 px-6 text-sm text-muted-foreground flex items-center justify-between">
        <p>© {new Date().getFullYear()} Danish Iman</p>
        <div className="flex items-center gap-4">
          <Cpu className="h-4 w-4" /> ESP32 Portfolio
        </div>
      </footer>

    </div>
  )
}
