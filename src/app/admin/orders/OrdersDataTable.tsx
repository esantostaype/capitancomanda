'use client'

import { Order, Role, orderStatusTranslations } from "@/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import { AdminStatus, TanstackTable } from "@/components"
import { formatCurrency } from '@/utils'
import dayjs from "dayjs"
import { useSession } from "next-auth/react"

type Props = {
  data: any
}

export const OrdersDataTable = ({ data }: Props ) => {

  const { data: session } = useSession()
  const role = session?.user.role

  const isOwner = role === Role.OWNER

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
        <AdminStatus mode={ row.original.status } label={ orderStatusTranslations[ row.original.status ] } />
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
    <TanstackTable data={ data } columns={ columns } />
  )
}
