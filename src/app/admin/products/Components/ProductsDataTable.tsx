'use client'

import { Product, Role } from '@/interfaces'
import { fetchData, formatCurrency } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { EmptyData, TanstackTable, TableActions, TableFlex, TableImage, LoadingData } from '@/components'
import { deleteProduct } from '@/actions/product-actions'
import { useEffect, useState } from 'react'
import { ProductsTableSkeleton } from './'
import { useGlobalStore } from '@/store/global-store'

type Props = {
  token?: string
  role?: string
}

export const ProductsDataTable = ({ token, role }: Props ) => {

  const isOwner = role === Role.OWNER
  
  const [ products, setProducts ] = useState<Product[] | []>([])
  const [ loading, setLoading ] = useState(true)
  const { updateTrigger, toggleUpdateTrigger } = useGlobalStore()

  useEffect(() => {
    const fetchProducts = async () => {
      const data: Product[] = await fetchData({ url: `/products`, token })
      setProducts( data )
      setLoading( false )
    }
    fetchProducts()
  }, [ token, updateTrigger ])

  const handleDeleteProduct = async ( id: string ) => {
    await deleteProduct( id, token! )
    toggleUpdateTrigger()
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
      { loading
      ? ( <LoadingData text="Productos"/> )
      : ( products.length === 0
        ? ( <EmptyData text='Productos' /> )
        : ( <TanstackTable data={ products } columns={ columns } placeholder="Buscar Producto" /> )
      )}
    </>
  )
}
