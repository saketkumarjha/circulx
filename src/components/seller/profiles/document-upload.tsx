"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, FileIcon, X } from "lucide-react"

interface DocumentUploadProps {
  label: string
  onChange: (value: string) => void
  value?: string
  required?: boolean
  accept?: string
  description?: string
}

export function DocumentUpload({
  label,
  onChange,
  value,
  required = false,
  accept = ".pdf,.jpg,.jpeg,.png",
  description,
}: DocumentUploadProps) {
  const [fileName, setFileName] = useState<string | undefined>()
  const [preview, setPreview] = useState<string | null>(null)

  // Update fileName and preview when value changes
  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        if (value.startsWith("data:") || value.startsWith("http")) {
          // For base64 data or URLs, extract filename or use placeholder
          setPreview(value)

          if (value.startsWith("data:")) {
            setFileName("Uploaded file")
          } else {
            // Extract filename from URL
            const urlParts = value.split("/")
            setFileName(urlParts[urlParts.length - 1])
          }
        } else {
          // Just a filename
          setFileName(value)
          setPreview(null)
        }
      } else {
        setFileName(undefined)
        setPreview(null)
      }
    } else {
      setFileName(undefined)
      setPreview(null)
    }
  }, [value])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)

      // Convert file to base64 string for storage
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setPreview(base64String)
        onChange(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearFile = () => {
    setFileName(undefined)
    setPreview(null)
    onChange("")
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={`file-${label}`} className="flex items-center">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {description && <p className="text-sm text-gray-500">{description}</p>}

      <div className="flex flex-col gap-2">
        <Input id={`file-${label}`} type="file" onChange={handleFileChange} className="hidden" accept={accept} />

        {fileName ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 p-2 border rounded-md w-full">
              <FileIcon className="h-4 w-4 text-blue-500" />
              <span className="text-sm truncate flex-1">{fileName}</span>
              <Button type="button" variant="ghost" size="sm" onClick={clearFile} className="h-6 w-6 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Preview for image files */}
            {preview && preview.startsWith("data:image") && (
              <div className="mt-2 border rounded-md p-2 max-w-xs">
                <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-32 object-contain mx-auto" />
              </div>
            )}

            {/* Preview for URLs that might be images */}
            {preview && preview.startsWith("http") && (
              <div className="mt-2 border rounded-md p-2 max-w-xs">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-32 object-contain mx-auto"
                  onError={(e) => {
                    // Hide if not an image
                    ;(e.target as HTMLImageElement).style.display = "none"
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById(`file-${label}`)?.click()}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose File
          </Button>
        )}
      </div>
    </div>
  )
}

