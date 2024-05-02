import { Order, OrderProducts, Product } from '@prisma/client';

export interface OrderItemFull {
  id: number;
  name: string;
  price: number;
  image: string;
  spicyLevel: boolean;
  spicyLevelNumber?: number;
  quantity: number;
  subtotal: number;
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

export type SpicyLevelNumber = 0 | 1 | 2 | 3;

export type OrderItemWithSpicy = OrderItem & {
  spicyLevel?: boolean
  spicyLevelNumber?: SpicyLevelNumber
}