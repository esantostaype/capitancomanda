'use client'

import { ButtonSocial } from "@/components"
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"
import styles from './OAuth.module.css'
import { useRouter } from "next/navigation"

export const OAuth = () => {

  const router = useRouter()

  const handleOAuthSignIn = async ( provider: string ) => {
    try {
      await signIn( provider, { callbackUrl: "/signup/oauth/complete" })
    } catch (error) {
      console.error(`${ provider } Sign-In error:`, error)
      toast.error(`Error al iniciar sesión con ${ provider }.`)
    }
  }
  
  return (
    <div className={ styles.content }>
      <div className={ styles.label }>O continúa con:</div>
      <div className={ styles.buttons }>
        <ButtonSocial text='Google' icon='google' onClick={() => handleOAuthSignIn('google')} />
        <ButtonSocial text='Facebook' icon='facebook' onClick={() => handleOAuthSignIn('facebook')} />
      </div>
    </div>
  )
}