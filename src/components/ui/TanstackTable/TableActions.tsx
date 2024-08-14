'use client'
import { Button, Modal } from '@/components'
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

export const TableActions = ({ link, id, token, branchId, dataId, onDelete }: Props) => {

  const { openModalPage, closeModal, openModalById, activeModalId, activeModal } = useUiStore()

  const handleDelete = async ( id: string ) => {
    await onDelete( id, token )
    closeModal()
  }

  const isAuthor = dataId === branchId

  console.log( "dataId: ", dataId, "branchId: ", branchId )

  return (
    <>
      {
        activeModal && activeModalId === id && (
          <Modal>
            <div className="confirm">
              <div className='confirm__icon error'>
                <i className="fi fi-rr-trash"></i>
              </div>
              <h3 className="confirm__title">¿Estás seguro de eliminar este producto?</h3>
              <p>Al eliminar este producto, también se eliminará de todas las órdenes en las que esté incluido.</p>
              <div className="confirm__buttons">
                <Button text='Cancelar' variant={ Variant.CONTAINED } onClick={() => { closeModal() }} />
                <Button text='Sí, eliminar producto' variant={ Variant.CONTAINED } color={ Color.ERROR } onClick={() => { handleDelete(id), closeModal() }} />
              </div>
            </div>
          </Modal>
        )
      }
      <div className="flex items-center gap-3 justify-end">
        {
          isAuthor ? (
            <Button
              href={link}
              onClick={() => openModalPage()}
              text='Editar'
              color={ Color.INFO }
              size={ Size.SMALL }
              variant={ Variant.GHOST }
              iconName='pencil'
            />
          ) : (
            <Button
              href={link}
              onClick={() => openModalPage()}
              text='Ver'
              color={ Color.INFO }
              size={ Size.SMALL }
              variant={ Variant.GHOST }
              iconName='eye'
            />
          )
        }
        {
          isAuthor &&
          <Button
            text='Eliminar'
            color={ Color.ERROR }
            size={ Size.SMALL }
            variant={ Variant.GHOST }
            iconName='trash'
            onClick={() => openModalById(id)}
          />
        }
      </div>
    </>
  )
}