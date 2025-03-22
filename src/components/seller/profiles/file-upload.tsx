"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "@uploadthing/react"
import { generateClientDropzoneAccept } from "uploadthing/client"
import { X } from "lucide-react"
import Image from "next/image"

interface FileUploadProps {
  endpoint?: "profileImage" | "documentImage"
  onChange: (url?: string) => void
  value?: string | null | undefined
  onRemove?: () => void
  accept?: string
  maxSize?: number
  label?: string
}

export const FileUpload = ({
  endpoint = "profileImage",
  onChange,
  value,
  onRemove,
  accept,
  maxSize,
  label,
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsUploading(true)
      const file = acceptedFiles[0]

      if (file) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("uploadPreset", "profileImage")

        fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            onChange(data.secure_url)
          })
          .catch((error) => {
            console.error("Upload error:", error)
          })
          .finally(() => setIsUploading(false))
      }
    },
    [onChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : generateClientDropzoneAccept([endpoint]),
    multiple: false,
    maxSize: maxSize ? maxSize * 1024 * 1024 : undefined,
  })

  // Only render the image if value is a non-empty string
  const hasValidImage = typeof value === "string" && value.length > 0

  return (
    <div className="flex items-center">
      {hasValidImage && (
        <div className="relative h-20 w-20">
          <Image fill alt="Upload" src={(value as string) || "/placeholder.svg"} className="rounded-full" />
          <button
            onClick={() => {
              if (onRemove) onRemove()
            }}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {!hasValidImage && (
        <div {...getRootProps()} className="relative border-2 border-dashed border-sky-500/50 p-4 rounded-md">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="text-muted-foreground text-sm">
              {label || "Drag 'n' drop an image here, or click to select files"}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

