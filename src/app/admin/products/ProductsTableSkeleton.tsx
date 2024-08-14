'use client'
import { TableFlex } from '@/components'
import { Skeleton } from '@mui/material'

type Props = {
  isOwner?: boolean
}

export const ProductsTableSkeleton = ( { isOwner = false }: Props ) => {
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="border border-gray50 rounded-lg overflow-x-auto max-w-full bg-surface">
      <div className="flex justify-between px-6 py-4 bg-background border-b border-b-gray50 disabled">
        <div className="flex items-center gap-2">
          <i className="fi fi-rr-search"></i>
          <input
            type="text"
            name="searchTerm"
            placeholder="Buscar Producto"
            autoComplete="off"
            className="outline-none"
          />
        </div>
        <div className="flex items-center gap-6">
          Páginas: 1 de 1
          <select>
            <option>
              Mostrar 10
            </option>
          </select>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="bg-background px-6 py-4 text-left border-b-2 border-b-gray50 first:w-12 uppercase">#</th>
            <th className="bg-background px-6 py-4 text-left border-b-2 border-b-gray50 first:w-12 uppercase">Nombre</th>
            <th className="bg-background px-6 py-4 text-left border-b-2 border-b-gray50 first:w-12 uppercase">Categoría</th>
            <th className="bg-background px-6 py-4 text-left border-b-2 border-b-gray50 first:w-12 uppercase">Precio</th>
            { isOwner && (
              <th className="bg-background px-6 py-4 text-left border-b-2 border-b-gray50 first:w-12 uppercase">Sucursal</th>
            )}   
            <th className="bg-background px-6 py-4 text-left border-b-2 border-b-gray50 first:w-12 uppercase">Creador</th>
            <th className="bg-background px-6 py-4 text-left border-b-2 border-b-gray50 first:w-12 uppercase"></th>
          </tr>
        </thead>
        <tbody>
          { skeletonRows.map(( index ) => (
            <tr key={index}>
              <td className={"group-hover:bg-background first:w-12 px-6 py-4 bg-surface border-t border-t-gray50"}><Skeleton animation="wave" variant="text" width={20} /></td>
              <td className={"group-hover:bg-background first:w-12 px-6 py-4 bg-surface border-t border-t-gray50"}>
                <TableFlex>
                  <div style={{ width: '40px' }}>
                    <Skeleton variant="circular" width={40} height={40} />
                  </div>
                  <Skeleton animation="wave" variant="text" width={100} />
                </TableFlex>
              </td>
              <td className={"group-hover:bg-background first:w-12 px-6 py-4 bg-surface border-t border-t-gray50"}><Skeleton animation="wave" variant="text" width={100} /></td>
              <td className={"group-hover:bg-background first:w-12 px-6 py-4 bg-surface border-t border-t-gray50"}><Skeleton animation="wave" variant="text" width={100} /></td>
              { isOwner && (
                <td className={"group-hover:bg-background first:w-12 px-6 py-4 bg-surface border-t border-t-gray50"}><Skeleton animation="wave" variant="text" width={100} /></td>
              )}
              <td className={"group-hover:bg-background first:w-12 px-6 py-4 bg-surface border-t border-t-gray50"}><Skeleton animation="wave" variant="text" width={100} /></td>
              <td className={"group-hover:bg-background first:w-12 px-6 py-4 bg-surface border-t border-t-gray50"}>
                <div className="flex items-center gap-3 justify-end">
                  <Skeleton animation="wave" variant="text" width={72} height={40} />
                  <Skeleton animation="wave" variant="text" width={72} height={40} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}