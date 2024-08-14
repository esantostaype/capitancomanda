import { fetchData } from '@/utils'
import { setSession } from '@/utils/session'
import { ProductForm } from '../ProductForm'
import { AdminTemplate } from '@/components'

export default async function CreateProductPage() {
  const { token } = await setSession()
  const categories = await fetchData({ url: `/categories`, token: token })  
  return (
    <AdminTemplate title='Crear Producto'>
      <div className="max-w-3xl">
        <ProductForm categories={ categories } token={ token } isJustPage />
      </div>
    </AdminTemplate>
  )
}