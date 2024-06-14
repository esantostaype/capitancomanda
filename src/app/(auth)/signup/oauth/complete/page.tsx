import { SignUpCompleteOAuthForm } from './SignUpCompleteOAuthForm'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'

export default async function SignUpCompletePage() {
  
  const session = await getServerSession( authOptions )
  if ( session?.user.token ) {
    redirect('/admin')
  }
  
  return (
    <>
    <SignUpCompleteOAuthForm/>
    </>
  )
}