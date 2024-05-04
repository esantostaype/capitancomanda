import { prisma } from "@/lib/prisma"

export async function GET() {
  const ordes = await prisma.order.findMany({
    where: {
      status: 'received'
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })
  return Response.json( ordes )
}