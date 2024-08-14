type Props = {
  label: string
}

export const AdminSidebarTitle = ({ label } : Props ) => {
  return (
    <div className="uppercase flex items-center gap-2 text-xs px-6 text-gray500 mb-3">
      <span>{ label }</span>
      <span className="h-[1px] w-full bg-gray50"></span>
    </div>
  )
}