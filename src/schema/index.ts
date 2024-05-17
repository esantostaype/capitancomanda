import { z } from 'zod'
import * as Yup from 'yup';

function isValidTable( value: string ): boolean {
  const num = parseInt( value )
  return !isNaN( num ) && num >= 1 && num <= 10
}

export const OrderSchema = z.object({
  table: z.string().refine(isValidTable, {
    message: 'Ingresa un N° de Mesa entre 1 y 10',
  }),
  total: z.number().min( 1, 'Hay errores en la Orden' ),
  delivery: z.boolean(),
  order: z.array( z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    subtotal: z.number(),
    spicyLevelNumber: z.number().min( 0 )
  }) )
})

export const ProductSchema = Yup.object().shape({
	name: Yup.string()
		.min( 2, 'El nombre del producto debe tener al menos 2 caracteres' )
		.max( 48, 'El nombre del producto no debe ser mayor a 48 caracteres' )
		.required( 'El nombre del producto es requerido' ),
  price: Yup.number()
    .required( 'El precio es requerido' ),
  categoryId: Yup.number()
    .required( 'La categoría del producto es requerida' )
	
})