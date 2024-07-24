import { fetchData } from '@/utils'
import { Button, OpenModalButton } from '@/components'
import { setSession } from '@/utils/session'
import { Category } from '@/interfaces'
import CategoriesData from './CategoriesData';

export default async function CategoriesPage() {
  const { token, role } = await setSession()
  const categories: Category[] = await fetchData({ url: `/categories`, token: token, role: role })
  
  return (
    <>
    <header className="admin__header">
      <h1 className="admin__title">Categorías</h1>
      <OpenModalButton link="/admin/categories/create"/>
    </header>
    <section className="admin__content">
      <CategoriesData data={ categories } token={ token! } />
    </section>
    </>
  )
}