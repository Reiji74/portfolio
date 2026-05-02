"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, use } from "react"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { projects } from "@/app/projects/[id]/projects"
import { ProjectCodeTab } from "@/components/project-code-tab"
import { ImageViewerModal } from "@/components/image-viewer-modal"

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = projects.find((p) => p.id === id) ?? projects[0]

  const [tab, setTab] = useState<"overview" | "pinout" | "code" | "notes">("overview")
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  return (
    <div className="bg-[#0041BA] dark:bg-[#1a2f54] text-slate-50 min-h-screen flex flex-col relative selection:bg-[#BDD99F]/30">

      {/* Global Blueprint Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

      <header className="border-b-2 border-dashed border-slate-400/30 bg-[#0041BA]/85 dark:bg-[#1a2f54]/85 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full px-6 h-14 flex items-center justify-between relative z-10">

          <Link href="/" className="flex items-center font-gotham text-xs uppercase tracking-widest text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> CD..
          </Link>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-8 text-xs font-gotham uppercase tracking-widest">
              <button onClick={() => setTab("overview")} className={`pb-1 border-b-2 hover:text-[#BDD99F] transition-colors ${tab === "overview" ? "border-[#BDD99F] text-[#BDD99F]" : "border-transparent text-slate-300"}`}>
                Overview
              </button>

              <button onClick={() => setTab("pinout")} className={`pb-1 border-b-2 hover:text-[#f5b1aa] transition-colors ${tab === "pinout" ? "border-[#f5b1aa] text-[#f5b1aa]" : "border-transparent text-slate-300"}`}>
                Wiring / Pinout
              </button>

              <button onClick={() => setTab("code")} className={`pb-1 border-b-2 hover:text-[#BDD99F] transition-colors ${tab === "code" ? "border-[#BDD99F] text-[#BDD99F]" : "border-transparent text-slate-300"}`}>
                Code
              </button>

              {project.notes && (
                <button onClick={() => setTab("notes")} className={`pb-1 border-b-2 hover:text-[#f5b1aa] transition-colors ${tab === "notes" ? "border-[#f5b1aa] text-[#f5b1aa]" : "border-transparent text-slate-300"}`}>
                  Notes
                </button>
              )}
            </nav>
            <div className="text-black dark:text-slate-50">
              <ThemeToggle />
            </div>
          </div>

        </div>
      </header>

      <main className="flex-1 w-full px-6 py-10 space-y-10 relative z-10">

        <header className="space-y-3 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-gotham font-bold uppercase tracking-wider border-b-2 border-dashed border-slate-400/30 pb-4 inline-block">{project.title}</h1>
          <p className="text-slate-300 font-gotham-book text-base leading-relaxed">{project.description}</p>
        </header>

        {tab === "overview" && (
          <section className="grid gap-8 lg:grid-cols-2">

            <div className="space-y-4">
              <h2 className="text-xl font-gotham font-bold uppercase tracking-widest text-slate-50">Project Overview</h2>
              {project.overviewContent ? (
                project.overviewContent
              ) : (
              <p className="text-slate-300 font-gotham-book text-base">{project.description}</p>
              )}
            </div>

            <div className="border-2 border-dashed border-slate-400/30 bg-[#0041BA]/50 dark:bg-[#1a2f54]/50 backdrop-blur-sm p-2 rounded-none overflow-hidden cursor-zoom-in hover:border-slate-300 transition-colors duration-300 self-start" onClick={() => setZoomedImage(project.image)} onContextMenu={(e) => e.preventDefault()}>
              <Image
                src={project.image}
                alt={project.title}
                width={900}
                height={550}
                className="object-cover w-full h-auto pointer-events-none"
                priority
              />
            </div>

          </section>
        )}

        {tab === "pinout" && (
          <section className="space-y-6 max-w-5xl">
            <h2 className="text-xl font-gotham font-bold uppercase tracking-widest text-slate-50">Wiring Connections</h2>

            <div className="border-2 border-dashed border-slate-400/30 rounded-none overflow-x-auto bg-[#0041BA]/50 dark:bg-[#1a2f54]/50 backdrop-blur-sm">
              <table className="w-full text-sm text-left font-gotham-book">
                <thead className="bg-[#405CB1]/70 text-slate-200 border-b-2 border-dashed border-slate-400/30 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-medium">Component</th>
                    <th className="px-4 py-3 font-medium">ESP32 / Source</th>
                    <th className="px-4 py-3 font-medium">Component Pin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dashed divide-border/50">
                  {/* I2C LCD Display */}
                <tr className="border-t-2 border-dashed border-slate-400/30">
                  <td className="px-4 py-3 font-medium text-slate-50">I2C LCD Display</td>
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
                <tr className="border-t-2 border-dashed border-slate-400/30">
                  <td className="px-4 py-3 font-medium text-slate-50">OLED Display</td>
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
              <h2 className="text-xl font-gotham font-bold uppercase tracking-widest text-slate-50">Circuit Wiring</h2>

              {project.wiringDiagram && (
                <div className="border-2 border-dashed border-slate-400/50 bg-slate-400/5 p-4 rounded-none overflow-hidden cursor-zoom-in hover:border-slate-300 transition-colors self-start" onClick={() => setZoomedImage(project.wiringDiagram!)} onContextMenu={(e) => e.preventDefault()}>
                  <Image
                    src={project.wiringDiagram}
                    alt="Circuit diagram"
                    width={1100}
                    height={650}
                    className="object-contain w-full h-auto pointer-events-none mix-blend-luminosity dark:mix-blend-normal"
                  />
                </div>
              )}

              <p className="text-slate-300 font-gotham-book text-base">
                The wiring diagram illustrates how the components are connected to the ESP32.
              </p>
            </div>
          </section>
        )}

        {tab === "code" && (
          <ProjectCodeTab project={project} />
        )}

        {tab === "notes" && project.notes && (
          <section className="space-y-6 max-w-3xl">
            <h2 className="text-xl font-gotham font-bold uppercase tracking-widest text-slate-50">Project Notes</h2>
            
            <div className="bg-[#405CB1]/50 border-2 border-dashed border-slate-400/30 rounded-none p-6">
              <p className="text-slate-300 font-gotham-book text-base whitespace-pre-wrap leading-relaxed">
                {project.notes.split(/(https?:\/\/[^\s]+)/g).map((part, i) => 
                  part.match(/^https?:\/\//) ? (
                    <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-slate-300 underline decoration-dashed hover:text-white transition-colors">
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

      </main>

        {zoomedImage && <ImageViewerModal image={zoomedImage} onClose={() => setZoomedImage(null)} />}

    </div>
  )
}
