import { redirect } from "next/navigation"

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

export const getStatusText = ( spicyLevelNumber: string ): string => {
  switch ( spicyLevelNumber ) {
    case 'received':
      return 'Recibido'
    case 'in-preparation':
      return 'En Preparación'
    case 'ready':
      return 'Listo para Servir'
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
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
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
      body: body ? JSON.stringify( body ) : undefined
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    throw error
  }
}

export const fetchProductsData = async ( url: string, fetchUrl: string, page: number, take: number, searchTerm?: string ) => {
  try {
    const validPage = Math.max(page, 1);
    const validTake = Math.max(take, 1);

    if (page < 0) {
      redirect( url );
      return null
    }

    const productsDataPromise = fetchData({
      url: `${ fetchUrl }?page=${ validPage }&take=${ validTake }&searchTerm=${ searchTerm || '' }`,
    });

    const allProductsDataPromise = fetchData({ url: fetchUrl });

    const [productsData, allProductsData] = await Promise.all([ productsDataPromise, allProductsDataPromise ]);

    const countProducts = allProductsData.length;
    const totalPages = Math.ceil(countProducts / validTake);

    if (validPage > totalPages) {
      redirect( url );
      return null
    }

    return { productsData, allProductsData, totalPages };
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

export const formatOrderId = ( number: number, length: number ) => {
  const numberStr = number.toString()
  const zerosToAdd = Math.max(0, length - numberStr.length)
  const formattedNumber = '0'.repeat(zerosToAdd) + numberStr
  return formattedNumber
}

export const SPICYLEVEL = [ 0,1,2,3 ]