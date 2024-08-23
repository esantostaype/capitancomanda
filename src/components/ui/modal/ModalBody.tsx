type ModalBackgroundProps = {
  children: React.ReactNode
  withTabs?: boolean
  isJustPage?: boolean
}

export const ModalBody = ({ children, withTabs, isJustPage }: ModalBackgroundProps ) => {

  return (
    <div className={`relative flex-1 ${ isJustPage ? "mb-10" : "p-10" } ${ withTabs && !isJustPage ? "-mt-10" : "" } `}>
      { children }
    </div>
  )
}