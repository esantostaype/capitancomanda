type ModalBackgroundProps = {
  children: React.ReactNode
  withTabs?: boolean
  isJustPage?: boolean
}

export const ModalBody = ({ children, withTabs, isJustPage }: ModalBackgroundProps ) => {

  return (
    <div className={`flex-1 ${ isJustPage ? "mb-8" : "p-8" } ${ withTabs && !isJustPage ? "-mt-8" : "" } `}>
      { children }
    </div>
  )
}