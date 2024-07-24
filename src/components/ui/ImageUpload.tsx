'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Button, Spinner } from '@/components'

interface ImageUploadProps {
  newImage: string | null
  deleteImage: boolean
  setNewImage: (image: string | null) => void
  setDeleteImage: (deleteImage: boolean) => void
  image: string
  altImage: string
  disabled?: boolean
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
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
    <div className={`upload-image ${ disabled && "disabled" }`}>
      { deleteImage ? (
        <>
          <div className={`uploading ${imgUploading ? 'active' : ''}`}>
            <Spinner />
          </div>
          <div className="upload-image__null">
            <i className="fi fi-tr-image-slash"></i>
          </div>
        </>
      ) : newImage ? (
        <>
          <div className={`uploading ${imgUploading ? 'active' : ''}`}>
            <Spinner />
          </div>
          <Image src={ newImage } width={ 320 } height={ 320 } alt="Nueva Imagen" />
        </>
      ) : (
        <>
          <div className={`uploading ${imgUploading ? 'active' : ''}`}>
            <Spinner />
          </div>
          { image ? (
            <>
              <div className={`uploading ${imgUploading ? 'active' : ''}`}>
                <Spinner />
              </div>
              <Image src={ image } width={ 320 } height={ 320 } alt={ altImage } />
            </>
          ) : (
            <>
              <div className={`uploading ${imgUploading ? 'active' : ''}`}>
                <Spinner />
              </div>
              <div className="upload-image__null">
                <i className="fi fi-tr-image-slash"></i>
              </div>
            </>
          )}
        </>
      )}
      <input type="file" id="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
      <div className="upload-image__actions">
        {newImage || ( image && !deleteImage ) ? (
          <>
            <Button text="Cambiar" size="small" onClick={() => fileInputRef.current?.click()} />
            <Button
              text="Eliminar"
              size="small"
              onClick={() => {
                setNewImage(null)
                setDeleteImage(true)
              }}
            />
          </>
        ) : (
          <Button text="Agregar" size="small" onClick={() => fileInputRef.current?.click()} />
        )}
      </div>
    </div>
  )
}