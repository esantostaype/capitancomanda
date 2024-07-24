import { ModalPage } from '@/components'
import { ProductsForm } from '@/app/admin/products/ProductsForm'
import { fetchData } from '@/utils'
import { setSession } from '@/utils/session'

export default async function ModalCreateProductPage() {
  const { token, role } = await setSession()
  const categories = await fetchData({ url: `/categories`, token: token })
  
  return (
    <ModalPage title="Crear Producto" backText='Regresar a la lista de Productos' withBackRoute>
      <ProductsForm categories={ categories } token={ token } />
    </ModalPage>
  )
}