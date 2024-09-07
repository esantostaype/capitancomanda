'use client'

import { Product, Role } from '@/interfaces'
import { formatCurrency } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { EmptyData, TanstackTable, TableActions, TableFlex, TableImage, LoadingData } from '@/components'
import { deleteProduct } from '@/actions/product-actions'

type Props = {
  products?: Product[]
  token?: string
  role?: string
  refetchProducts: () => void
  isLoading: boolean
}

export const ProductsDataTable = ({ products, refetchProducts, isLoading, token, role }: Props ) => {

  const isOwner = role === Role.OWNER

  const handleDeleteProduct = async ( id: string ) => {
    if( token ) {
      await deleteProduct( id, token )
      refetchProducts()
    }
  }

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
          link={`/admin/products/edit/${ row.original.id }`}
          id={ row.original.id }
          token={ token! }
          onDelete={ handleDeleteProduct }
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
      { isLoading
      ? ( <LoadingData text="Productos"/> )
      : ( products && products.length === 0
        ? ( <EmptyData text='Productos' /> )
        : products && ( <TanstackTable data={ products } columns={ columns } placeholder="Buscar Producto" /> )
      )}
    </>
  )
}
