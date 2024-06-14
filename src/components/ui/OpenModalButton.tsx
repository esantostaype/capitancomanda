'use client'
import { ButtonSC } from "@/components"
import { useUiStore } from "@/store/ui-store"

type Props = {
  link: string
}

export const OpenModalButton = ({ link }: Props ) => {
  const { openModal } = useUiStore()
  return (
    <ButtonSC href={ link } onClick={ () => openModal() } text='Crear Nuevo' mode='primary' size='small' />
  )
}