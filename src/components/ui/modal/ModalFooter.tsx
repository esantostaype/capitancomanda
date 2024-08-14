type ModalBackgroundProps = {
  children: React.ReactNode
  isJustPage?: boolean
}

export const ModalFooter = ({ children, isJustPage }: ModalBackgroundProps ) => {

  return (
    <div className={`flex items-center justify-end gap-4 border-t border-t-gray50 ${ isJustPage ? "py-8" : "sticky -bottom-8 -mb-8 p-8 bg-surface z-[999]" }`}>
      { children }
    </div>
  )
}