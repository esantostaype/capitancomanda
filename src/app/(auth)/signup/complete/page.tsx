import { SignUpCompleteForm } from './SignUpCompleteForm'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'

export default async function SignUpCompletePage() {
  
  const session = await getServerSession( authOptions )
  if ( session ) {
    redirect('/admin')
  }

  return (
    <>
    <h1 className='auth__title'>Dirección de correo electrónico verificada</h1>
    <SignUpCompleteForm/>
    </>
  )
}