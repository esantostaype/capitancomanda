'use client'
import { useAutoAnimate } from '@formkit/auto-animate/react';
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
  columns: ColumnDef< any >[]
}

export const TansTackTable = ({ data, columns }: Props) => {

  const addRowNumberColumn = <T,>(columns: ColumnDef<T>[]): ColumnDef<T>[] => {
    const rowNumberColumn: ColumnDef<T> = {
      header: '#',
      id: 'rowNumber',
      cell: ({ row }) => row.index + 1,
      accessorFn: (_, index) => index + 1,
      enableSorting: true,
      sortingFn: (rowA, rowB) => rowA.index - rowB.index
    }
    
    return [ rowNumberColumn, ...columns ]
  }

  const [ sorting, setSorting ] = useState<SortingState>([])
  const [ filtering, setFiltering ] = useState("")

  const columnsWithRowNumber = addRowNumberColumn( columns )

  const table = useReactTable({
    data,
    columns: columnsWithRowNumber,
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

  const [ listRef ] = useAutoAnimate()

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
                          { header.column.getCanSort() && (
                            header.column.getIsSorted() ? (
                              header.column.getIsSorted() === 'asc' ? (
                                <i className="fi fi-rr-arrow-small-up"></i>
                              ) : (
                                <i className="fi fi-rr-arrow-small-down"></i>
                              )
                            ) : (
                              <i className="fi fi-tr-sort-alt sort-all"></i>
                            )
                          )}
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
      { pages.length !== 1 &&
        <div className="table__footer">
          <nav className="pagination">
            <ul className="pagination__list">
              <li className={ !table.getCanPreviousPage() ? "disabled pagination__arrow" : "pagination__arrow"}>
                <button onClick={ () => table.setPageIndex( 0 ) }>
                  <i className="fi fi-rr-angle-double-left"></i>
                </button>
              </li>
              <li className={ !table.getCanPreviousPage() ? "disabled pagination__arrow" : "pagination__arrow"}>
                <button onClick={ () => table.previousPage() }>
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
              <li className={ !table.getCanNextPage() ? "disabled pagination__arrow" : "pagination__arrow"}>
                <button onClick={ () => table.nextPage() }>
                  <i className="fi fi-rr-angle-right"></i>
                </button>
              </li>
              <li className={ !table.getCanNextPage() ? "disabled pagination__arrow" : "pagination__arrow"}>
                <button onClick={ () => table.setPageIndex( table.getPageCount() - 1 ) }>
                  <i className="fi fi-rr-angle-double-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      }
    </div>
  )
}
