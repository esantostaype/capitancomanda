export interface Order {
  id: number
  total: number
  table: string
  delivery: boolean
  date: Date
  status: string
  orderReadyAt: Date | null
}

export interface OrderProducts {
  id: number
  orderId: number
  productId: number
  quantity: number
  spicyLevelNumber: number | null
}

export interface Product {
  id: number
  name: string
  description: Text
  price: number
  image: string | null
  spicyLevel: boolean | null
  spicyLevelNumber: number | null
  categoryId: number
  category: Category
}

export interface Category {
  id: number
  name: string
  slug: string
  icon: string | null
}

export interface OrderItemFull {
  id: number
  name: string
  price: number
  image: string
  spicyLevel: boolean
  spicyLevelNumber?: number
  quantity: number
  subtotal: number
}

export type OrderItem = Omit<Product, 'categoryId'> & {
  quantity: number
  subtotal: number
  spicyLevelNumber?: number
}

export type OrderWithProducts = Order & {
  orderProducts: ( OrderProducts & {
    product: Product
  })[]
}

export type SpicyLevelNumber = 0 | 1 | 2 | 3

export type OrderItemWithSpicy = OrderItem & {
  spicyLevel?: boolean
  spicyLevelNumber?: SpicyLevelNumber
}