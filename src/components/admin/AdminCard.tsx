'use client'
import Link from 'next/link'
import { PopperC } from '@/components'
import Image from 'next/image'
import { Skeleton } from '@mui/material'

type AdminTemplateProps = {
  children: React.ReactNode
  footer?: React.ReactNode
  hasImage?: boolean
  image?: string
  alt?: string
  hasFooter?: boolean
  hasActions?: boolean
  linkEdit?: string
  isSkeleton?: boolean
  className?: string
  onClickEdit?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement | HTMLAnchorElement>
  onClickDelete?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement | HTMLAnchorElement>
}

export const AdminCard = ({ children, footer, hasImage, image, alt, hasFooter, isSkeleton, linkEdit, className, onClickEdit, onClickDelete }: AdminTemplateProps ) => {

  return (
    <>
    <div className={`${ className || "" } relative bg-surface rounded-lg overflow-hidden transition-all`}>
      {
        linkEdit &&
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
        hasImage && !isSkeleton ?
        <div className="aspect-video flex items-center justify-center bg-gray50">
          { image && alt ? 
            <Image src={ image } width={ 320 } height={ 160 } alt={ alt } className="aspect-video object-cover" />
            : <i className="fi fi-tr-image-slash text-3xl text-gray-500"></i>
          }
        </div> : isSkeleton &&
        <Skeleton animation='wave' variant='rectangular' width={ 320 } height={ 142 } className="bg-gray50" />
      } 
      <div className={`${ hasImage ? "py-4 px-6" : "p-6" }`}>
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