import { OrderItemFull, Role, SelectedVariants } from "@/interfaces"
import { redirect } from "next/navigation"

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


interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  token?: string
  role?: string
}

export async function fetchData( options: RequestOptions ) {

  const { url, method, body, token } = options
  
  let headersApi: HeadersInit = {
    'Authorization': `Bearer ${ token }`
  }

  if ( method === 'POST' || method === 'PUT' ) {
    headersApi = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`
    }
  }

  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method,
      headers: headersApi,
      body: body ? JSON.stringify( body ) : undefined
    })
    const result = await response.json()
    console.log( result )
    return result
  } catch (error) {
    return { ok: false, errors: 'Error de red o de servidor', data: null }
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

export const getVariantPrice = ( product: OrderItemFull, selectedVariantWithPrice: SelectedVariants ): number => {
  const variation = product.variations.find(variation =>
    Object.entries(selectedVariantWithPrice).every(([key, value]) =>
      variation.name === key && variation.options.some( option => option.name === value )
    )
  )

  if (variation && variation.hasPrice) {
    const selectedOption = variation.options.find(option => option.name === selectedVariantWithPrice[ variation.name ])
    return selectedOption ? selectedOption.price || 0 : product.price
  }

  return product.price
}

export const generateUniqueId = (
  productId: string, 
  allVariants?: Record<string, string>, 
  additionals?: Record<string, number>,
  notes?: string
): string => {
  
  const variationPart = Object.entries( allVariants || '')
    .map(([key, value]) => `${value}`.toLowerCase().replace(/\s+/g, '-'))
    .join('-');

  const additionalsPart = Object.entries( additionals || '' )
    .map(([key, value]) => `${key}`.toLowerCase().replace(/\s+/g, '-') + (value > 1 ? `-${value}` : ''))
    .join('-');

  const notesPart = notes ? notes.toLowerCase().replace(/\s+/g, '-') : ''
    
  const combinedId = [productId, variationPart, additionalsPart, notesPart]
    .filter(part => part)
    .join('-');

  return combinedId
}

export const orderVariants = (
  originalOrder: { name: string }[], 
  variations: Record<string, string>
): Record<string, string> => {
  return Object.keys(variations)
    .sort((a, b) => {
      const indexA = originalOrder.findIndex(variation => variation.name === a)
      const indexB = originalOrder.findIndex(variation => variation.name === b)
      return indexA - indexB
    })
    .reduce((acc, key) => {
      acc[key] = variations[key]
      return acc
    }, {} as Record<string, string>)
}




const getSuspender = (promise: Promise<any>) => {
  let status = "pending";
  let response: any;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
};

export function fetchDataPro(options: RequestOptions) {
  const { url, method = 'GET', body, token } = options;

  let headersApi: HeadersInit = {
    'Authorization': `Bearer ${token || ''}`
  };

  if (method === 'POST' || method === 'PUT') {
    headersApi['Content-Type'] = 'application/json';
  }

  const promise = fetch(`${apiUrl}${url}`, {
    method,
    headers: headersApi,
    body: body ? JSON.stringify(body) : undefined,
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error en la solicitud');
      }
      return response.json();
    })
    .catch((error) => {
      return { ok: false, errors: error.message || 'Error de red o de servidor', data: null };
    });

  return getSuspender(promise);
}