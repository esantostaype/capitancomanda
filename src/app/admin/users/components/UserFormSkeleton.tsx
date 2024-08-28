'use client'
import { Button, ModalBody, ModalFooter } from '@/components'
import { Color, Size, Variant } from '@/interfaces'
import { Skeleton } from '@mui/material'

export const UserFormSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <ModalBody>
        <div className="grid grid-cols-2 gap-6">
          <div className='col-span-1'>
            <Skeleton animation="wave" variant="rounded" height={ 47 } className="bg-gray50" />
          </div>
          <div className='col-span-1'>
            <Skeleton animation="wave" variant="rounded" height={ 47 } className="bg-gray50" />
          </div>
          <div className='col-span-1'>
            <Skeleton animation="wave" variant="rounded" height={ 47 } className="bg-gray50" />
          </div>
          <div className='col-span-1'>
            <Skeleton animation="wave" variant="rounded" height={ 47 } className="bg-gray50" />
          </div>
          <div className='col-span-1'>
            <Skeleton animation="wave" variant="rounded" height={ 47 } className="bg-gray50" />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button text="Cancelar" variant={ Variant.CONTAINED } size={ Size.LG } disabled/>
        <Button color={ Color.ACCENT } variant={ Variant.CONTAINED } text="Guardar Sucursal" size={ Size.LG } disabled/>
      </ModalFooter>
    </div>
  )
}