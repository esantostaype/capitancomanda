'use server'

import { fetchData } from '@/utils'
import { revalidatePath } from 'next/cache'
import { setSession } from '@/utils/session'

export async function addOrder( searchTerm: string ) {

  const { token } = await setSession()
  const isDNI = /^[0-9]+$/.test( searchTerm )
  
  let result
  if ( isDNI ) {
    result = await fetchData({ url: `/clients/dni/${ searchTerm }`, token })
  } else {
    result = await fetchData({ url: `/clients/name/${ searchTerm }`, token })
  }
  revalidatePath('/order')
  return result

}