import { ModalPage } from '@/components'
import { fetchData } from '@/utils'
import { ProductsForm } from '@/app/admin/products/ProductsForm'
import { setSession } from '@/utils/session'

export default async function ModalProductIdPage({ params } : { params: { id : number } }) {
  const { token, branchId, role } = await setSession()
  const product = await fetchData({ url: `/products/${ params.id }`, token: token })
  const categories = await fetchData({ url: `/categories`, token: token })
  
  return (
    <ModalPage title={ product.name } backText='Regresar a la lista de Productos' withBackRoute>
      <ProductsForm product={ product } categories={ categories } token={ token } branchId={ branchId } />
    </ModalPage>
  );
}