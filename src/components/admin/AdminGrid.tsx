import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props {
  children: React.ReactNode
  listRef?: any
}

export const AdminGrid = ({ children, listRef }: Props ) => {

  return (
    <>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 animate-fade animate-duration-500" ref={ listRef }>
      { children }
    </div>
    </>
  )
}