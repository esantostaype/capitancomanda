'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function inPreparationOrder( formData: FormData ) {

  const orderId = formData.get('order_id')!

  try {
    await prisma.order.update({
      where: {
        id: +orderId
      },
      data: {
        status: "in-preparation",
        orderReadyAt: new Date( Date.now() )
      }
    })
    revalidatePath( '/kitchen' )
  } catch ( error ) {
    console.log( error )
  }
}

export async function readyOrder( formData: FormData ) {

  const orderId = formData.get('order_id')!

  try {
    await prisma.order.update({
      where: {
        id: +orderId
      },
      data: {
        status: "ready",
        orderReadyAt: new Date( Date.now() )
      }
    })
    revalidatePath( '/kitchen' )
  } catch ( error ) {
    console.log( error )
  }
}