'use client'

import { Role, User, roleTranslations, userStatusTranslations } from "@/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import { Button, TansTackTable, TansTackTableActions } from "@/components"
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
        <span className={`table__status ${ row.original.status }`}>
          { userStatusTranslations[row.original.status] }
        </span>
      )
    },
    {
      header: '',
      accessorKey: 'id',
      id: 'idActions',
      enableSorting: false,
      cell: ( props: any ) => (
        <TansTackTableActions
          link={`/admin/users/${ props.getValue() }`}
          id={ props.getValue() }
          token={ token! }
          onDelete={ handleDeleteProduct }
        />
      )
    }
  ]

  if ( role === Role.OWNER ) {
    columns.splice( 4, 0, {
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
