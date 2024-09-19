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

export enum MeasurementUnit {
  GRAM = 'GRAM',
  KILOGRAM = 'KILOGRAM',
  LITER = 'LITER',
  MILLILITER = 'MILLILITER',
  PIECE = 'PIECE'
}

export enum Color {
  ACCENT = 'ACCENT',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

export enum Variant {
  CONTAINED = 'CONTAINED',
  GHOST = 'GHOST'
}

export enum Size {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  _2XL = '2XL',
  _3XL = '3XL',
  _4XL = '4XL',
  _5XL = '5XL',
  _6XL = '6XL',
  _7XL = '7XL'
}

export enum IconButtonShape {
  CIRCLE = 'CIRCLE',
  SQUARE = 'SQUARE'
}

export enum  OrderType {
  DINE_IN = 'DINE_IN',
  TAKE_AWAY = 'TAKE_AWAY',
  DELIVERY = 'DELIVERY'
}

export enum  TableStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  OCCUPIED_AWAITING_ORDER = 'OCCUPIED_AWAITING_ORDER',
  OCCUPIED_SERVED = 'OCCUPIED_SERVED'
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

export const measurementUnitTranslations: { [ key in MeasurementUnit ]: string } = {
  [ MeasurementUnit.GRAM ]: 'Gramo(s)',
  [ MeasurementUnit.KILOGRAM ]: 'Kilogramo(s)',
  [ MeasurementUnit.LITER ]: 'Litro(s)',
  [ MeasurementUnit.MILLILITER ]: 'Mililitro(s)',
  [ MeasurementUnit.PIECE ]: 'Pieza(s)',
}

export const orderTypeTranslations: { [ key in OrderType ]: string } = {
  [ OrderType.DINE_IN ]: 'Comer en Salón',
  [ OrderType.TAKE_AWAY ]: 'Para Llevar',
  [ OrderType.DELIVERY ]: 'Delivery'
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

export interface Restaurant {
  id: string
  name: string
  logo?: string
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

export interface Client {
  id: string
  dni: string
  fullName?: string
  email: string
  phone: string
  role: Role.CLIENT
  userId: string
  clientOrders?: Order[]
}

export interface Order {
  id: string
  total: number
  floor: string
  table: string
  amount?: number
  orderType: OrderType
  notes?: string
  status: OrderStatus
  date: Date
  orderReadyAt?: Date
  orderProducts: OrderProducts[]
  userId: string
  user: User
  clientId?: string
  client?: Client
  orderNumber: string
}

export interface OrderProducts {
  id: number
  orderId: number
  productId: number
  quantity: number
}

export interface Product {
  id: string
  orderNumber: string
  name: string
  description: string
  price: number
  image: string | null
  variations: ProductVariation[]
  additionals: ProductAdditional[]
  ingredients: ProductIngredient[]
  categoryId: string
  category: Category
  userId: string
  user: User
}

export interface Table {
  id?: string
  number: string
  status: TableStatus
}

export interface Floor {
  id?: string
  name: string
  tables: Table[]
}

export interface Branch {
  id: string
  name: string
  users: User[]
  address?: string
  phoneNumber?: string
  floors: Floor[]
  image?: string
  restaurantId: string
}

export interface Category {
  id: string
  orderNumber: number
  name: string
  image: string
  products: Product[]
  userId: string
  user: User
}

export type OrderItemFull = Omit<Product, ''> & {
  id: number
  uniqueId: string
  name: string
  price: number
  image: string
  quantity: number
  subtotal: number
  variationPrice?: number
  selectedVariation?: string
  selectedOption? : string
  client?: Client
  selectedVariations?: { [ key: string ]: string }
  selectedAdditionals?: { [ key: string ]: number }
  notes?: string
  category: Category
}

export type OrderItem = Omit<Product, ''> & {
  uniqueId: string
  quantity: number
  subtotal: number
  selectedVariations?: { [ key: string ]: string }
  selectedAdditionals?: { [ key: string ]: number }
  variationPrice?: number
  notes?: string
}

export interface SelectedPriceVariant {
  name: string
  option: string
}

export interface SelectedVariants {
  [ key: string ]: string
}

export interface SelectedAdditionals {
  [ key: string ]: number
}

export type OrderWithProducts = Order & {
  orderProducts: ( OrderProducts & {
    product: Product
  })[]
}

export interface ProductFormValues {
  name: string
  description: string
  price: number | null
  image: string | null
  categoryId: string
  variations: ProductVariation[]
  additionals: ProductAdditional[]
  ingredients: ProductIngredient[]
}

export interface ProductVariation {
  id: string
  name: string
  hasPrice: boolean
  options: Array<{
    id: string;
    name: string
    price?: number
  }>
}

export interface ProductAdditional {
  id: string
  name: string
  price: number
}

export interface ProductIngredient {
  id: string
  name: string
  quantity: number
  unit: string
}

export type ProductsFormErrors = {
  [ K in keyof ProductFormValues ]?: string;
};

export type ProductsFormTouched = {
  [ K in keyof ProductFormValues ]?: boolean;
}