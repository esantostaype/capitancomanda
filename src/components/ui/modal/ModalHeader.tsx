type ModalHeaderProps = {
  children: React.ReactNode
  title?: string
  isJustPage?: boolean
  withTabs?: boolean
}

export const ModalHeader = ({ children }: ModalHeaderProps ) => {

  return (
    <div className="flex items-center md:h-auto p-4 md:p-6 lg:p-8 xl:p-10 border-b border-b-gray50 bg-surface sticky top-0 z-20">
      { children }
    </div>
  )
}