'use client'
import Image from 'next/image'
import { OrderItemFull } from '@/interfaces'
import { formatCurrency } from '@/utils'
import Link from 'next/link'
import { OrderProductDetail } from './OrderProductDetail'

type Props = {
  product: OrderItemFull
}

export const OrderProductItem = ({ product } : Props ) => {

  const minVariantPrice = product?.variations
    .filter( variation => variation?.hasPrice )
    .flatMap( variation => variation?.options.map( option => option?.price ))
    .reduce(( min, price ) => price! < min! ? price : min, Infinity)

  const displayedPrice = minVariantPrice !== Infinity 
    ? minVariantPrice 
    : product.price

  const hasVariantPrices = minVariantPrice !== Infinity
    
  return (
    <li className="relative flex flex-col justify-between cursor-pointer group active:scale-[0.98] bg-surface hover:bg-gray50 transition-all duration-300 rounded-lg ">
      <Link href={`?p=${ product.id }`}>
      <div className="p-6 flex gap-4">
        <div className="relative z-20 bg-gray50 flex items-center justify-center rounded-lg h-16 w-16 overflow-hidden">
        { product.image ? (
          <Image src={ product.image } alt={ product.name } width={ 128 } height={ 128 } className="object-cover aspect-square" />
        ) : (
          <i className="fi fi-tr-image-slash text-3xl text-gray500"></i>
        )}
        </div>
        <div className='relative z-10 flex flex-col justify-between flex-1 w-full'>
          <div>
            <div className="leading-tight">{ product.name }</div>
            <div className="flex items-center gap-1 mt-2 text-gray600">
              {
                hasVariantPrices &&
                <span className="leading-none">Desde:</span>
              }
              <span className="text-lg font-bold leading-none">
                {formatCurrency( displayedPrice! )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 px-6 py-4 border-t border-t-gray50 flex-1">
        <p className="text-gray500 leading-tight overflow-ellipsis line-clamp-2">{ product.description || "Sin Descripción" }</p>
      </div>
      </Link>
    </li>
  )
}
