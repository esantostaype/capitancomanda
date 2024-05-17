'use client'
import { Button, ButtonSC } from "@/components"
import { useAdminStore } from "@/store/admin-store"

type Props = {
  link: string
}

export const OpenModalButton = ({ link }: Props ) => {
  const { setOpenModal } = useAdminStore()
  const handleClick = () => {
    setOpenModal( true )
  }
  return (
    <ButtonSC href={ link } onClick={ () => handleClick() } text='Crear Nuevo' mode='primary' size='small' />
  )
}