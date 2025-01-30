"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import YouTubePlayer from "./video-player"

const tutorials = [
  {
    id: "tutorial1",
    title: "Getting Started with Dashboard",
    videoId: "8nuXappLMU8",
    description: "Learn how to navigate and use the main dashboard features effectively.",
  },
  // Add more tutorials as needed
]

export default function TutorialSection() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {tutorials.map((tutorial) => (
        <Card key={tutorial.id} className="overflow-hidden">
          <div className="relative">
            <YouTubePlayer
              videoId={tutorial.videoId}
              isPlaying={playingVideo === tutorial.id}
              onPlayClick={() => setPlayingVideo(tutorial.id)}
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
            <p className="text-muted-foreground">{tutorial.description}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

