import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"

declare module "next-auth" {
  interface User {
    token: string
    role: string
  }

  interface Session {
    user: {
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
    id: string | null | undefined
    email: string | null | undefined
    name: string | null | undefined
    token: string | null | undefined
    role: string | null | undefined
  }
}