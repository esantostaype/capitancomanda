'use server'

import { fetchData } from "@/utils"
import { revalidatePath } from "next/cache"

export async function changeStatusOrder( orderId: number, values: any  ) {
  await fetchData({ url: `/orders/${ orderId }`, method: 'PUT', body: values })
  revalidatePath('/kitchen')
}