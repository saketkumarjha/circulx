'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function TestButton() {
  const [count, setCount] = useState(0)

  return (
    <Button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </Button>
  )
}

