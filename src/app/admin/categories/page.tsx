import { fetchData } from '@/utils'
import { CategoriesDataTable } from './CategoriesDataTable'

export default async function CategoriesPage() {
  const categories = await fetchData({ url: `/categories` })  
  return (
    <>
    <header className="admin__header">
      <h1 className="admin__title">Categorías</h1>
      <button className='button main-button small'>Crear Nuevo</button>
    </header>
    <section className="admin__content">
      <CategoriesDataTable data={ categories }/>
    </section>
    </>
  )
}