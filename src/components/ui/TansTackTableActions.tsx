'use client'
import { Button, Modal } from '@/components'
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

export const TansTackTableActions = ({ link, id, token, branchId, dataId, onDelete }: Props) => {

  const { openModalPage, closeModal, openModalById, activeModalId, activeModal } = useUiStore()

  const handleDelete = async ( id: string ) => {
    await onDelete( id, token )
    closeModal()
  }

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
                <Button text='Cancelar' onClick={() => { closeModal() }} />
                <Button text='Sí, eliminar producto' mode='error' onClick={() => { handleDelete(id), closeModal() }} />
              </div>
            </div>
          </Modal>
        )
      }
      <div className="table__flex table__actions">
        {
          dataId === branchId ? (
            <Button
              href={link}
              onClick={() => openModalPage()}
              text={'Editar'}
              mode='info' size='small'
              ghost
              iconName='pencil'
            />
          ) : (
            <Button
              href={link}
              onClick={() => openModalPage()}
              text={'Ver'}
              mode='info' size='small'
              ghost
              iconName='eye'
            />
          )
        }
        {
          dataId === branchId &&
          <Button
            text='Eliminar'
            mode='error'
            size='small'
            ghost
            iconName='trash'
            onClick={() => openModalById(id)}
          />
        }
      </div>
    </>
  )
}