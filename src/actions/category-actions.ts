'use server'

import { fetchData } from '@/utils'
import { revalidatePath } from 'next/cache'

export async function addCategory( values: any, token: string  ) {
  await fetchData({ url: `/categories`, method: 'POST', body: values, token: token })
  revalidatePath('/admin/categories')
}

export async function editCategory( categoryID: string, values: any, token: string  ) {
  await fetchData({ url: `/categories/${ categoryID }`, method: 'PUT', body: values, token: token })
  revalidatePath(`/admin/categories/${ categoryID }`)
  revalidatePath('/admin/categories')
}

export async function deleteCategory( categoryID: string, token: string  ) {
  await fetchData({ url: `/categories/${ categoryID }`, method: 'DELETE', token: token })
  revalidatePath(`/admin/categories/${ categoryID }`)
  revalidatePath('/admin/categories')
}