'use client'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { toast } from 'react-toastify'
import { fetchData } from '@/utils'
import { Product } from '@/interfaces'

import styles from './AddEditFormProduct.module.css'

interface FormValues {
  name: string,
  price: number,
  image: string,
  spicyLevelNumber: number,
  categoryId: number
}

export const AddEditFormProduct = () => {

  const initialValues: FormValues = {
    name: '',
    price: NaN,
    image: '',
    spicyLevelNumber: NaN,
    categoryId: NaN
  };

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {
    
    const productData = {
      name: values.name,
      price: values.price,
      image: values.image,
      spicyLevelNumber: values.spicyLevelNumber,
      categoryId: values.categoryId
    };

    await fetchData({ url: '/products', method: 'POST', body: productData })

    toast.success('¡Producto Creado!')
  }

  return (
    <Formik initialValues={ initialValues } onSubmit={ handleSubmit }>
      <Form className={ styles.summary__send }>
        <Field type="text" name="name" placeholder="Nombre de Producto"/>
        <Field type="number" name="price" placeholder="Precio"/>
        <Field type="text" name="image" placeholder="Imagen"/>
        <Field type="number" name="spicyLevelNumber" placeholder="Nivel de Picante"/>
        <Field type="number" name="categoryId" placeholder="Categoría"/>
        <button type="submit" className="button main-button">
          Enviar Comanda
        </button>
      </Form>
    </Formik>
  )
}