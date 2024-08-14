'use client'
import { logout } from '@/actions/auth-actions'
import { useRouter, usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useOrderStore } from '@/store/order-store'
import { useSession } from 'next-auth/react'

export const Logout = () => {

  const router = useRouter()
  const pathname = usePathname()
  const clearOrder = useOrderStore(( state ) => state.clearOrder )

  const { data: session } = useSession()

  const onLogout = async () => {
    clearOrder()
    await logout()
    signOut()
    if ( pathname === "/admin" ) {
      router.push('/login')
    } else {
      router.push(`/login?path=${ pathname }`)
    }
  }  

	return (
    <li>
      <button className="flex items-center gap-3 text-error px-3 py-2 w-full" onClick={ onLogout }>
        <i className="fi fi-rr-exit rotate-180 leading-4"></i>
        Cerrar Sesión
      </button>
    </li>
	)
}