'use server'

import { fetchData } from '@/utils'
import { revalidatePath } from 'next/cache'

export async function addBranch( values: any, token: string  ) {
  await fetchData({ url: `/branches`, method: 'POST', body: values, token: token })
  revalidatePath('/admin/branches')
}

export async function editBranch( branchID: string, values: any, token: string  ) {
  await fetchData({ url: `/branches/${ branchID }`, method: 'PUT', body: values, token: token })
  revalidatePath(`/admin/branches/${ branchID }`)
  revalidatePath('/admin/branches')
}

export async function deleteBranch( branchID: string, token: string  ) {
  await fetchData({ url: `/branches/${ branchID }`, method: 'DELETE', token: token })
  revalidatePath(`/admin/branches/${ branchID }`)
  revalidatePath('/admin/branches')
}