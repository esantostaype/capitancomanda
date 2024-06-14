'use client'
import { SessionProvider }from 'next-auth/react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <ProgressBar color="rgb(var(--primary))" options={{ showSpinner: false }}/>
    <SessionProvider>
      { children }
    </SessionProvider>
    </>
  )
}