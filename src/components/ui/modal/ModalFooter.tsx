type ModalFooterProps = {
  children: React.ReactNode
  isJustPage?: boolean
  withTabs?: boolean
}

export const ModalFooter = ({ children, isJustPage, withTabs }: ModalFooterProps ) => {

  return (
    <div className={`flex items-center justify-end gap-4 border-t border-t-gray50 sticky bg-surface z-[999] ${ withTabs ? "-mb-10 -bottom-10" : "bottom-[-1px]" } p-8`}>
      { children }
    </div>
  )
}