import KitchenForm from './kitchenForm'
import { setSession } from '@/utils/session'

export default async function KitchenPage() {
  const { token } = await setSession()
  return (
    <KitchenForm token={ token! } />
  )
}