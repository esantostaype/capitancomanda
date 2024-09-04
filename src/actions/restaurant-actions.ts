'use server'

import { fetchData } from '@/utils'
import { revalidatePath } from 'next/cache'

export async function getRestaurant( branchId: string  ) {
  await fetchData({ url: `/restaurants/branchId/${ branchId }` })
}