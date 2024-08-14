import { fetchData } from '@/utils'

export default async function CategoryIdPage({ params } : { params: { id : number } }) {

  const category = await fetchData({ url: `/categories/${ params.id }` })
  
  return (
    <>
    <section className="admin__content">
      { category.description }
    </section>
    </>
  );
}