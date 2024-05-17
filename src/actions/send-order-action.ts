// 'use server'

// import { prisma } from "@/lib/prisma"
// import { OrderSchema } from "@/schema"

// export async function sendOrder( data: unknown ) {
//   const result = OrderSchema.safeParse( data )
//   if( !result.success ) {
//     return {
//       errors: result.error.issues
//     }
//   }
//   try {
//     await prisma.order.create({
//       data: {
//         table: result.data.table,
//         delivery: result.data.delivery,
//         total: result.data.total,
//         orderProducts: {
//           create: result.data.order.map( product => ({
//             productId: product.id,
//             quantity: product.quantity,
//             spicyLevelNumber: product.spicyLevelNumber
//           }))
//         }
//       }
//     })
//   } catch (error) {
//   }
// }