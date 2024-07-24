'use client'

import Image from 'next/image'
import { Category, Role } from '@/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import { TansTackTable, TansTackTableActions } from '@/components'
import { useSession } from 'next-auth/react'
import { deleteCategory } from '@/actions/category-actions'

type Props = {
  data: any
  token?: string
}

export const CategoriesDataTable = ({ data, token }: Props ) => {
  
  const { data: session } = useSession()
  const role = session?.user.role

  const handleDeleteProduct = async ( id: string, token: string ) => {
    await deleteCategory( id, token )
  }

  const columns: ColumnDef<Category>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
      id: "name",
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
      header: "",
      accessorKey: "id",
      id: "idActions",
      enableSorting: false,
      cell: ( props: any ) => (
        <TansTackTableActions
          link={`/admin/categories/${ props.getValue() }`}
          id={ props.getValue() }
          token={ token! }
          onDelete={ handleDeleteProduct }
        />
      )
    }
  ]

  if ( role === Role.OWNER ) {
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
