"use client"

import { Play } from "lucide-react"

interface YouTubeThumbnailProps {
  videoId: string
  title: string
}

export default function YouTubeThumbnail({ videoId, title }: YouTubeThumbnailProps) {
  const handleClick = () => {
    // Direct link to the specific video
    window.open(`https://www.youtube.com/watch?v=8nuXappLMU8`, "_blank")
  }

  return (
    <div className="relative aspect-video cursor-pointer group max-w-4xl mx-auto" onClick={handleClick}>
      <img
        src={`https://img.youtube.com/vi/8nuXappLMU8/maxresdefault.jpg`}
        alt="Database & Management System L3 | GATE 2025 CS/IT/DA"
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center rounded-lg">
        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center transform group-hover:scale-105 transition-transform">
          <Play className="w-8 h-8 text-white translate-x-0.5" />
        </div>
      </div>
    </div>
  )
}

