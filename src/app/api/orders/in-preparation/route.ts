import { prisma } from "@/lib/prisma"

export async function GET() {
  const orders = await prisma.order.findMany({
    where: {
      status: 'in-preparation'
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })
  return Response.json( orders )
}