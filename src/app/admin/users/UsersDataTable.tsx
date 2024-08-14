'use client'

import { Role, User, roleTranslations, userStatusTranslations } from "@/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import { TanstackTable, TableActions, AdminStatus } from "@/components"
import { deleteUser } from "@/actions/user-actions"
import { useSession } from "next-auth/react"

type Props = {
  data: any
  token?: string
}

export const UsersDataTable = ({ data, token }: Props ) => {
  
  const { data: session } = useSession()
  const role = session?.user.role

  const handleDeleteProduct = async ( id: string, token: string ) => {
    await deleteUser( id, token )
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
          link={`/admin/users/${ props.getValue() }`}
          id={ props.getValue() }
          token={ token! }
          onDelete={ handleDeleteProduct }
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
    <TanstackTable data={ data } columns={ columns } />
  )
}
