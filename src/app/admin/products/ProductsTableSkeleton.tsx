'use client'
import { Skeleton } from '@mui/material'

type Props = {
  isOwner?: boolean
}

export const TableSkeleton = ( { isOwner = false }: Props ) => {
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="table__wrapper">
      <div className="table__header disabled">
        <div className="search-box">
          <i className="fi fi-rr-search"></i>
          <input
            type="text"
            name="searchTerm"
            placeholder="Buscar Producto"
            autoComplete="off"
          />
        </div>
        <div className="table__info">
          Páginas: 1 de 1
          <select>
            <option>
              Mostrar 10
            </option>
          </select>
        </div>
      </div>
      <table className="skeleton-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            { isOwner && (
              <>
              <th>Sucursal</th>
              <th>Creador</th>
              </>
            )}   
            <th></th>
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((row, index) => (
            <tr key={index}>
              <td><Skeleton animation="wave" variant="text" width={20} /></td>
              <td>
                <div className="table__flex">
                  <div style={{ width: '40px' }}>
                    <Skeleton variant="circular" width={40} height={40} />
                  </div>
                  <Skeleton animation="wave" variant="text" width={100} />
                </div>
              </td>
              <td><Skeleton animation="wave" variant="text" width={100} /></td>
              <td><Skeleton animation="wave" variant="text" width={100} /></td>
              { isOwner && (
                <>
                <td><Skeleton animation="wave" variant="text" width={100} /></td>
                <td><Skeleton animation="wave" variant="text" width={100} /></td>
                </>
              )}
              <td>
                <div className="table__flex table__actions disabled">
                  <Skeleton animation="wave" variant="text" width={32} height={40} />
                  <Skeleton animation="wave" variant="text" width={32} height={40} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}