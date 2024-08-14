import Link from 'next/link'

type LinkProps = {
  text: string
  href: string
}
export const LinkComponent = ({ text, href }: LinkProps) => {

  return (
    <Link href={ href } className="text-accent">{ text }</Link>
  )
}