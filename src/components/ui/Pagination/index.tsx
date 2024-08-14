import Link from 'next/link'

type Props = {
  pages: number[]
  firstPage?: void
  lastPage?: void
  prevPage?: void
  nextPage?: void
  isActive?: boolean
  isDisabled?: boolean
}

export const Pagination = ( { pages, isActive, isDisabled, firstPage, lastPage, prevPage, nextPage }: Props ) => {

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        <li className={`${ isDisabled ? "disabled" : "" } `}>
          <button onClick={ () => firstPage }>
            <i className="fi fi-rr-angle-double-left"></i>
          </button>
        </li>
        <li className={`${ isDisabled ? "disabled" : "" } `}>
          <button onClick={ () => prevPage }>
            <i className="fi fi-rr-angle-left"></i>
          </button>
        </li>
        {
          pages.map( page => (
            <li key={ page } className={`${ isActive ? "active" : "" }`}>
              <button onClick={ () => page }>{ page }</button>
            </li>
          ))
        }
        <li className={`${ isDisabled ? "disabled" : "" } `}>
          <button onClick={ () => nextPage }>
            <i className="fi fi-rr-angle-right"></i>
          </button>
        </li>
        <li className={`${ isDisabled ? "disabled" : "" } `}>
          <button onClick={ () => lastPage }>
            <i className="fi fi-rr-angle-double-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  )
}