'use client'
import { SessionProvider }from 'next-auth/react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from '@mui/material'
import { darkTheme } from '@/theme/darkTheme'
import { useEffect } from 'react'
import { setSession } from '@/utils/session'
import { fetchData } from '@/utils'
import { useRestaurantStore } from '@/store/global-store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Restaurant } from '@/interfaces'

export const Providers = ({ children }: { children: React.ReactNode }) => {

  const { setRestaurant } = useRestaurantStore()

  useEffect(() => {
    const fetchRestaurant = async () => {
      const { branchId, token } = await setSession()
      if ( branchId ) {
        const data = await fetchData<Restaurant>({ url: `/restaurants/branchId/${ branchId }`, token })
        if ( data ) {
          setRestaurant( data )
        }
      }
    }
    fetchRestaurant()
  }, [ setRestaurant ])

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })

  return (
    <>
    <ProgressBar color="var(--accent)" options={{ showSpinner: false }}/>
    <SessionProvider>
      <QueryClientProvider client={ queryClient }>
        <ThemeProvider theme={ darkTheme }>
          { children }
        </ThemeProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </SessionProvider>
    </>
  )
}