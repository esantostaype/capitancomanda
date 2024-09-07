import { OrderItemFull, Product } from "@/interfaces"
import { fetchData } from "@/utils"
import { useQuery } from "@tanstack/react-query"

type ProductsProps = {
  categoryKey?: string
  token?: string
}

type ProductProps = {
  categoryKey?: string
  productId?: string | null
  token?: string
}

export const useProducts = ({ token }: ProductsProps) => {
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchData<Product[]>({ url: `/products`, token }),
    staleTime: 1000 * 60 * 60
  })
  return productsQuery
}

export const useProduct = ({ productId, token }: ProductProps) => {
  const productQuery = useQuery({
    queryKey: ['product', { productId }],
    queryFn: () => fetchData<Product>({ url: `/products/${ productId }`, token }),
    staleTime: 1000 * 60 * 60
  })
  return productQuery
}

export const useOrderProducts = ({ categoryKey, token }: ProductsProps) => {
  const orderProductsQuery = useQuery({
    queryKey: ['orderProducts', { categoryKey }],
    queryFn: () => {
      const url = categoryKey 
        ? `/products/category/${categoryKey}` 
        : `/products`
      return fetchData<OrderItemFull[]>({ url, token })
    },
    staleTime: 1000 * 60 * 60
  })
  
  return orderProductsQuery
}

export const useOrderProduct = ({ productId, token }: ProductProps) => {
  const orderProductQuery = useQuery({
    queryKey: ['orderProducts', { productId }],
    queryFn: () => fetchData<OrderItemFull>({ url: `/products/${ productId }`, token }),
    staleTime: 1000 * 60 * 60
  })
  return orderProductQuery
}

export const useOrderProductFull = ({ productId, token }: ProductProps) => {
  const orderProductFullQuery = useQuery({
    queryKey: ['productFull', { productId }],
    queryFn: () => fetchData<OrderItemFull>({ url: `/products/${ productId }`, token }),
    staleTime: 1000 * 60 * 60
  })
  return orderProductFullQuery
}