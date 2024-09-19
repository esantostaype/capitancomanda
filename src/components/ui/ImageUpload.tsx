'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Button, Spinner } from '@/components'
import { Size, Variant } from '@/interfaces'

interface Props {
  newImage: string | null
  deleteImage: boolean
  setNewImage: (image: string | null) => void
  setDeleteImage: (deleteImage: boolean) => void
  image: string
  altImage: string
  disabled?: boolean
}

export const ImageUpload: React.FC<Props> = ({
  newImage,
  deleteImage,
  setNewImage,
  setDeleteImage,
  image,
  altImage,
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [ imgUploading, setImgUploading ] = useState<boolean>( false )

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgUploading(true)
    try {
      const file = e.target.files?.[0]
      if (file) {
        const formData = new FormData()
        formData.append('image', file)
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        if (!response.ok) {
          throw new Error('Error uploading image')
        }
        const data = await response.json()
        setNewImage(data.url)
        setDeleteImage(false)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setImgUploading(false)
    }
  }

  return (
    <div className={`relative aspect-square rounded-lg overflow-hidden w-full group transition-all ${ disabled ? "disabled" : "" }`}>
      <Spinner isActive={ imgUploading } />
      { deleteImage ? (
        <div className="aspect-square w-full flex items-center justify-center bg-gray50">
          <i className="fi fi-tr-image-slash text-3xl"></i>
        </div>
      ) : newImage ? (
        <Image src={ newImage } width={ 320 } height={ 320 } alt="Nueva Imagen" className="object-cover aspect-square" />
      ) : (
        <>
          { image ? (
            <Image src={ image } width={ 320 } height={ 320 } alt={ altImage } className="object-cover aspect-square" />
          ) : (
            <div className="aspect-square w-full flex items-center justify-center bg-gray50">
              <i className="fi fi-tr-image-slash text-3xl"></i>
            </div>
          )}
        </>
      )}
      <input type="file" id="file" ref={ fileInputRef } onChange={ handleImageChange } className="hidden" />
      <div className="absolute top-0 left-0 h-full w-full z-10 transition-all p-6 opacity-0 group-hover:opacity-100">
        <div className="absolute flex flex-col items-center justify-center gap-2 top-0 left-0 h-full w-full z-20">
          { newImage || ( image && !deleteImage ) ? (
            <>
              <Button text="Cambiar" size={ Size.SM } variant={ Variant.CONTAINED } onClick={() => fileInputRef.current?.click()} />
              <Button
                text="Eliminar"
                size={ Size.SM }
                variant={ Variant.CONTAINED }
                onClick={() => {
                  setNewImage(null)
                  setDeleteImage(true)
                }}
              />
            </>
          ) : (
            <Button text="Agregar" size={ Size.SM } variant={ Variant.CONTAINED } onClick={() => fileInputRef.current?.click()} />
          )}
        </div>
        <div className="absolute top-0 left-0 h-full w-full opacity-10 bg-accent z-10"></div>
      </div>
    </div>
  )
}