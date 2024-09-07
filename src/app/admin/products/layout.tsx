import { setSession } from '@/utils/session'
import { ProductsPage } from './Components/ProductsPage'

export default async function ProductsLayout({ children }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {

  const { token, role } = await setSession()

  return (
    <>
    <ProductsPage token={ token } role={ role }/>
    { children }
    </>
  )
}