'use client'

import { Category } from "@/interfaces"
import { formatCurrency } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button, TansTackTable } from "@/components"

type Props = {
  data: any
}

export const CategoriesDataTable = ({ data }: Props ) => {
  const columns: ColumnDef<Category>[] = [
    {
      header: 'ID',
      accessorKey: 'id'
    },
    {
      header: 'Nombre',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="table__flex">
          <i className={`fi fi-rr-${ row.original.icon }`}></i>
          { row.original.name }
        </div>
      )
    },
    {
      header: 'Slug',
      accessorKey: 'slug'
    },
    {
      header: '',
      accessorKey: 'id',
      cell: ( props ) => (
        <div className="table__flex table__actions">
          <Button href={`/admin/products/${ props.getValue() }`} text='Editar' mode='info' size='small' ghost iconName='pencil' />
          <Button text='Eliminar' mode='error' size='small' ghost iconName='trash' />
        </div>
      )
    }
  ]
  return (
    <TansTackTable data={ data } columns={ columns } />
  )
}
