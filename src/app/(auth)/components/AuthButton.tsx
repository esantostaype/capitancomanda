import { Color, Size, Variant } from '@/interfaces'
import { Button } from '@/components'

type AuthTitleProps = {
  label: string 
}

export const AuthButton = ({ label }: AuthTitleProps) => {

  return (
    <Button color={ Color.ACCENT } variant={ Variant.CONTAINED } text={ label } size={ Size.LARGE } full submit />
  )
}