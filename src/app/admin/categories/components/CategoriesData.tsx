'use client'
import { AdminCard, AdminGrid, EmptyData, ModalConfirm } from '@/components'
import Image from 'next/image'
import { useUiStore } from '@/store/ui-store'
import { Category, Role } from '@/interfaces'
import { deleteCategory } from '@/actions/category-actions'
import { useEffect, useState } from 'react'
import { fetchData } from '@/utils'
import { useGlobalStore } from '@/store/global-store'
import { CategoriesDataSkeleton } from './'

type Props = {
  token?: string
  role?: string
}

export const CategoriesData = ({ token, role }: Props ) => {
  
  const [ categories, setCategories ] = useState<Category[] | []>([])
  const [ loading, setLoading ] = useState(true)
  const { updateTrigger, toggleUpdateTrigger } = useGlobalStore()
  const { openModal, openModalConfirm, activeModalConfirmId, closeModalConfirm } = useUiStore()

  useEffect(() => {
    const fetchCategories = async () => {
      const data: Category[] = await fetchData({ url: `/categories`, token })
      setCategories( data )
      setLoading( false )
    }
    fetchCategories()
  }, [ token, updateTrigger ])

  const handleDeleteCategoryConfirm = async ( id: string ) => {
    await deleteCategory( id, token! )
    closeModalConfirm()
    toggleUpdateTrigger()
  }

  const isOwner = role === Role.OWNER
  
  return (
    <>
      { loading
      ? ( <CategoriesDataSkeleton isOwner={ isOwner } /> )
      : ( categories.length === 0
        ? ( <EmptyData text='Categorías' /> )
        : (
          <AdminGrid>
            { categories.map( category => (
              <>
              <AdminCard
                key={ category.id }
                linkEdit={ `/admin/categories/edit/${ category.id }` }
                onClickDelete={ () => openModalConfirm( category.id ) }
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
              <ModalConfirm
                title='¿Estás seguro de eliminar esta categoría?'
                detail='Al eliminar esta categoría, también se eliminarán todos sus productos asociados.'
                buttonConfirmText='Sí, eliminar categoría'
                onClickConfirm={() => { handleDeleteCategoryConfirm( category.id ) }}
                onClickCancel={() => { closeModalConfirm() }}
                isOpen={ activeModalConfirmId === category.id }
              />
              </>
            )) }
          </AdminGrid>
        )
      )}
    </>
  )
}