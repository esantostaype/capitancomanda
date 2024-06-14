'use server'

import { fetchData } from '@/utils'
import { revalidatePath } from 'next/cache'
import { setSession } from '@/utils/session'

export async function changeStatusOrder( orderId: number, values: any  ) {const { token } = await setSession()
  await fetchData({ url: `/orders/${ orderId }`, method: 'PUT', body: values, token: token })
  revalidatePath('/kitchen')
}