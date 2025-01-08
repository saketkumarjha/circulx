import { Mongoose } from 'mongoose'
import React from 'react'

declare global {
  var mongoose: {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
  } | undefined

  namespace JSX {
    interface IntrinsicElements {
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
    }
  }
}

export {}

