'use client'
import { Button, ModalBody, ModalFooter } from '@/components'
import { Color, Variant } from '@/interfaces'
import { Skeleton } from '@mui/material'

export const CategoryFormSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <ModalBody>
        <div className="flex flex-col gap-8">
          <div className="max-w-40">
            <Skeleton animation='wave' variant='rounded' width={ 160 } height={ 160 } className="bg-gray50" />
          </div>
          <Skeleton animation='wave' variant="rounded" height={ 47 } className="bg-gray50" />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button text="Cancelar" variant={ Variant.CONTAINED } disabled/>            
        <Button color={ Color.ACCENT } variant={ Variant.CONTAINED } text="Guardar Categoría" disabled/>
      </ModalFooter>
    </div>
  )
}