'use client'
import { AdminTemplate, OpenModalPageButton } from '@/components'
import { ProductsDataTable, ProductForm } from '.'
import { useProducts } from '@/hooks'

type AdminTemplateProps = {
  role?: string
  token?: string
}

export const ProductsPage = ({ role, token }: AdminTemplateProps ) => {

  const { isLoading, data, refetch: refetchProducts } = useProducts({ token })

  return (
    <>
    <AdminTemplate
      title='Productos'
      button={ <OpenModalPageButton link="/admin/products/create"/> }
    >
      <ProductsDataTable productsData={{ products: data, isLoading, refetchProducts, token, role }} />
    </AdminTemplate>
    <ProductForm token={ token } refetchProducts={ refetchProducts }/>
    </>
  )
}