import { fetchData } from '@/utils'

export default async function UserIdPage({ params } : { params: { id : number } }) {

  const user = await fetchData({ url: `/users/${ params.id }` })
  
  return (
    <>
    <section className="admin__content">
    </section>
    </>
  );
}