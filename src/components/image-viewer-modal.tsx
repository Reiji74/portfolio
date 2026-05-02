"use client"

import { useState, useRef, MouseEvent } from "react"
import { ZoomIn, ZoomOut, X } from "lucide-react"

export function ImageViewerModal({ image, onClose }: { image: string; onClose: () => void }) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const dragPos = useRef({ x: 0, y: 0, left: 0, top: 0, dragged: false })

  const handleMouseDown = (e: MouseEvent) => {
    if (zoomLevel <= 1) return
    e.preventDefault()
    setIsDragging(true)
    dragPos.current = {
      x: e.clientX,
      y: e.clientY,
      left: scrollContainerRef.current?.scrollLeft || 0,
      top: scrollContainerRef.current?.scrollTop || 0,
      dragged: false
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    const dx = e.clientX - dragPos.current.x
    const dy = e.clientY - dragPos.current.y
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      dragPos.current.dragged = true
    }
    scrollContainerRef.current.scrollLeft = dragPos.current.left - dx
    scrollContainerRef.current.scrollTop = dragPos.current.top - dy
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0041BA] dark:bg-[#1a2f54]"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="absolute top-6 right-6 flex items-center gap-2 z-50 shadow-lg">
        <button 
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.5, 4))}
          className="p-2 bg-[#405CB1] text-slate-50 rounded-md hover:bg-[#405CB1]/80 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.5, 0.5))}
          className="p-2 bg-[#405CB1] text-slate-50 rounded-md hover:bg-[#405CB1]/80 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-slate-400/30 mx-2"></div>
        <button 
          onClick={onClose}
          className="p-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/80 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        className={`w-full h-full overflow-auto p-4 flex ${zoomLevel > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-out"}`}
        onClick={() => {
          if (dragPos.current.dragged) {
            dragPos.current.dragged = false;
            return;
          }
          onClose();
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="m-auto flex items-center justify-center" onClick={(e) => {
          if (!dragPos.current.dragged) {
            e.stopPropagation();
          }
        }}>
          <img 
            src={image} 
            alt="Zoomed project view" 
            className="rounded-md pointer-events-none transition-all duration-200 ease-out shadow-2xl"
            style={{ 
              maxWidth: zoomLevel === 1 ? '90vw' : 'none',
              maxHeight: zoomLevel === 1 ? '90vh' : 'none',
              width: zoomLevel !== 1 ? `calc(90vw * ${zoomLevel})` : 'auto',
            }}
          />
        </div>
      </div>
    </div>
  )
}