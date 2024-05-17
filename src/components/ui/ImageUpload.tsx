'use client'
import Image from 'next/image'
import styles from './ImageUpload.module.css'
import { Button } from './Button'
import { Spinner } from '@/components'
import { useState } from 'react'

interface Props {
  onChange: any
}

export const ImageUpload = ({ onChange }: Props ) => {
  return (
    <>
      <label
        htmlFor="file"
        className={ styles.main }
      >
        <div className={ styles.content }>
          <i className="fi fi-tr-cloud-upload-alt"></i>
          <span>Arrastra y suelta tu imagen aquí o</span>
          <Button size='small' mode='primary' div ghost text='Busca en tus archivos' />
        </div>
        <input type="file" id="file" onChange={ onChange } className={ styles.file } />
      </label> 
    </>
  )
}
