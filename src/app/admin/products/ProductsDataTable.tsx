'use client'

import { Product } from "@/interfaces"
import { formatCurrency } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { Button, TansTackTable } from "@/components"
import { useAdminStore } from "@/store/admin-store"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { deleteProduct } from "@/actions/add-product"

type Props = {
  data: any
}

export const ProductsDataTable = ({ data }: Props ) => {
  
  const router = useRouter()

  const { setOpenModal } = useAdminStore()

  const handleClick = () => {
    setOpenModal( true )
  }

  const handleDelete = async ( id: number ) => {
    await deleteProduct( id )
  }

  useEffect(() => {
    const handleKeyDown = ( event: KeyboardEvent ) => {
      if ( event.key === 'Escape' ) {
        setOpenModal( false )
        setTimeout(() => {
          router.back()
        }, 600)
      }
    }
    window.addEventListener('keydown', handleKeyDown )
    return () => {
      window.removeEventListener('keydown', handleKeyDown )
    }
  }, [])


  const columns: ColumnDef<Product>[] = [
    {
      header: 'ID',
      accessorKey: 'id'
    },
    {
      header: 'Nombre',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="table__flex">
          <Image src={ row.original.image ? row.original.image : '/images/logo.svg' } alt={ row.original.name } width={ 40 } height={ 40 } className="table__image" />
          { row.original.name }
        </div>
      )
    },
    {
      header: 'Category',
      accessorKey: 'category.name',
      cell: ({ row }) => (
        <div className="table__flex">
          <i className={`fi fi-rr-${ row.original.category.icon }`}></i>
          { row.original.category.name }
        </div>
      )
    },
    {
      header: 'Precio',
      accessorKey: 'price',
      cell: ( props: any ) => (
        formatCurrency( props.getValue() )
      )
    },
    {
      header: 'Picante',
      accessorKey: 'spicyLevel',
      cell: ( props: any ) => (
        props.getValue() ? 'Sí' : 'No'
      )
    },
    {
      header: '',
      accessorKey: 'id',
      cell: ( props ) => (
        <div className="table__flex table__actions">
          <Button href={`/admin/products/${ props.getValue() }`} onClick={ () => handleClick() } text='Editar' mode='info' size='small' ghost iconName='pencil' />
          <Button text='Eliminar' mode='error' size='small' ghost iconName='trash' onClick={ () => handleDelete( +props.getValue()! ) } />
        </div>
      )
    }
  ]
  return (
    <TansTackTable data={ data } columns={ columns } />
  )
}
