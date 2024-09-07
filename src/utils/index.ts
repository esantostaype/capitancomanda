import { OrderItemFull, Role, SelectedVariants } from '@/interfaces'

export * from './authOptions'
export * from './fetchData'
export * from './products'
export * from './session'

export const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const useIsOwner = ( userRole: string ) => {
  const isOwner = userRole === Role.OWNER
  return isOwner
}

export function formatCurrency( amount: number ) {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  const formattedNumber = numberFormat.format( amount )
  return `S/ ${ formattedNumber }`
}

export const createNotificationSound = () => {
  if (typeof window !== 'undefined') {
    return new Audio('/assets/notification.mp3')
  } else {
    return null;
  }
}