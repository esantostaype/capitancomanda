import Image from 'next/image'

interface Props {
  text?: string
  icon?: string
  onClick?: any
}

export const ButtonSocial = ({ text, icon, onClick }: Props) => {

	return (
    <button className="bg-gray50 hover:bg-gray100 shadow-[1px_2px_2px_rgba(0,0,0,0.3)] flex items-center justify-center rounded gap-3 py-3 px-6 w-full" onClick={ onClick }>
      <Image src={ `/images/${ icon }.svg` } width="16" height="16" alt={ `Social Media ${ text }` } />
      { text }
    </button>
	)
}