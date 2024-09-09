type ModalHeaderProps = {
  children: React.ReactNode
  title?: string
  isJustPage?: boolean
  withTabs?: boolean
}

export const ModalHeader = ({ children }: ModalHeaderProps ) => {

  return (
    <div className="p-4 md:py-4 xl:py-6 md:px-8 xl:px-10 border-b border-b-gray50 bg-surface sticky top-0 z-20">
      { children }
    </div>
  )
}