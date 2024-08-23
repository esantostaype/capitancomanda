'use client'

import { Product, Role } from '@/interfaces'
import { formatCurrency } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { TanstackTable, TableActions, TableFlex, TableImage } from '@/components'
import { deleteProduct } from '@/actions/product-actions'
import { useEffect, useState } from 'react'
import { ProductsTableSkeleton } from './ProductsTableSkeleton'

type Props = {
  token?: string
  role?: string
  initialProducts: Product[]
}

export const ProductsDataTable = ({ token, role, initialProducts }: Props ) => {
  
  const [ products, setProducts ] = useState<Product[]>( initialProducts )
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    setProducts( initialProducts )
    setLoading( false )
  }, [ initialProducts ])

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct( id, token! )
  }

  const isOwner = role === Role.OWNER

  const columns: ColumnDef<Product>[] = [
    {
      header: 'Nombre',
      accessorKey: 'name',
      id: 'name',
      cell: ({ row }) => (
        <TableFlex>
          <TableImage src={ row.original.image } alt={ row.original.name }/>
          <span>{ row.original.name }</span>
        </TableFlex>
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
        row.original.user.fullName
      )
    },
    {
      header: '',
      accessorKey: 'id',
      id: 'idActions',
      enableSorting: false,
      cell: ({ row }) => (
        <TableActions
          link={`/admin/products?id=${ row.original.id }`}
          id={ row.original.id }
          token={ token! }
          onDelete={ handleDeleteProduct }
          dataId={ row.original.user.branchId }
        />
      )
    }
  ]

  if ( isOwner ) {
    columns.splice( 3, 0, {
      header: 'Sucursal',
      accessorKey: 'branch.name',
      id: 'branch.name',
      cell: ({ row }) => (
        row.original.user.branch.name
      )
    })
  }

  return (
    <>
      { loading && role ? (
        <ProductsTableSkeleton isOwner={ isOwner } />
      ) : (
        <TanstackTable data={ products } columns={ columns } placeholder='Buscar Producto' />
      )}
    </>
  )
}
