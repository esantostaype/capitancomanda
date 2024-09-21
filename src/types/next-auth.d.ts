import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"

declare module "next-auth" {
  interface User {
    token: string
    role: string
    id: string
    branchId: string
  }

  interface Session {
    user: {
      userFullName: string
      branchId: string
      id: string
      email: string
      name: string
      token: string
      role: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: any
    email: any
    name: any
    token: any
    role: any
  }
}