'use client'
import { Button, Modal, ModalConfirm } from '@/components'
import { Color, Size, Variant } from '@/interfaces'
import { useUiStore } from '@/store/ui-store'

type Props = {
  link: string
  id: string
  token: string
  branchId?: string
  dataId?: string
  onDelete: ( id: string, token: string ) => Promise<void>
  disabled?: boolean
}

export const TableActions = ({ link, id, token, dataId, onDelete }: Props) => {

  const { openModalPage, closeModalConfirm, openModalConfirm, activeModalConfirmId, activeModal } = useUiStore()

  const handleDelete = async ( id: string ) => {
    await onDelete( id, token )
    closeModalConfirm
  }

  return (
    <>
      {
        activeModalConfirmId === id && (
          <ModalConfirm
            title='¿Estás seguro de eliminar este producto?'
            detail='Al eliminar este producto, también se eliminará de todas las órdenes en las que esté incluido.'
            buttonConfirmText='Sí, eliminar producto'
            onClickConfirm={() => { handleDelete( id ) }}
            onClickCancel={() => { closeModalConfirm() }}
          />
        )
      }
      <div className="flex items-center gap-3 justify-end">
        <Button
          href={link}
          onClick={() => openModalPage()}
          text='Editar'
          color={ Color.INFO }
          size={ Size.SM }
          variant={ Variant.GHOST }
          iconName='pencil'
        />
        <Button
          text='Eliminar'
          color={ Color.ERROR }
          size={ Size.SM }
          variant={ Variant.GHOST }
          iconName='trash'
          onClick={() => openModalConfirm(id)}
        />
      </div>
    </>
  )
}