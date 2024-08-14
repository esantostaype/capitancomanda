'use client'
import { AdminCard, AdminGrid } from '@/components'
import Image from 'next/image'
import { useUiStore } from '@/store/ui-store'
import { Category, Role } from '@/interfaces'
import { deleteCategory } from '@/actions/category-actions'

type Props = {
  data: Category[]
  token: string
  role?: string
  branchId?: string
}

export default function CategoriesData({ data, token, role, branchId }: Props ) {

  const { openModal } = useUiStore()

  const handleDeleteProduct = async ( id: string, token: string ) => {
    await deleteCategory( id, token )
  }

  const isOwner = role === Role.OWNER
  const isAuthor = branchId === branchId
  
  return (
    <AdminGrid>
      { data.map( category => (
        <AdminCard
          key={ category.id }
          hasActions={ branchId === category.user.branchId }
          linkEdit={ `/admin/categories/${ category.id }` }
          onClickEdit={ () => openModal() }
          onClickDelete={ () => handleDeleteProduct( category.id, token ) }
          hasFooter={ isOwner }
          footer={
            <>
            {
              isOwner &&
              <div className="flex items-start leading-4 text-xs gap-2">
                <i className="fi fi-tr-store-alt text-base -mt-[2px]"></i>
                { category.user.branch.name }
              </div>
            }
            <div className="flex items-start leading-4 text-xs gap-2">
                <i className="fi fi-tr-circle-user text-base -mt-[2px]"></i>
                { category.user.fullName }
              </div>
            </>
          }
        >
          <div className="flex items-center justify-center rounded-lg text-lg text-accent h-16 w-16 overflow-hidden bg-gray50">
            {
              category.image ? (
                <Image src={ category.image } alt={ category.name } width={ 128 } height={ 128 } className="aspect-square object-cover" />
              ) : (
                <i className="fi fi-tr-image-slash"></i>
              )
            }
          </div>
          <h2 className="text-lg font-semibold mt-4">{ category.name }</h2>
          <p className="text-gray500">{ category.products.length } Producto{ category.products.length !== 1 && "s" }</p>          
        </AdminCard>
      )) }
    </AdminGrid> 
  )
}