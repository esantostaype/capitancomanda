interface Props {
  title: string
  button?: React.ReactNode
  children?: React.ReactNode
}

export const AdminTemplate = ({ title, button, children }: Props ) => {
  return (
    <>
    <header className="flex items-center gap-8 justify-between py-6 px-8 sticky">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-semibold">{ title }</h1>
        { button }
      </div>
    </header>
    <section className="p-8 pt-0 overflow-y-auto flex-1 flex flex-col">
      { children }
    </section>
    </>
  )
}