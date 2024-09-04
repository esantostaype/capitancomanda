'use client'
import { SessionProvider }from 'next-auth/react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { darkTheme } from '@/theme/darkTheme'
import { useEffect, useState } from 'react'
import { setSession } from '@/utils/session'
import { fetchData } from '@/utils'
import { useRestaurantStore } from '@/store/global-store'

export const Providers = ({ children }: { children: React.ReactNode }) => {

  const { setRestaurant } = useRestaurantStore()

  useEffect(() => {
    const fetchRestaurant = async () => {
      const { branchId, token } = await setSession()
      if ( branchId ) {
        const data = await fetchData({ url: `/restaurants/branchId/${branchId}` })
        if ( data ) {
          setRestaurant( data )
        }
      }
    }
    fetchRestaurant()
  }, [ setRestaurant ])

  return (
    <>
    <ProgressBar color="var(--accent)" options={{ showSpinner: false }}/>
    <SessionProvider>
      <ThemeProvider theme={ darkTheme }>
        { children }
      </ThemeProvider>
    </SessionProvider>
    </>
  )
}