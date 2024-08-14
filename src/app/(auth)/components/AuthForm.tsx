'use client'
import { Form } from "formik"

type AdminTemplateProps = {
  children: React.ReactNode
}

export const AuthForm = ({ children }: AdminTemplateProps ) => {
  return (
    <>
    <Form className='flex flex-col gap-6'>
      { children }
    </Form>
    </>
  )
}