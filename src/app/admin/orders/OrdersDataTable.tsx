'use client'

import { Order, Role, orderStatusTranslations } from "@/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button, TansTackTable } from "@/components"
import { formatCurrency, formatOrderId, getStatusText } from '../../../utils/index';
import dayjs from "dayjs"
import { useSession } from "next-auth/react"

type Props = {
  data: any
}

export const OrdersDataTable = ({ data }: Props ) => {

  const { data: session } = useSession()
  const role = session?.user.role

  const columns: ColumnDef<Order>[] = [
    {
      header: 'Mesa',
      accessorKey: 'table',
      id: 'table'
    },
    {
      header: 'Total',
      accessorKey: 'total',
      id: 'total',
      cell: ( props: any ) => (
        formatCurrency( props.getValue() )
      )
    },
    {
      header: 'Estado',
      accessorKey: 'status',
      id: 'status',
      cell: ({ row }) => (
        <span className={`table__status ${ row.original.status }`}>
          { orderStatusTranslations[row.original.status] }
        </span>
      )
    },
    {
      header: 'Delivery',
      accessorKey: 'delivery',
      id: 'delivery',
      cell: ( props: any ) => (
        props.getValue() ? 'Sí' : 'No'
      )
    },
    {
      header: 'Recibida',
      accessorKey: 'date',
      id: 'date',
      cell: ( props: any ) => (
        dayjs( props.getValue() ).format("h:mm A")
      )
    },
    {
      header: 'Entregada',
      accessorKey: 'orderReadyAt',
      id: 'orderReadyAt',
      cell: ( props: any ) => (
        props.getValue() ? dayjs( props.getValue() ).format("h:mm A") : "-"
      )
    },
    {
      header: '',
      accessorKey: 'id',
      id: 'idActions',
      enableSorting: false,
      cell: ( props ) => (
        <div className="table__flex table__actions">
          <Button href={`/admin/orders/${ props.getValue() }`} text='Editar' mode='info' size='small' ghost iconName='pencil' />
          <Button text='Eliminar' mode='error' size='small' ghost iconName='trash' />
        </div>
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
