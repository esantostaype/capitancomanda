import { fetchData } from '@/utils'
import { ProductForm } from '@/app/admin/products/ProductForm'
import { setSession } from '@/utils/session'
import { ModalPage } from '@/components'

export default async function ModalProductIdPage({ params } : { params: { id : number } }) {
  
  const { token, branchId } = await setSession()
  const product = await fetchData({ url: `/products/${ params.id }`, token: token })
  const categories = await fetchData({ url: `/categories`, token: token })
  
  return (
    <ModalPage title={ product?.name || "Crear Producto" } backText='Regresar a la lista de Productos' withBackRoute withTabs >
      <ProductForm product={ product } categories={ categories } token={ token } branchId={ branchId } />
    </ModalPage>
  )
}