"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface YouTubePlayerProps {
  videoId: string
  isPlaying: boolean
  onPlayClick: () => void
}

export default function YouTubePlayer({ videoId, isPlaying, onPlayClick }: YouTubePlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null)
  const [thumbnailError, setThumbnailError] = useState(false)

  useEffect(() => {
    if (isPlaying && playerRef.current) {
      const iframe = document.createElement("iframe")
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      iframe.width = "100%"
      iframe.height = "100%"
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iframe.allowFullscreen = true
      iframe.style.position = "absolute"
      iframe.style.top = "0"
      iframe.style.left = "0"
      iframe.style.width = "100%"
      iframe.style.height = "100%"
      iframe.style.border = "none"

      playerRef.current.innerHTML = ""
      playerRef.current.appendChild(iframe)
    }
  }, [isPlaying, videoId])

  if (!isPlaying) {
    return (
      <div className="relative aspect-video cursor-pointer group" onClick={onPlayClick}>
        {!thumbnailError ? (
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Video thumbnail"
            layout="fill"
            objectFit="cover"
            onError={() => setThumbnailError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Thumbnail unavailable</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-white border-b-8 border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>
    )
  }

  return <div ref={playerRef} className="aspect-video" />
}

