import Link from "next/link"
import { PopperC } from "../ui/PopperC"
import Image from "next/image"

type AdminTemplateProps = {
  children: React.ReactNode
  footer?: React.ReactNode
  hasImage?: boolean
  image?: string
  alt?: string
  hasFooter?: boolean
  hasActions?: boolean
  linkEdit?: string
  onClickEdit?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement | HTMLAnchorElement>
  onClickDelete?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement | HTMLAnchorElement>
}

export const AdminCard = ({ children, footer, hasImage, image, alt, hasFooter, hasActions, linkEdit, onClickEdit, onClickDelete }: AdminTemplateProps ) => {

  return (
    <>
    <div className="relative bg-surface rounded-lg overflow-hidden">
      {
        hasActions && linkEdit &&
        <div className="absolute top-2 right-2">
          <PopperC>
            <ul className="flex flex-col gap-2">
              <li><Link href={ linkEdit } onClick={ onClickEdit } className="block">Editar</Link></li>
              <li><button onClick={ onClickDelete } className="block">Eliminar</button></li>
            </ul>
          </PopperC>
        </div>
      }
      {
        hasImage &&
        <div className="aspect-video flex items-center justify-center bg-gray50">
          { image && alt ? 
            <Image src={ image } width={ 320 } height={ 160 } alt={ alt } className="aspect-video object-cover" />
            : <i className="fi fi-tr-image-slash text-3xl text-gray-500"></i>
          }
        </div>
      }
      <div className="p-6">
        { children }
      </div>
      {
        hasFooter &&
        <div className="px-6 py-4 border-t border-t-gray50 flex flex-col gap-2 text-gray500">
          { footer }
        </div>
      }
    </div>
    </>
  )
}