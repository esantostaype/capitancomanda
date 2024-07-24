'use server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from "@/utils/authOptions"

export async function setSession() {
  const session = await getServerSession( authOptions )
  const token = session?.user?.token
  const email = session?.user?.email
  const role = session?.user?.role
  const userId = session?.user?.id
  const branchId = session?.user?.branchId
  return {
    token, email, role, userId, branchId
  }
}