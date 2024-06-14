import { ResetPasswordForm } from './ResetPasswordForm'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'

export default async function ResetPasswordPage() {
  
  const session = await getServerSession( authOptions )
  if ( session ) {
    redirect('/admin')
  }

  return (
    <ResetPasswordForm/>
  )
}