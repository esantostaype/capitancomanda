'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Product, Role } from '@/interfaces'
import { fetchData, formatCurrency } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { TansTackTable, TansTackTableActions } from '@/components'
import { deleteProduct } from '@/actions/product-actions'
import { useEffect, useState } from 'react'
import { TableSkeleton } from './ProductsTableSkeleton'

type Props = {
  token?: string
  role?: string
  branchId?: string
  products: Product[]
}

export const ProductsDataTable = ({ products, token, role, branchId }: Props ) => {

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
      header: 'Creador',
      accessorKey: 'user.fullName',
      id: 'user.fullName',
      cell: ({ row }) => (
        <div className="table__flex">
          { row.original.user.fullName }
        </div>
      )
    },
    {
      header: '',
      accessorKey: 'id',
      id: 'idActions',
      enableSorting: false,
      cell: ({ row }) => (
        <TansTackTableActions
          link={`/admin/products/${ row.original.id }`}
          id={ row.original.id }
          token={ token! }
          onDelete={ handleDeleteProduct }
          branchId={ branchId }
          dataId={ row.original.user.branchId }
        />
      )
    }
  ]

  if ( role === "OWNER" ) {
    columns.splice( 3, 0, {
      header: 'Sucursal',
      accessorKey: 'branch.name',
      id: 'branch.name',
      cell: ({ row }) => (
        <div className="table__flex">
          { row.original.user.branch.name }
        </div>
      )
    })
  }

  return <TansTackTable data={ products } columns={ columns } />
}
