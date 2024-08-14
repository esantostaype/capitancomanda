'use client'
import { SessionProvider }from 'next-auth/react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { darkTheme } from '@/theme/darkTheme'

export const Providers = ({ children }: { children: React.ReactNode }) => {
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