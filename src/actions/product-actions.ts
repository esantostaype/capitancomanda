'use server'

import { Product } from '@/interfaces'
import { fetchData } from '@/utils'
import { revalidatePath } from 'next/cache'

export async function addProduct( values: Product, token: string  ) {
  await fetchData({ url: `/products`, method: 'POST', body: values, token: token })
  revalidatePath('/admin/products')
}

export async function editProduct( productID: string, values: Product, token: string  ) {
  await fetchData({ url: `/products/${ productID }`, method: 'PUT', body: values, token: token })
  revalidatePath(`/admin/products/${ productID }`)
  revalidatePath('/admin/products')
}

export async function deleteProduct( productID: string, token: string  ) {
  await fetchData({ url: `/products/${ productID }`, method: 'DELETE', token: token })
  revalidatePath(`/admin/products/${ productID }`)
  revalidatePath('/admin/products')
}