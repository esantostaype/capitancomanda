'use client'

import { ButtonSocial } from '@/components'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'

export const OAuth = () => {

  const handleOAuthSignIn = async ( provider: string ) => {
    try {
      await signIn( provider, { callbackUrl: "/signup/oauth/complete" })
    } catch (error) {
      console.error(`${ provider } Sign-In error:`, error)
      toast.error(`Error al iniciar sesión con ${ provider }.`)
    }
  }
  
  return (
    <div className="my-8 text-center">
      <p>O continúa con:</p>
      <div className="flex items-center justify-between mt-4 gap-2">
        <ButtonSocial text='Google' icon='google' onClick={() => handleOAuthSignIn('google')} />
        <ButtonSocial text='Facebook' icon='facebook' onClick={() => handleOAuthSignIn('facebook')} />
      </div>
    </div>
  )
}