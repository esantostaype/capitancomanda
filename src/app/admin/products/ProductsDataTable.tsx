'use client'

import Image from 'next/image'
import { Product, Role } from '@/interfaces'
import { formatCurrency } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { TansTackTable, TansTackTableActions } from '@/components'
import { useSession } from 'next-auth/react'
import { deleteProduct } from '@/actions/product-actions'

type Props = {
  data: any
  token?: string
}

export const ProductsDataTable = ({ data, token }: Props ) => {
  
  const { data: session } = useSession()
  const role = session?.user.role

  const handleDeleteProduct = async ( id: string, token: string ) => {
    await deleteProduct( id, token )
  }

  const columns: ColumnDef<Product>[] = [
    {
      header: 'Nombre',
      accessorKey: 'name',
      id: 'name',
      cell: ({ row }) => (
        <div className="table__flex">
          { row.original.image ? (
            <Image src={ row.original.image } alt={ row.original.name } width={ 40 } height={ 40 } className="table__image" />
          ) : (
            <div className='table__image'><i className="fi fi-tr-image-slash"></i></div>
          )}
          <span>{ row.original.name }</span>
        </div>
      )
    },
    {
      header: 'Categoría',
      accessorKey: 'category.name',
      id: 'category.name',
      cell: ({ row }) => (
        row.original.category.name
      )
    },
    {
      header: 'Precio',
      accessorKey: 'price',
      id: 'price',
      cell: ( props: any ) => (
        formatCurrency( props.getValue() )
      )
    },
    {
      header: '',
      accessorKey: 'id',
      id: 'idActions',
      enableSorting: false,
      cell: ( props: any ) => (
        <TansTackTableActions
          link={`/admin/products/${ props.getValue() }`}
          id={ props.getValue() }
          token={ token! }
          onDelete={ handleDeleteProduct }
        />
      )
    }
  ]

  if ( role === "OWNER" ) {
    columns.splice( 1, 0, {
      header: 'Sucursal',
      accessorKey: 'branch.name',
      id: 'branch.name',
      cell: ({ row }) => (
        <div className="table__flex">
          { row.original.branch.name }
        </div>
      )
    })
  }

  return (
    <TansTackTable data={ data } columns={ columns } />
  )
}
