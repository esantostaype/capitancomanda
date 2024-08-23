'use client'
import { AdminCard, AdminGrid } from '@/components'
import { useUiStore } from '@/store/ui-store'
import { Branch } from '@/interfaces'
import { deleteBranch } from '@/actions/branch-actions'

type Props = {
  data: Branch[]
  token: string
}

export default function BranchesData({ data, token }: Props ) {

  const { openModal } = useUiStore()

  const handleDeleteBranch = async ( id: string, token: string ) => {
    await deleteBranch( id, token )
  }
  
  return (
    <AdminGrid>
      { data.map( branch => (
        <AdminCard
          key={ branch.id }
          hasActions
          hasImage
          image={ branch.image }
          alt={ branch.name }
          linkEdit={ `?id=${ branch.id }` }
          onClickDelete={ () => handleDeleteBranch( branch.id, token ) }
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
      )) }
    </AdminGrid> 
  )
}