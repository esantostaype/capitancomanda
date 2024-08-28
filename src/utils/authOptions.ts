import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import { apiUrl } from '.'

export const authOptions: NextAuthOptions = {
  providers: [ 
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" }
      },
      async authorize( credentials, req ) {
        const response = await fetch(`${ apiUrl }/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        })
        const user = await response.json()
        if (user.error) throw user
        return user
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const response = await fetch("http://localhost:3001/api/auth/oauth-register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name
          })
        })

        const data = await response.json()

        if ( data.user ){
          if ( data.user.status === 'ACTIVE' ) {
            user.token = data.token
            user.role = data.user.role
            user.id = data.user.id
            user.branchId = data.user.branchId
          }
        }

        if (!response.ok) {
          console.error("Error registering user with backend", await response.text());
          throw new Error("Error registering user with backend");
        }
        return true
        
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
    async session({ session, token }) {
      session.user = token as any
      session.user.role = token.role as any
      session.user.id = token.id as any
      session.user.branchId = token.branchId as any
      session.user.fullName = token.fullName as any
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return { ...token, ...user }
    }
  },
  pages: {
    signIn: "/login",
  }
}