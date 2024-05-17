import Link from "next/link"

type Props = {
  pageNumber: number
  totalPages: number
  link?: string
}

export const Pagination = ( { pageNumber, totalPages, link }: Props ) => {

  const pages = Array.from({ length: totalPages }, ( _, i ) => i + 1 )
  const isFirstPage = + pageNumber === 1 || pageNumber == null
  const isLastPage = + pageNumber === totalPages

  return (
    <>
    { totalPages !== 1 && 
      <nav className="pagination">
        <ul className="pagination__list">
          {
            isFirstPage ? (
              <li className="disabled">
                <Link href=""><i className="fi fi-rr-angle-left"></i></Link>
              </li>
            ) : (
              <li>
                <Link href={`${ link }?page=${ + pageNumber && + pageNumber - 1 }`}><i className="fi fi-rr-angle-left"></i></Link>
              </li>
            )
          }

          {
            pages.map( page => (            
              <li className={ page === + pageNumber || ( page === 1 && pageNumber === undefined ) ? 'active' : '' } key={ page } >
                <Link href={ `${ link }?page=${ page }`}>{ page }</Link>
              </li>
            ))
          }
          
          <li className={ isLastPage ? 'disabled' : '' }>
            <Link href={`${ link }?page=${ + pageNumber + 1 }`}><i className="fi fi-rr-angle-right"></i></Link>
          </li>
        </ul>
      </nav>
    }
    </>
  )
}