import { z } from 'zod'
import * as Yup from 'yup';
import { Role, User } from '@/interfaces';

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

export const getValidationSchema = ( user?: User | null, isOwner?: boolean ) => {
  const baseSchema = {
    email: Yup.string()
      .email('Correo Electrónico no válido')
      .required('El Correo Electrónico es requerido'),
    role: Yup.mixed<Role>()
      .oneOf(Object.values(Role))
      .required('El Rol es requerido')
  }

  if (!user) {
    return Yup.object().shape({
      ...baseSchema,
      password: Yup.string()
        .min(6, 'La contraseña debe tener como mínimo 6 caracteres')
        .required('La Contraseña es requerida'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Las Contraseñas deben coincidir')
        .required('La confirmación de Contraseña es requerida')
    })
  }

  if ( isOwner ) {
    return Yup.object().shape({
      ...baseSchema,
      branchId: Yup.string().required('La Sucursal es requerida')
    })
  }

  return Yup.object().shape( baseSchema )
}

export const BranchSchema = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
  phoneNumber: Yup.string(),
  address: Yup.string()
})

export const ProductSchema = Yup.object().shape({
	name: Yup.string()
		.min( 2, 'El Nombre del Producto debe tener al menos 2 caracteres' )
		.max( 48, 'El Nombre del Producto no debe ser mayor a 48 caracteres' )
		.required( 'El Nombre del Producto es requerido' ),
  price: Yup.number()
    .required( 'El precio es requerido' ),
  categoryId: Yup.string()
    .required( 'La categoría del Producto es requerida' )
	
})

export const CategorySchema = Yup.object().shape({
	name: Yup.string()
		.min( 2, 'El Nombre de la Categoría debe tener al menos 2 caracteres' )
		.max( 48, 'El Nombre de la Categoría no debe ser mayor a 48 caracteres' )
		.required( 'El Nombre de la Categoría es requerido' )
	
})

export const EmailSchema = Yup.object().shape({
  email: Yup.string().email( 'Correo Electrónico no válido' ).required( 'El Correo Electrónico es requerido' )
})

export const PasswordSchema = Yup.object().shape({
  password: Yup.string().min( 6, 'La contraseña debe tener como mínimo 6 caracteres' ).required( 'La Contraseña es requerida' ),
	confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las Contraseñas deben coincidir')
    .required('La confirmación de Contraseña es requerida')	
})

export const SignUpCompleteSchema = Yup.object().shape({
	restaurantName: Yup.string()
		.min( 2, 'El Nombre de tu Restaurante debe tener al menos 2 caracteres' )
		.max( 48, 'El Nombre de tu Restaurante no debe ser mayor a 48 caracteres' )
		.required( 'El Nombre de tu Restaurante es requerido' ),
  fullName: Yup.string()
  .min( 2, 'Tu Nombre debe tener al menos 2 caracteres' )
  .max( 48, 'Tu Nombre no debe ser mayor a 48 caracteres' )
  .required( 'Tu Nombre es requerido' ),
  password: Yup.string().min( 6, 'La contraseña debe tener como mínimo 6 caracteres' ).required( 'La Contraseña es requerida' ),
	confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las Contraseñas deben coincidir')
    .required('La confirmación de Contraseña es requerida')	
})

export const SignUpCompleteOAuthSchema = Yup.object().shape({
	restaurantName: Yup.string()
		.min( 2, 'El Nombre de tu Restaurante debe tener al menos 2 caracteres' )
		.max( 48, 'El Nombre de tu Restaurante no debe ser mayor a 48 caracteres' )
		.required( 'El Nombre de tu Restaurante es requerido' ),
  password: Yup.string().min( 6, 'La contraseña debe tener como mínimo 6 caracteres' ).required( 'La Contraseña es requerida' ),
	confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las Contraseñas deben coincidir')
    .required('La confirmación de Contraseña es requerida')	
})

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email( 'Correo Electrónico no válido' ).required( 'El Correo Electrónico es requerido' ),
  password: Yup.string().min( 6, 'La Contraseña debe tener como mínimo 6 caracteres' ).required( 'La Contraseña es requerida' )
})