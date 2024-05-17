import { AdminHeader } from '@/components'
import { fetchData } from '@/utils'

export default async function ProductIdPage({ params } : { params: { id : number } }) {

  const product = await fetchData({ url: `/products/${ params.id }` })
  
  return (
    <>
    <AdminHeader title={ product.name } />
    <section className="admin__content">
      { product.description }
    </section>
    </>
  );
}