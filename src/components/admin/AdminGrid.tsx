import { useAutoAnimate } from '@formkit/auto-animate/react'

type AdminTemplateProps = {
  children: React.ReactNode
}

export const AdminGrid = ({ children }: AdminTemplateProps ) => {

  return (
    <>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
      { children }
    </div>
    </>
  )
}