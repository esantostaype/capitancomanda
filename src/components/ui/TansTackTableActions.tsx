'use client'
import { Button } from '@/components'
import { useUiStore } from '@/store/ui-store'

type Props = {
  link: string
  id: string
  token: string
  onDelete: ( id: string, token: string ) => Promise<void>
}

export const TansTackTableActions = ({ link, id, token, onDelete }: Props ) => {

  const { openModalPage } = useUiStore()

  const handleDelete = async ( id: string ) => {
    await onDelete( id, token )
  }

  return (
    <div className="table__flex table__actions">
      <Button href={ link } onClick={ () => openModalPage() } text='Editar' mode='info' size='small' ghost iconName='pencil' />
      <Button text='Eliminar' mode='error' size='small' ghost iconName='trash' onClick={ () => handleDelete( id ) } />
    </div>
  )
}
