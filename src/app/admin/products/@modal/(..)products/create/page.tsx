import { ModalPage } from '@/components'
import { ProductForm } from '@/app/admin/products/ProductForm'
import { fetchData } from '@/utils'
import { setSession } from '@/utils/session'

export default async function ModalCreateProductPage() {
  const { token } = await setSession()
  const categories = await fetchData({ url: `/categories`, token: token })
  
  return (
    <ModalPage
      title="Crear Producto"
      backText='Regresar a la lista de Productos'
      withBackRoute
      withTabs
    >
      <ProductForm categories={ categories } token={ token } />
    </ModalPage>
    
  )
}