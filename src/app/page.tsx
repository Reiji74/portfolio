"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, Cpu, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const projects = [
  {
    slug: "esp32-smart-home",
    title: "ESP32 Smart Home Controller",
    description: "WiFi-based home automation system to control lights and appliances using a mobile dashboard.",
    tech: ["ESP32", "MQTT", "Arduino", "React"],
    image: "https://picsum.photos/seed/esp32home/600/400",
    github: "#",
    demo: "#",
  },
  {
    slug: "esp32-weather-station",
    title: "ESP32 Weather Station",
    description: "Environmental monitoring station measuring temperature, humidity, and air pressure with web dashboard.",
    tech: ["ESP32", "DHT22", "BME280", "IoT"],
    image: "https://picsum.photos/seed/weatherstation/600/400",
    github: "#",
    demo: "#",
  },
  {
    slug: "esp32-security-camera",
    title: "ESP32 Security Camera",
    description: "ESP32-CAM based surveillance system with live streaming and motion detection alerts.",
    tech: ["ESP32-CAM", "WiFi", "C++"],
    image: "https://picsum.photos/seed/securitycam/600/400",
    github: "#",
    demo: "#",
  },
]

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">

      <header className="border-b border-border bg-card">
        <div className="w-full px-6 h-16 flex items-center justify-between">

          <div className="font-semibold tracking-tight">ESP32 Lab</div>

          <nav className="flex items-center gap-8 text-sm">
            <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors duration-150">
              Projects
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-150">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors duration-150">
              Contact
            </a>
          </nav>

          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            GitHub
          </Button>

        </div>
      </header>

      <main className="flex-1 w-full px-6 py-10 space-y-16">

        <section className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6 max-w-xl">
            <p className="text-sm text-primary font-medium tracking-wider">Embedded Systems Portfolio</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              ESP32 Projects by <span className="text-primary">Your Name</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              I build IoT and embedded systems using ESP32. This dashboard showcases hardware builds, firmware experiments, and connected applications.
            </p>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Explore Projects
            </Button>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden border border-border">
            <Image
              src="https://picsum.photos/seed/esp32board/900/550"
              alt="ESP32 development board"
              width={900}
              height={550}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </section>

        <section id="projects" className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Projects</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.slug} className="bg-card border-border hover:border-primary/60 transition-colors duration-150">

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
                  <CardTitle className="text-lg">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="hover:text-primary transition-colors duration-150"
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
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="inline-flex items-center text-sm text-primary hover:underline"
                    >
                      <Github className="h-4 w-4 mr-1" aria-hidden="true" />
                      Code
                    </a>

                    <a
                      href={project.demo}
                      className="inline-flex items-center text-sm text-accent hover:underline"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" aria-hidden="true" />
                      Demo
                    </a>
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
              {["ESP32", "Arduino", "C++", "IoT", "MQTT", "WiFi", "React", "Node.js"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md"
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

          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Mail className="mr-2 h-4 w-4" /> Contact Me
          </Button>
        </section>

      </main>

      <footer className="border-t border-border py-6 px-6 text-sm text-muted-foreground flex items-center justify-between">
        <p>© {new Date().getFullYear()} Your Name</p>
        <div className="flex items-center gap-4">
          <Cpu className="h-4 w-4" /> ESP32 Portfolio
        </div>
      </footer>

    </div>
  )
}
