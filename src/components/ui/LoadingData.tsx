import { SimpleSpinner } from "@/components"

type EmptyPropsData = {
  text?: string
}

export const LoadingData = ({ text }: EmptyPropsData ) => {
  return (
    <div className="flex-1 flex items-center justify-center text-xl text-gray300">
      <div className="text-center flex flex-col gap-2 items-center">
        <SimpleSpinner/>
        <h3>Cargando{ text && ` ${ text }` || "..." }</h3>
      </div>
    </div>
  )
}