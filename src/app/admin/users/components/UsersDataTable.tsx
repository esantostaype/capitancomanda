'use client'

import { Role, User, roleTranslations, userStatusTranslations } from "@/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import { TanstackTable, TableActions, AdminStatus, EmptyData } from "@/components"
import { deleteUser } from "@/actions/user-actions"
import { useEffect, useState } from "react"
import { useGlobalStore } from "@/store/global-store"
import { useUiStore } from "@/store/ui-store"
import { fetchData } from "@/utils"
import { UsersTableSkeleton } from "./UsersTableSkeleton"

type Props = {
  token?: string
  role?: string
}

export const UsersDataTable = ({ token, role }: Props ) => {
  
  const [ users, setUsers ] = useState<User[] | []>([])
  const [ loading, setLoading ] = useState(true)
  const { updateTrigger, toggleUpdateTrigger } = useGlobalStore()

  useEffect(() => {
    const fetchUsers = async () => {
      const data: User[] = await fetchData({ url: `/users`, token })
      setUsers( data )
      setLoading( false )
    }
    fetchUsers()
  }, [ token, updateTrigger ])

  const handleDeleteUser = async ( id: string ) => {
    await deleteUser( id, token! )
    toggleUpdateTrigger()
  }

  const isOwner = role === Role.OWNER

  const columns: ColumnDef<User>[] = [
    {
      header: 'Nombre Completo',
      accessorKey: 'fullName',
      id: 'fullName'
    },
    {
      header: 'Correo Electrónico',
      accessorKey: 'email',
      id: 'email'
    },
    {
      header: 'Rol',
      accessorKey: 'role',
      id: 'role',
      cell: ({ row }) => roleTranslations[ row.original.role ]
    },
    {
      header: 'Estado',
      accessorKey: 'status',
      id: 'status',
      cell: ({ row }) => (
        <AdminStatus mode={ row.original.status } label={ userStatusTranslations[ row.original.status ] } />
      )
    },
    {
      header: '',
      accessorKey: 'id',
      id: 'idActions',
      enableSorting: false,
      cell: ( props: any ) => (
        <TableActions
          link={`/admin/users/edit/${ props.getValue() }`}
          id={ props.getValue() }
          token={ token! }
          onDelete={ handleDeleteUser }
        />
      )
    }
  ]

  if ( isOwner ) {
    columns.splice( 4, 0, {
      header: 'Sucursal',
      accessorKey: 'branch.name',
      id: 'branch.name',
      cell: ({ row }) => (
        <div className="table__flex">
          { row.original.branch ? row.original.branch.name : 'Sin Sucursal' }
        </div>
      )
    })
  }

  return (
    <>
      { loading
      ? ( <UsersTableSkeleton isOwner={ isOwner } /> )
      : ( users.length === 0
        ? ( <EmptyData text='Usuarios' /> )
        : ( <TanstackTable data={ users } columns={ columns } placeholder="Buscar Usuario" /> )
      )}
    </>
  )
}
