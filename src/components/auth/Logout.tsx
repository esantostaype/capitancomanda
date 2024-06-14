'use client'
import { logout } from '@/actions/auth-actions'
import { useRouter, usePathname } from 'next/navigation'
import styles from './Logout.module.css'
import { signOut } from 'next-auth/react'
import { useOrderStore } from '@/store/order-store'

export const Logout = () => {

  const router = useRouter()
  const pathname = usePathname()
  const clearOrder = useOrderStore(( state ) => state.clearOrder )

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
    <>
    <button className={ styles.logout } onClick={ onLogout }>
      <i className="fi fi-rr-exit"></i>
      Cerrar Sesión
    </button>
    </>
	)
}