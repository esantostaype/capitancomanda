'use client'
import { useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  ColumnDef,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel
} from '@tanstack/react-table';
import { useState } from "react";

type Props = {
  data: any
  columns: ColumnDef<any>[]
}

export const TansTackTable = ({ data, columns }: Props) => {

  const [ sorting, setSorting ] = useState<SortingState>([])
  const [ filtering, setFiltering ] = useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: ( value: string ) => {
      const timer = setTimeout(() => {
        setFiltering( value )
      }, 1000 )
      return () => clearTimeout( timer )
    }
  })

  const pages = Array.from({ length: table.getPageCount() }, ( _, i ) => i + 1 )

  return (
    <div className="table__wrapper">
      <div className="table__header">
        <div className="search-box">
          <i className="fi fi-rr-search"></i>
          <input
            type="text"
            name="searchTerm"
            placeholder="Buscar Producto"
            autoComplete="off"
            value={ filtering }
            onChange={ (e) => setFiltering( e.target.value ) }
          />
        </div>
        <div className="table__info">
          Páginas: {' '}
          { table.getState().pagination.pageIndex + 1 } de{' '}
          { table.getPageCount().toLocaleString() } 
          <select
            value={ table.getState().pagination.pageSize }
            onChange={ e => {
              table.setPageSize( Number( e.target.value ))
            }}
          >
            {[ 10, 20, 30, 40, 50 ].map( pageSize  => (
              <option key={ pageSize } value={ pageSize }>
                Mostrar { pageSize }
              </option>
            ))}
          </select>
        </div>
      </div>
      <table>
        <thead>
          {
            table.getHeaderGroups().map( headerGroup => (
              <tr key={ headerGroup.id }>
                { headerGroup.headers.map
                  ( header =>
                    (
                      <th key={ header.id } >
                        <div className="table__sorting" onClick={ header.column.getToggleSortingHandler() }>
                          { flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}   
                          { header.column.getIsSorted() ?
                            header.column.getIsSorted() === 'asc'
                            ? <i className="fi fi-rr-arrow-small-up"></i>
                            : header.column.getIsSorted() === 'desc'
                            && <i className="fi fi-rr-arrow-small-down"></i>
                            : <i className="fi fi-tr-sort-alt sort-all"></i>
                          }
                        </div>
                      </th>
                    )
                  )
                }
              </tr>
            ) )
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map( row => (
              <tr key={ row.id }>
                { row.getVisibleCells().map( cell => (
                  <td key={ cell.id }>
                    { flexRender( cell.column.columnDef.cell, cell.getContext() ) }
                  </td>
                ) ) }
              </tr>
            ) )
          }
        </tbody>
      </table>
      <div className="table__footer">
        <nav className="pagination">
          <ul className="pagination__list">
            <li className="pagination__arrow">
              <button onClick={ () => table.setPageIndex( 0 ) } disabled={ !table.getCanPreviousPage() }>
                <i className="fi fi-rr-angle-double-left"></i>
              </button>
            </li>
            <li className="pagination__arrow">
              <button onClick={ () => table.previousPage() } disabled={ !table.getCanPreviousPage() }>
                <i className="fi fi-rr-angle-left"></i>
              </button>
            </li>
            {
              pages.map( page => (
                <li key={ page } className={ page - 1 === table.getState().pagination.pageIndex ? 'active' : '' }>
                  <button onClick={ () => table.setPageIndex( page - 1 ) }>{ page }</button>
                </li>
              ))
            }
            <li className="pagination__arrow">
              <button onClick={ () => table.nextPage() } disabled={ !table.getCanNextPage() }>
                <i className="fi fi-rr-angle-right"></i>
              </button>
            </li>
            <li className="pagination__arrow">
              <button onClick={ () => table.setPageIndex( table.getPageCount() - 1 ) } disabled={ !table.getCanNextPage() }>
                <i className="fi fi-rr-angle-double-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
