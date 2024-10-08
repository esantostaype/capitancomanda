'use client'
import { AdminCard, AdminGrid } from '@/components'
import { Skeleton } from '@mui/material'

interface Props {
  isOwner?: boolean
}

export const BranchesDataSkeleton = ( { isOwner = false }: Props ) => {
  const skeletonRows = Array.from({ length: 1 }, (_, i) => i);

  return (
    <AdminGrid>
    { skeletonRows.map(( index ) => (
      <AdminCard
        key={ index }
        hasImage
        image=""
        hasFooter={ isOwner }
        isSkeleton
        footer={
          <>
          {
            isOwner &&
            <Skeleton animation="wave" variant="text" width={ 80 } className="bg-gray50" />
          }
            <div className="-mt-2 -mb-[3px]"><Skeleton animation="wave" variant="text" width={ 140 } className="bg-gray50" /></div>
          </>
        }
      >
        <Skeleton animation="wave" variant="text" height={ 31 } className="bg-gray50" />
        <Skeleton animation="wave" variant="text" height={ 18 } width={ 100 } className="bg-gray50" />          
      </AdminCard>
    ))}
    </AdminGrid>
  )
}