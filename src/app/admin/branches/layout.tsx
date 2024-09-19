import { setSession } from '@/utils/session'
import { BranchesPage } from './components/BranchesPage'


export default async function BranchesLayout({ children }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {

  const { token, role } = await setSession()

  return (
    <>
    <BranchesPage token={ token } role={ role }/>
    { children }
    </>
  )
}