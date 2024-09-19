'use client'
import { AdminCard, AdminGrid, EmptyData, LoadingData, ModalConfirm } from '@/components'
import { useUiStore } from '@/store/ui-store'
import { Branch, Role } from '@/interfaces'
import { deleteBranch } from '@/actions/branch-actions'

interface Props {
  branchesData: {
    branches?: Branch[]
    token?: string
    role?: string
    refetchBranches: () => void
    isLoading: boolean
  }
}

export const BranchesData = ({ branchesData }: Props ) => {

  const { branches, token, role, refetchBranches, isLoading } = branchesData
  const { openModalConfirm, activeModalConfirmId, closeModalConfirm } = useUiStore()

  const handleDeleteBranch = async ( id: string ) => {
    if( token ) {
      await deleteBranch( id, token )
      refetchBranches()
    }
  }

  const isOwner = role === Role.OWNER
  
  return (
    <>
      { isLoading
      ? ( <LoadingData text="Susursales"/> )
      : ( branches && branches.length === 0
        ? ( <EmptyData text='Susursales' /> )
        : (
          <AdminGrid>
            { branches?.map( branch => (
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
                <h2 className="text-lg font-semibold leading-6 mb-1">{ branch.name }</h2>
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