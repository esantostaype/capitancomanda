'use client'
import { Button, PopperC } from '@/components'
import Image from 'next/image';
import Link from 'next/link'
import { useUiStore } from '@/store/ui-store'
import { Branch } from '@/interfaces';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { deleteBranch } from '@/actions/branch-actions';

type Props = {
  data: Branch[]
  token: string
}

export default function BranchesData({ data, token }: Props ) {

  const { openModal } = useUiStore()
  const [ listRef ] = useAutoAnimate()

  const handleDeleteBranch = async ( id: string, token: string ) => {
    await deleteBranch( id, token )
  }
  
  return (
    <div className="row" ref={ listRef }>
      { data.map( branch => (
        <div key={ branch.id } className="col-2">
          <div className="card card-data">
            <div className="card__actions">
              <PopperC>
                <ul className='card__actions__list'>
                  <li onClick={ () => openModal() }><Link href={ `/admin/branches/${ branch.id }` }>Editar</Link></li>
                  <li><Button text='Eliminar' mode='withoutBg' onClick={ () => handleDeleteBranch( branch.id, token ) } /></li>
                </ul>
              </PopperC>
            </div>
            {/* <div className="card__image">
              {
                branch.image ? (
                  <Image src={ branch.image } alt={ branch.name } width={ 128 } height={ 128 } />
                ) : (
                  <i className="fi fi-tr-image-slash"></i>
                )
              }
            </div> */}
            <h2 className="card-data__title">{ branch.name }</h2>
            <span className="card-data__count">
              { branch.users.length } Usuario{ branch.users.length !== 1 && "s" }</span>
          </div>
        </div>
      )) }
    </div> 
  )
}