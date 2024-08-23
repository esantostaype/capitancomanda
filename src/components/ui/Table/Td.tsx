'use client'

interface Props {
  children: React.ReactNode
}

export const Td = ({ children }: Props ) => {
  
  return (
    <td className="group-hover:bg-background first:w-12 py-2 px-4 bg-surface border-t border-t-gray50">
      { children }
    </td>
  )
}