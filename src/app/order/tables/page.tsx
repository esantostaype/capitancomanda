import { setSession } from '@/utils'
import { OrderTables } from '../components'

export default async function TablesPage() {
  const { token, branchId } = await setSession()
  return (
    <OrderTables token={ token } branchId={ branchId } />
  )
}