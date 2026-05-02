"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Cpu, Mail, Linkedin, Activity, Code, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { projects, type Project } from "@/app/projects/[id]/projects"

export default function Home() {
  const INITIAL_PROJECTS = 6;
  const [showAllProjects, setShowAllProjects] = React.useState(false);
  const displayedProjects = showAllProjects ? projects : projects.slice(0, INITIAL_PROJECTS);

  return (
    <div className="bg-[#0041BA] dark:bg-[#1a2f54] text-slate-50 min-h-screen flex flex-col relative selection:bg-[#BDD99F]/30">
      
      {/* Global Blueprint Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

      <header className="border-b-2 border-dashed border-slate-400/30 bg-[#0041BA]/85 dark:bg-[#1a2f54]/85 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full px-6 h-16 flex items-center justify-between relative z-10">

          <div className="font-gotham font-bold tracking-widest uppercase text-xl">
            ESP32<span className="text-[#f5b1aa]">_LAB</span>
          </div>

          <nav className="flex items-center gap-8 text-xs font-gotham uppercase tracking-widest">
            <a href="#projects" className="text-slate-300 hover:text-white transition-colors duration-150">
              Projects
            </a>
            <a href="#about" className="text-slate-300 hover:text-white transition-colors duration-150">
              About
            </a>
            <a href="#contact" className="text-slate-300 hover:text-white transition-colors duration-150">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-black dark:text-slate-50">
              <ThemeToggle />
            </div>
            <Button variant="outline" className="rounded-none border-2 border-dashed border-slate-400 bg-transparent text-slate-300 hover:bg-slate-100 hover:text-[#0041BA] font-gotham text-xs uppercase tracking-widest transition-all" asChild>
              <Link href="https://github.com/Reiji74" target="_blank" rel="noopener noreferrer">
                {'<GitHub/>'}
              </Link>
            </Button>
          </div>

        </div>
      </header>

      <main className="flex-1 w-full px-6 py-10 space-y-16 relative z-10">

        <section className="grid lg:grid-cols-2 gap-10 items-center py-10">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-balk font-bold uppercase tracking-tighter leading-tight">
              ESP32 Projects <br/><span className="text-slate-300 text-2xl tracking-widest">BY</span> <span className="text-[#BDD99F] underline decoration-dashed underline-offset-8">Danish Iman</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg font-gotham-book max-w-xl leading-relaxed">
              I build IoT and embedded systems using ESP32. This dashboard showcases hardware builds, firmware experiments, and connected applications.
            </p>

            <Button className="rounded-none border-2 border-dashed border-[#BDD99F] bg-[#BDD99F]/10 text-[#BDD99F] hover:bg-[#BDD99F] hover:text-[#0041BA] font-gotham text-xs uppercase tracking-widest transition-all">
              Explore Projects
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-lg ml-auto">
            {[
              { icon: Cpu, title: "Projects Built", value: "03", hover: "hover:border-[#BDD99F]", iconColor: "text-[#BDD99F]", symbolColor: "text-slate-400" },
              { icon: Activity, title: "System Uptime", value: "99.9%", hover: "hover:border-[#f5b1aa]", iconColor: "text-[#f5b1aa]", symbolColor: "text-slate-400" },
              { icon: Code, title: "Lines of C++", value: "5,240", hover: "hover:border-[#f5b1aa]", iconColor: "text-[#f5b1aa]", symbolColor: "text-slate-400" },
              { icon: Wifi, title: "Active Nodes", value: "08", hover: "hover:border-[#BDD99F]", iconColor: "text-[#BDD99F]", symbolColor: "text-slate-400" }
            ].map((stat, i) => (
              <Card key={i} className={`relative overflow-hidden bg-[#0033a0] dark:bg-[#11203c] border-2 border-dashed border-slate-400/30 ${stat.hover} transition-all duration-300 rounded-none shadow-md hover:shadow-lg hover:-translate-y-1`}>
                <CardHeader className="pb-2 relative z-10 border-b border-dashed border-slate-400/20">
                  <CardTitle className="text-xs font-gotham font-medium text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <stat.icon className={`h-4 w-4 ${stat.iconColor}`} /> {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 relative z-10">
                  <div className="text-3xl font-gotham font-bold text-slate-50">
                    <span className={`${stat.symbolColor} text-lg mr-1`}>&gt;</span>{stat.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-gotham font-bold uppercase tracking-widest border-b-2 border-dashed border-slate-400/30 pb-2 inline-block text-slate-50">Projects</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {displayedProjects.map((project: Project) => (
              <Card key={project.id} className="bg-[#0041BA]/60 dark:bg-[#1a2f54]/60 backdrop-blur-sm border-2 border-dashed border-slate-400/30 hover:border-slate-300 transition-all duration-300 rounded-none relative z-10 flex flex-col">

                <Link href={`/projects/${project.id}`} className="block">
                  <div className="aspect-video relative overflow-hidden border-b-2 border-dashed border-slate-400/30">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                      priority
                    />
                  </div>
                </Link>

                <CardHeader>
                  <div className="mb-2 flex">
                    <span className={`text-[10px] font-gotham uppercase tracking-widest font-bold px-2 py-1 border border-dashed rounded-none ${
                      project.difficulty === 'Easy' ? 'border-green-500 text-green-600 bg-green-500/10 dark:text-green-400' :
                      project.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-600 bg-yellow-500/10 dark:text-yellow-400' :
                      project.difficulty === 'Hard' ? 'border-red-500 text-red-600 bg-red-500/10 dark:text-red-400' :
                      'border-slate-400 text-slate-300 bg-white/5'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>

                  <CardTitle className="text-xl font-gotham uppercase tracking-wide mt-2">
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-slate-50 hover:text-white transition-colors duration-150"
                    >
                      {project.title}
                    </Link>
                  </CardTitle>

                  <CardDescription className="text-slate-300 font-gotham-book text-sm mt-2 leading-relaxed">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t: string) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono uppercase tracking-wider border border-dashed border-[#405CB1] bg-[#405CB1]/20 text-slate-200 px-2 py-1 rounded-none"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {projects.length > INITIAL_PROJECTS && (
            <div className="flex justify-center pt-4">
              <Button 
                onClick={() => setShowAllProjects(!showAllProjects)}
                variant="outline" 
                className="rounded-none border-2 border-dashed border-[#BDD99F] bg-transparent text-[#BDD99F] hover:bg-[#BDD99F] hover:text-[#0041BA] font-gotham text-xs uppercase tracking-widest transition-all px-8 py-5"
              >
                {showAllProjects ? "Show Less" : `View All ${projects.length} Projects`}
              </Button>
            </div>
          )}
        </section>

        <section id="about" className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-gotham font-bold uppercase tracking-widest border-b-2 border-dashed border-slate-400/30 pb-2 inline-block text-slate-50">About</h2>
            <p className="text-slate-300 font-gotham-book text-base leading-relaxed">
              I develop embedded systems using ESP32, focusing on IoT connectivity, sensor integration, and real‑time control systems.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-gotham font-bold uppercase tracking-widest border-b-2 border-dashed border-slate-400/30 pb-2 inline-block text-slate-50">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {["ESP32", "Arduino", "IoT", "WiFi", "React"].map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-mono uppercase tracking-wider border border-dashed border-[#405CB1] bg-[#405CB1]/20 text-slate-200 px-3 py-1 rounded-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="space-y-4 max-w-xl">
          <h2 className="text-2xl font-gotham font-bold uppercase tracking-widest border-b-2 border-dashed border-slate-400/30 pb-2 inline-block text-slate-50">Contact</h2>
          <p className="text-slate-300 font-gotham-book text-base leading-relaxed">
            Interested in collaborating or discussing embedded systems projects? Feel free to reach out.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Button className="rounded-none border-2 border-dashed border-slate-400 bg-transparent text-slate-300 hover:bg-slate-100 hover:text-[#0041BA] font-gotham text-xs uppercase tracking-widest transition-all" asChild>
              <Link href="mailto:danishimansufian74@gmail.com">
                <Mail className="mr-2 h-4 w-4" /> Email Me
              </Link>
            </Button>
            <Button variant="outline" className="rounded-none border-2 border-dashed border-slate-400 bg-transparent text-slate-300 hover:bg-slate-100 hover:text-[#0041BA] font-gotham text-xs uppercase tracking-widest transition-all" asChild>
              <Link href="https://www.linkedin.com/in/muhammad-danish-iman-sufian-9829b4291" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </Link>
            </Button>
          </div>
        </section>

      </main>

      <footer className="border-t-2 border-dashed border-slate-400/30 py-6 px-6 text-xs font-gotham uppercase tracking-widest text-slate-300 flex items-center justify-between relative z-10 bg-[#0041BA]/80 dark:bg-[#1a2f54]/80 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} Danish Iman</p>
        <div className="flex items-center gap-4">
          <Cpu className="h-4 w-4" /> ESP32 Portfolio
        </div>
      </footer>

    </div>
  )
}
