'use client'
import { ButtonSC } from "@/components"
import { useUiStore } from "@/store/ui-store"

type Props = {
  link: string
}

export const OpenModalPageButton = ({ link }: Props ) => {
  const { openModalPage } = useUiStore()
  return (
    <ButtonSC href={ link } onClick={ () => openModalPage() } text='Crear Nuevo' mode='primary' size='small' />
  )
}