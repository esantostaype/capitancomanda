export function formatCurrency( amount: number ) {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  const formattedNumber = numberFormat.format( amount )
  return `S/ ${ formattedNumber }`
}

export function formatCategoryName( slug: string ) {
  const words = slug.split('-').map( word => word.charAt(0).toUpperCase() + word.slice(1) )
  return words.join(' ')
}

export const getSpicyLevelText = ( spicyLevelNumber: number ): string => {
  switch ( spicyLevelNumber ) {
    case 0:
      return 'Sin Picante'
    case 1:
      return 'Picante Bajo'
    case 2:
      return 'Picante Normal'
    case 3:
      return 'Picante Alto'
    default:
      return ''
  }
}

export const createNotificationSound = () => {
  if (typeof window !== 'undefined') {
    return new Audio('/assets/notification.mp3')
  } else {
    return null;
  }
}

export const apiUrl = "http://localhost:3000/api"

interface RequestOptions {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any;
}

export async function fetchData( options: RequestOptions ) {
  const { url, method, body } = options
  let headersApi: HeadersInit = {}

  if ( method === 'POST' || method === 'PUT' ) {
    headersApi = { 'Content-Type': 'application/json' }
  }

  try {
    const response = await fetch( `${ apiUrl }${ url }`, {
      method,
      headers: headersApi,
      body: body ? JSON.stringify( body ) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    throw error
  }
}