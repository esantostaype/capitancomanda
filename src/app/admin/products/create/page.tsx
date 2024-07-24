import { AdminHeader } from '@/components'
import { fetchData } from '@/utils'
import { setSession } from '@/utils/session'
import { ProductsForm } from '../ProductsForm'

export default async function CreateProductPage() {
  const { token } = await setSession()
  const categories = await fetchData({ url: `/categories`, token: token })  
  return (
    <>
    <AdminHeader title="Crear Producto" />
    <section className="admin__content">
      <ProductsForm categories={ categories } token={ token } />
    </section>
    </>
  )
}