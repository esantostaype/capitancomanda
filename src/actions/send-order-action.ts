'use server'

import { fetchData } from '@/utils'
import { revalidatePath } from 'next/cache'
import { setSession } from '@/utils/session'

export async function addOrder( values: any ) {
  const { token } = await setSession()
  const result = await fetchData({ url: '/orders', method: 'POST', body: values, token: token })
  revalidatePath('/admin/orders')
  revalidatePath('/kitchen')
  return result
}