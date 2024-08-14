type AuthTitleProps = {
  title: string
}

export const AuthTitle = ({ title }: AuthTitleProps) => {

  return (
    <h1 className="text-2xl text-center mb-6 font-semibold">{ title }</h1>
  )
}