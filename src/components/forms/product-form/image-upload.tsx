'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Image as ImageIcon, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import Image from 'next/image'

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  onError: (error: string) => void
  className?: string
}

const FIVE_MB = 5 * 1024 * 1024
const ACCEPTED_TYPES = {
  'image/jpeg': [],
  'image/png': [],
  'image/webp': []
}

// Optimal dimensions for product images
const OPTIMAL_WIDTH = 1200
const OPTIMAL_HEIGHT = 720
const ASPECT_RATIO = OPTIMAL_WIDTH / OPTIMAL_HEIGHT

const ImageUpload = ({ 
  value, 
  onChange, 
  onError,
  className 
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string>(value)
  const [isLoading, setIsLoading] = useState(false)
  const [imageAspectRatio, setImageAspectRatio] = useState(ASPECT_RATIO)

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = document.createElement('img') as HTMLImageElement;
      img.onload = () => {
        URL.revokeObjectURL(img.src)
        if (img.width < OPTIMAL_WIDTH || img.height < OPTIMAL_HEIGHT) {
          onError(`Khuyến nghị kích thước ảnh tối thiểu ${OPTIMAL_WIDTH}x${OPTIMAL_HEIGHT} pixels để đạt chất lượng tốt nhất`)
          resolve(false)
        }
        setImageAspectRatio(img.width / img.height)
        resolve(true)
      }
      img.src = URL.createObjectURL(file)
    })
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]

    if (!file) return

    if (file.size > FIVE_MB) {
      onError('Kích thước file vượt quá giới hạn 5MB')
      return
    }

    const isValidImage = await validateImage(file)
    if (!isValidImage) return

    try {
      setIsLoading(true)
      const data = new FormData()
      data.set('file', file)

      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: data
      })
      
      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const imageUrl = await response.json()
      toast.success('Tải ảnh lên thành công!')
      setPreview(imageUrl)
      onChange(imageUrl)
    } catch (error) {
      onError('Có lỗi xảy ra khi tải ảnh! Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }, [onChange, onError])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles: 1,
    disabled: isLoading,
    multiple: false
  })

  const handleRemoveImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview('')
    onChange('')
  }, [onChange])

  return (
    <div className={cn('space-y-4', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-xl transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          isDragActive ? 'border-primary bg-primary/10' : 'border-muted',
          preview ? 'border-none p-0' : 'p-8',
          isLoading && 'opacity-50 cursor-not-allowed',
          'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed'
        )}
        role="button"
        aria-label="Upload image"
        tabIndex={0}
      >
        <input {...getInputProps()} accept={Object.keys(ACCEPTED_TYPES).join(',')} />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-50 rounded-xl">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}

        {preview ? (
          <div className="relative bg-gray-100 rounded-xl">
            <div className={cn(
              "relative w-full",
              "sm:aspect-[7/2] aspect-[3/2]",
              "overflow-hidden rounded-xl",
            )}>
              <Image
                src={preview}
                alt="Preview"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className={cn(
                  "object-cover",
                  "transition-all duration-300",
                  "hover:scale-105"
                )}
                quality={95} // Higher quality for product images
              />
            </div>
            <button
              onClick={handleRemoveImage}
              className={cn(
                "absolute top-2 right-2 p-1.5 rounded-full",
                "bg-destructive text-destructive-foreground",
                "hover:bg-destructive/90 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "shadow-sm"
              )}
              aria-label="Remove image"
            >
              <X className="size-5 text-black" />
            </button>
          </div>
        ) : (
          <div className="space-y-3 text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                {isDragActive ? 'Thả hình ảnh vào đây' : 'Kéo thả hoặc nhấn để tải ảnh lên'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Hỗ trợ định dạng: PNG, JPG, WebP (tối đa 5MB)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Khuyến nghị kích thước: {OPTIMAL_WIDTH}x{OPTIMAL_HEIGHT} pixels
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUpload