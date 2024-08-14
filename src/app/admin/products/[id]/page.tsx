import { fetchData } from '@/utils'
import { ProductForm } from '../ProductForm'
import { setSession } from '@/utils/session'
import { AdminTemplate } from '@/components'

export default async function ProductIdPage({ params } : { params: { id : number } }) {
  const { token, branchId } = await setSession()
  const product = await fetchData({ url: `/products/${ params.id }`, token: token })
  const categories = await fetchData({ url: `/categories`, token: token })
  
  return (
    <AdminTemplate
      title={ product.name }
    >
      <div className="max-w-3xl">
        <ProductForm product={ product } categories={ categories } token={ token } branchId={ branchId } isJustPage />
      </div>
    </AdminTemplate>
  )
}