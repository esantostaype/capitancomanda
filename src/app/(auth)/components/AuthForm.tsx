'use client'
import { Form } from "formik"

interface Props {
  children: React.ReactNode
}

export const AuthForm = ({ children }: Props ) => {
  return (
    <>
    <Form className='flex flex-col gap-6'>
      { children }
    </Form>
    </>
  )
}