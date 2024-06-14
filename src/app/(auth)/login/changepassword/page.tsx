import { ChangePasswordForm } from './ChangePasswordForm'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'

export default async function ChangePasswordPage() {
  
  const session = await getServerSession( authOptions )
  if ( session ) {
    redirect('/admin')
  }

  return (
    <ChangePasswordForm/>
  )
}