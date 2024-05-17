'use client'

import { Order } from "@/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button, TansTackTable } from "@/components"
import { formatCurrency, formatOrderId, getStatusText } from '../../../utils/index';
import dayjs from "dayjs"

type Props = {
  data: any
}

export const OrdersDataTable = ({ data }: Props ) => {
  const columns: ColumnDef<Order>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: ({ row }) => dayjs( row.original.date ).format(`CP-DDMMYY-${ formatOrderId( row.original.id, 4 ) }`)
    },
    {
      header: 'Mesa',
      accessorKey: 'table'
    },
    {
      header: 'Total',
      accessorKey: 'total',
      cell: ( props: any ) => (
        formatCurrency( props.getValue() )
      )
    },
    {
      header: 'Estado',
      accessorKey: 'status',
      cell: ({ row }) => (
        <span className={ `table__status ${ row.original.status }` }>
          { getStatusText( row.original.status ) }
        </span>
      )
    },
    {
      header: 'Delivery',
      accessorKey: 'delivery',
      cell: ( props: any ) => (
        props.getValue() ? 'Sí' : 'No'
      )
    },
    {
      header: 'Recibida',
      accessorKey: 'date',
      cell: ( props: any ) => (
        dayjs( props.getValue() ).format("h:mm A")
      )
    },
    {
      header: 'Entregada',
      accessorKey: 'orderReadyAt',
      cell: ( props: any ) => (
        props.getValue() ? dayjs( props.getValue() ).format("h:mm A") : "-"
      )
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
