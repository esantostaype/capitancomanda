'use server'

import { fetchData } from '@/utils'
import { revalidatePath } from 'next/cache'

export async function addUser( values: any, token: string  ) {
  await fetchData({ url: `/users`, method: 'POST', body: values, token: token })
  revalidatePath('/admin/users')
}

export async function editUser( userID: string, values: any, token: string  ) {
  await fetchData({ url: `/users/${ userID }`, method: 'PUT', body: values, token: token })
  revalidatePath(`/admin/users/${ userID }`)
  revalidatePath('/admin/users')
}

export async function deleteUser( userID: string, token: string  ) {
  await fetchData({ url: `/users/${ userID }`, method: 'DELETE', token: token })
  revalidatePath(`/admin/users/${ userID }`)
  revalidatePath('/admin/users')
}