import { Color, Size, Variant } from '@/interfaces'
import { Button } from '@/components'

interface Props {
  label: string 
}

export const AuthButton = ({ label }: Props) => {

  return (
    <Button color={ Color.ACCENT } variant={ Variant.CONTAINED } text={ label } size={ Size.LG } full submit />
  )
}