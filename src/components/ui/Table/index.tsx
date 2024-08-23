'use client'

interface Props {
  children: React.ReactNode
  thead: {
    label: string
    width?: string
  }[]
}

export const Table = ({ children, thead }: Props ) => {
  
  return (
    <div className="border border-gray50 rounded-lg overflow-x-auto max-w-full bg-surface">
      <table className="w-full">        
        <thead>
          <tr>
            { thead.map(( th, index ) => (
              <th key={ index } className="bg-background p-4 text-left border-b-2 border-b-gray50 first:w-12" style={{ width: th.width || 'auto' }}>
                { th.label }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          { children }
        </tbody>
      </table>
    </div>
  )
}