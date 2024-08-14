import { useAutoAnimate } from '@formkit/auto-animate/react'

type AdminTemplateProps = {
  children: React.ReactNode
}

export const AdminGrid = ({ children }: AdminTemplateProps ) => {
  
  const [ listRef ] = useAutoAnimate()

  return (
    <>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8" ref={ listRef }>
      { children }
    </div>
    </>
  )
}