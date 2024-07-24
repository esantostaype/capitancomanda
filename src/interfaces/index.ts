export enum Role {
  SUPERADMIN = 'SUPERADMIN',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CHEF = 'CHEF',
  CASHIER = 'CASHIER',
  WAITER = 'WAITER',
  CLIENT = 'CLIENT'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  VERIFIED = 'VERIFIED',
  NOT_VERIFIED = 'NOT_VERIFIED'
}

export enum OrderStatus {
  RECEIVED = 'RECEIVED',
  IN_PREPARATION = 'IN_PREPARATION',
  READY = 'READY',
  DONE = 'DONE',
  CANCELED = 'CANCELED'
}

export const roleTranslations: { [ key in Role ]: string } = {
  [ Role.SUPERADMIN ]: 'Superadministrador',
  [ Role.OWNER ]: 'Propietario',
  [ Role.ADMIN ]: 'Administrador',
  [ Role.MANAGER ]: 'Gerente',
  [ Role.CHEF ]: 'Chef',
  [ Role.CASHIER ]: 'Cajero',
  [ Role.WAITER ]: 'Camarero',
  [ Role.CLIENT ]: 'Cliente'
}

export const userStatusTranslations: { [ key in UserStatus ]: string } = {
  [ UserStatus.ACTIVE ]: 'Activo',
  [ UserStatus.INACTIVE ]: 'Inactivo',
  [ UserStatus.VERIFIED ]: 'Verificado',
  [ UserStatus.NOT_VERIFIED ]: 'No Verificado',
}

export const orderStatusTranslations: { [ key in OrderStatus ]: string } = {
  [ OrderStatus.RECEIVED ]: 'Recibida',
  [ OrderStatus.IN_PREPARATION ]: 'En Preparación',
  [ OrderStatus.READY ]: 'Lista para Servir',
  [ OrderStatus.DONE ]: 'Entregada',
  [ OrderStatus.CANCELED ]: 'Cancelada'
}

export interface Select {
  value: Role;
  label: string;
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserRegister {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  userName?: string
  fullName?: string
  password: string
  role: Role
  status: UserStatus
  branchId: string
  branch: Branch
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  user: any;
  id: number
  total: number
  table: string
  delivery: boolean
  date: Date
  status: OrderStatus
  orderReadyAt: Date | null
  branchId: string
  branch: Branch
}

export interface OrderProducts {
  id: number
  orderId: number
  productId: number
  quantity: number
  spicyLevelNumber: number | null
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string | null
  variants: []
  ingredients: []
  categoryId: string
  category: Category
  userId: string
  user: User
}

export interface Branch {
  id: string
  name: string
  users: User[]
  address?: string
  phoneNumber?: string
  restaurantId: string
}

export interface Category {
  id: string
  name: string
  image: string
  branchId: string
  branch: Branch
  products: Product[]
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