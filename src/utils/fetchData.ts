import { apiUrl } from "."

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  token?: string
  role?: string
}

export const fetchData = async <T>( options: RequestOptions ): Promise<T> => {
  const { url, method, body, token } = options

  let headersApi: HeadersInit = {
    'Authorization': `Bearer ${token}`
  }

  if ( method === 'POST' || method === 'PUT' ) {
    headersApi = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await fetch(`https://restify-backend-production.up.railway.app/api${ url }`, {
      method,
      headers: headersApi,
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      throw new Error('Error de red o de servidor')
    }

    const result: T = await response.json();
    return result;
  } catch (error) {
    return Promise.reject({ ok: false, errors: 'Error de red o de servidor', data: null })
  }
}