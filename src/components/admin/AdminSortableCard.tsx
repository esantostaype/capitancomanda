'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Category, Size } from '@/interfaces'
import Image from 'next/image'
import { AdminCard } from './AdminCard'

type SortableAdminCardProps = {
  id: string
  category: Category
  isOwner: boolean
  onDelete: () => void
}

export const AdminSortableCard = ({
  id,
  category,
  isOwner,
  onDelete,
}: SortableAdminCardProps ) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  return (
    <div
      ref={ setNodeRef }
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      <AdminCard
        onClickDelete={onDelete}
        linkEdit={`/admin/categories/edit/${category.id}`}
        hasFooter={isOwner}
        className="hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
        footer={
          <>
          {
            isOwner &&
            <div className="flex items-start leading-4 text-xs gap-2">
              <i className="fi fi-tr-store-alt text-base -mt-[2px]"></i>
              {category.user.branch.name}
            </div>
          }
          <div className="flex items-start leading-4 text-xs gap-2">
            <i className="fi fi-tr-circle-user text-base -mt-[2px]"></i>
            {category.user.fullName}
          </div>
          </>
        }
      >
        <div className="flex items-center justify-center rounded-lg text-lg text-accent h-16 w-16 overflow-hidden bg-gray50">
          {
            category.image ? (
              <Image src={category.image} alt={category.name} width={128} height={128} className="aspect-square object-cover" />
            ) : (
              <i className="fi fi-tr-image-slash"></i>
            )
          }
        </div>
        <h2 className="text-lg font-semibold mt-4">{category.orderNumber} {category.name}</h2>
        <p className="text-gray500">{category.products.length} Producto{category.products.length !== 1 && "s"}</p>
        <div {...attributes} {...listeners} className="text-gray400 cursor-grab absolute bottom-2 right-2 h-8 w-8 flex items-center justify-center hover:bg-gray50 hover:text-gray600 transition-all rounded-2xl">
          <i className="fi fi-tr-arrows text-base"></i>
        </div>
        
      </AdminCard>
    </div>
  )
}
