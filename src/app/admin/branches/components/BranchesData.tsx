'use client'
import { AdminCard, AdminGrid, EmptyData, ModalConfirm } from '@/components'
import { useUiStore } from '@/store/ui-store'
import { Branch, Role } from '@/interfaces'
import { deleteBranch } from '@/actions/branch-actions'
import { useEffect, useState } from 'react'
import { useGlobalStore } from '@/store/global-store'
import { fetchData } from '@/utils'
import { BranchesDataSkeleton } from './BranchesDataSkeleton'

type Props = {
  token?: string
  role?: string
}

export const BranchesData = ({ token, role }: Props ) => {

  const [ branches, setBranches ] = useState<Branch[] | []>([])
  const [ loading, setLoading ] = useState(true)
  const { updateTrigger, toggleUpdateTrigger } = useGlobalStore()
  const { openModalConfirm, activeModalConfirmId, closeModalConfirm } = useUiStore()

  useEffect(() => {
    const fetchProducts = async () => {
      const data: Branch[] = await fetchData({ url: `/branches`, token })
      setBranches( data )
      setLoading( false )
    }
    fetchProducts()
  }, [ token, updateTrigger ])

  const handleDeleteBranch = async ( id: string ) => {
    await deleteBranch( id, token! )
    closeModalConfirm()
    toggleUpdateTrigger()
  }

  const isOwner = role === Role.OWNER
  
  return (
    <>
      { loading
      ? ( <BranchesDataSkeleton isOwner={ isOwner } /> )
      : ( branches.length === 0
        ? ( <EmptyData text='Susursales' /> )
        : (
          <AdminGrid>
            { branches.map( branch => (
              <>
              <AdminCard
                key={ branch.id }
                hasActions
                hasImage
                image={ branch.image }
                alt={ branch.name }
                linkEdit={ `/admin/branches/edit/${ branch.id }` }
                onClickDelete={ () => openModalConfirm( branch.id ) }
                hasFooter
                footer={            
                  <>
                  <div className="flex items-start leading-4 text-xs gap-2">
                      <i className="fi fi-tr-store-alt text-base -mt-[2px]"></i>
                      { branch.address || "Sin Dirección" }
                    </div>
                    <div className="flex items-start leading-4 text-xs gap-2">
                      <i className="fi fi-tr-circle-user text-base -mt-[2px]"></i>
                      { branch.phoneNumber || "Sin Teléfono" }
                    </div>
                  </>
                }
              >
                <h2 className="text-lg font-semibold">{ branch.name }</h2>
                <p className="text-gray500">{ branch.users.length } Usuario{ branch.users.length !== 1 && "s" }</p>
              </AdminCard>
              <ModalConfirm
                title='¿Estás seguro de eliminar esta sucursal?'
                detail='Al eliminar esta sucursal, también se eliminará todo lo relacionado a esta.'
                buttonConfirmText='Sí, eliminar sucursal'
                onClickConfirm={() => { handleDeleteBranch( branch.id ) }}
                onClickCancel={() => { closeModalConfirm() }}
                isOpen={ activeModalConfirmId === branch.id }
              />
              </>
            )) }
          </AdminGrid>
        )
      )}
    </>
  )
}