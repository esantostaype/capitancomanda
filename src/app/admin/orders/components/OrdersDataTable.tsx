'use client'

import { Order, OrderType, Role, orderStatusTranslations, orderTypeTranslations } from "@/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import { AdminStatus, EmptyData, LoadingData, TanstackTable } from "@/components"
import { fetchData, formatCurrency } from '@/utils'
import dayjs from "dayjs"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useGlobalStore } from "@/store/global-store"
import { OrdersTableSkeleton } from "./OrdersTableSkeleton"

type Props = {
  token?: string
  role?: string
}

export const OrdersDataTable = ({ token, role }: Props ) => {

  const isOwner = role === Role.OWNER
  
  const [ orders, setOrders ] = useState<Order[] | []>([])
  const [ loading, setLoading ] = useState(true)
  const { updateTrigger } = useGlobalStore()

  useEffect(() => {
    const fetchProducts = async () => {
      const data: Order[] = await fetchData({ url: `/orders`, token })
      setOrders( data )
      setLoading( false )
    }
    fetchProducts()
  }, [ token, updateTrigger ])

  const columns: ColumnDef<Order>[] = [
    {
      header: '#',
      accessorKey: 'orderNumber',
      id: 'orderNumber'
    },
    {
      header: 'Ambiente',
      accessorKey: 'floor',
      id: 'floor',
      cell: ( props: any ) => (
        props.getValue() || "-"
      )
    },
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
      header: 'Cliente',
      accessorKey: 'client.fullName',
      id: 'client.fullName',
      cell: ( props: any ) => (
        props.getValue() || "-"
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
      header: 'Tipo de Órden',
      accessorKey: 'orderType',
      id: 'orderType',
      cell: ( props: { getValue: () => any }) => {
        const value = props.getValue()
        return orderTypeTranslations[ value as OrderType ]
      }
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
        row.original.user.fullName
      )
    })
  }

  return (
    <>
      { loading
      ? ( <LoadingData text="Órdenes"/> )
      : ( orders.length === 0
        ? ( <EmptyData text='Órdenes' /> )
        : ( <TanstackTable data={ orders } columns={ columns } placeholder="Buscar Órden" /> )
      )}
    </>    
  )
}
