'use server'

import { fetchData } from '@/utils'
import { revalidatePath } from 'next/cache'

export async function addProduct( values: any  ) {
  await fetchData({ url: `/products`, method: 'POST', body: values })
  revalidatePath('/admin/products')
}

export async function editProduct( productID: number, values: any  ) {
  await fetchData({ url: `/products/${ productID }`, method: 'PUT', body: values })
  revalidatePath(`/admin/products/${ productID }`)
  revalidatePath('/admin/products')
}

export async function deleteProduct( productID: number  ) {
  await fetchData({ url: `/products/${ productID }`, method: 'DELETE' })
  revalidatePath(`/admin/products/${ productID }`)
  revalidatePath('/admin/products')
}