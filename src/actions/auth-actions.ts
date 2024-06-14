'use server'

import { User, UserLogin } from '@/interfaces'
import { fetchData } from '@/utils'
import { revalidatePath } from 'next/cache'

export async function register( values: any ) {
  const result = await fetchData({ url: `/auth/register`, method: 'POST', body: values })
  return result
}

export async function completeRegistration( values: any ) {
  const result = await fetchData({ url: `/auth/complete-registration`, method: 'POST', body: values })
  return result
}

export async function completeRegistrationOAuth( values: any ) {
  const result = await fetchData({ url: `/auth/complete-oauth-registration`, method: 'POST', body: values })
  return result
}

export async function login( values: UserLogin  ) {
  const result = await fetchData({ url: `/auth/login`, method: 'POST', body: values })
  return result
}

export async function resetPassword( email: string  ) {
  const result = await fetchData({ url: `/auth/request-password-reset`, method: 'POST', body: { email } })
  return result
}

export async function changePassword( newPassword: string, token: string  ) {
  const result = await fetchData({ url: `/auth/reset-password?token=${ token }`, method: 'POST', body: { newPassword } })
  return result
}

export async function logout() {
  revalidatePath('/admin/*')
}