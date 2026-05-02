"use client"

import { useState } from "react"
import { Copy, ChevronDown, ChevronUp } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { type Project } from "@/app/projects/[id]/projects"

export function ProjectCodeTab({ project }: { project: Project }) {
  const [showMainCode, setShowMainCode] = useState(true)
  const [showIniCode, setShowIniCode] = useState(true)
  const [showPythonCode, setShowPythonCode] = useState(true)

  return (
    <section className="space-y-6 max-w-5xl">
      <h2 className="text-xl font-gotham font-bold uppercase tracking-widest text-slate-50">Source Code</h2>

      <div className="border-2 border-dashed border-slate-400/30 rounded-none overflow-hidden bg-[#0041BA]/50 dark:bg-[#1a2f54]/50 backdrop-blur-sm">
        <div 
          className="flex items-center justify-between bg-[#405CB1]/70 px-4 py-3 text-xs font-gotham uppercase tracking-wider border-b-2 border-dashed border-slate-400/30 cursor-pointer select-none"
          onClick={() => setShowMainCode(!showMainCode)}
        >
          <div className="flex items-center gap-2">
            {showMainCode ? <ChevronUp className="h-4 w-4 text-[#BDD99F]" /> : <ChevronDown className="h-4 w-4 text-[#f5b1aa]" />}
            <span className="text-slate-50 font-bold">main.cpp</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigator.clipboard.writeText(project.code)
            }}
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <Copy className="h-4 w-4" /> Copy
          </button>
        </div>

        {showMainCode && (
          <div className="max-h-[600px] overflow-y-auto bg-[#282c34] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#282c34] [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">
            <SyntaxHighlighter
              language="cpp"
              style={oneDark}
              customStyle={{ margin: 0, padding: "1.5rem", background: "transparent" }}
            >
              {project.code}
            </SyntaxHighlighter>
          </div>
        )}
      </div>

      {project.platformioIni && (
        <div className="border-2 border-dashed border-slate-400/30 rounded-none overflow-hidden bg-[#0041BA]/50 dark:bg-[#1a2f54]/50 backdrop-blur-sm">
          <div 
            className="flex items-center justify-between bg-[#405CB1]/70 px-4 py-3 text-xs font-gotham uppercase tracking-wider border-b-2 border-dashed border-slate-400/30 cursor-pointer select-none"
            onClick={() => setShowIniCode(!showIniCode)}
          >
            <div className="flex items-center gap-2">
              {showIniCode ? <ChevronUp className="h-4 w-4 text-[#BDD99F]" /> : <ChevronDown className="h-4 w-4 text-[#f5b1aa]" />}
              <span className="text-slate-50 font-bold">platformio.ini</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                navigator.clipboard.writeText(project.platformioIni!)
              }} 
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Copy className="h-4 w-4" /> Copy
            </button>
          </div>
          {showIniCode && (
            <div className="max-h-[400px] overflow-y-auto bg-[#282c34] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#282c34] [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">
              <SyntaxHighlighter language="ini" style={oneDark} customStyle={{ margin: 0, padding: "1.5rem", background: "transparent" }}>
                {project.platformioIni}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      )}

      {project.pythonCode && (
        <div className="border-2 border-dashed border-slate-400/30 rounded-none overflow-hidden bg-[#0041BA]/50 dark:bg-[#1a2f54]/50 backdrop-blur-sm">
          <div 
            className="flex items-center justify-between bg-[#405CB1]/70 px-4 py-3 text-xs font-gotham uppercase tracking-wider border-b-2 border-dashed border-slate-400/30 cursor-pointer select-none"
            onClick={() => setShowPythonCode(!showPythonCode)}
          >
            <div className="flex items-center gap-2">
              {showPythonCode ? <ChevronUp className="h-4 w-4 text-[#BDD99F]" /> : <ChevronDown className="h-4 w-4 text-[#f5b1aa]" />}
              <span className="text-slate-50 font-bold">pc_agent.py</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                navigator.clipboard.writeText(project.pythonCode!)
              }} 
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <Copy className="h-4 w-4" /> Copy
            </button>
          </div>
          {showPythonCode && (
            <div className="max-h-[400px] overflow-y-auto bg-[#282c34] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#282c34] [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">
              <SyntaxHighlighter language="python" style={oneDark} customStyle={{ margin: 0, padding: "1.5rem", background: "transparent" }}>
                {project.pythonCode}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      )}
    </section>
  )
}