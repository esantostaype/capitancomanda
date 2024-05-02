'use server'

import { prisma } from "@/lib/prisma"
import { OrderSchema } from "@/schema"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export async function sendOrder( data: unknown ) {
  const result = OrderSchema.safeParse( data )
  if( !result.success ) {
    return {
      errors: result.error.issues
    }
  }
  try {
    await prisma.order.create({
      data: {
        table: result.data.table,
        delivery: result.data.delivery,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map( product => ({
            productId: product.id,
            quantity: product.quantity,
            spicyLevelNumber: product.spicyLevelNumber
          }))
        }
      }
    })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('Prisma error:', error.message)
    } else {
      console.error('Unknown error occurred:', error)
    }
    throw error
  }
}