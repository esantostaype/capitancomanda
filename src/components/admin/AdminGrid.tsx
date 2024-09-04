import { useAutoAnimate } from '@formkit/auto-animate/react'

type AdminTemplateProps = {
  children: React.ReactNode
  listRef?: any
}

export const AdminGrid = ({ children, listRef }: AdminTemplateProps ) => {

  return (
    <>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 animate-fade animate-duration-500" ref={ listRef }>
      { children }
    </div>
    </>
  )
}