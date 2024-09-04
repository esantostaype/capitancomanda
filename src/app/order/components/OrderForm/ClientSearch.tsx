import { useState, useEffect, useRef } from 'react'
import { fetchData } from '@/utils'
import { Client } from '@/interfaces'
import { SimpleSpinner } from '@/components'

interface ClientSearchProps {
  onSelectClient: (client: Client) => void
  token: string
}

export const ClientSearch = ({ onSelectClient, token }: ClientSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [noResults, setNoResults] = useState(false) // Estado para manejar los resultados
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchTerm.length >= 3 || searchTerm.length === 8) {
        setLoading(true)
        setNoResults(false) // Restablecer el estado de no resultados antes de hacer la búsqueda
        const data = await fetchData({ url: `/clients/search/${searchTerm}`, token })
        if (data.length === 0) {
          setNoResults(true) // Actualizar el estado si no hay resultados
        }
        setResults(data)
        setLoading(false)
      } else {
        setResults([])
        setNoResults(false) // Restablecer el estado de no resultados si la búsqueda es demasiado corta
      }
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm, token])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && !inputRef.current.contains(event.target as Node) &&
        resultsRef.current && !resultsRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false)
        setSearchTerm('') // Vaciar el término de búsqueda al hacer clic fuera
        setResults([]) // Opcional: Limpiar los resultados también
        setNoResults(false) // Opcional: Restablecer el estado de no resultados
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
    setResults([])
    setNoResults(false) // Restablecer el estado de no resultados al limpiar
  }

  const handleSelectClient = (client: Client) => {
    onSelectClient(client)
    handleClear()
    setIsFocused(false)
  }

  return (
    <div className="relative z-[9999] flex-1">
      <i className="fi fi-rr-search absolute left-4 top-4"></i>
      <input
        ref={inputRef}
        className="capitalize border-2 border-gray50 px-4 py-3 pl-12 outline-none w-full placeholder:text-gray400 bg-gray50 transition-all hover:placeholder:text-gray600 hover:bg-gray100 hover:border-gray100 focus:border-accent focus:bg-surface focus:placeholder:text-gray600"
        type="search"
        placeholder="Buscar por DNI o Nombre"
        value={searchTerm}
        onFocus={handleFocus}
        onChange={handleInputChange}
        autoComplete="off"
      />
      {loading && searchTerm.length >= 3 && (
        <div className="absolute right-2.5 top-2.5">
          <SimpleSpinner size="w-6 h-6" />
        </div>
      )}
      {isFocused && (
        <div>
          {results.length > 0 && (
            <ul ref={resultsRef} className="fadeIn absolute mt-1 bg-gray50 rounded overflow-hidden w-full shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-20">
              {results.map((client) => (
                <li
                  key={client.id}
                  onClick={() => handleSelectClient(client)}
                  className="group relative border-t border-t-gray100 first:border-t-0 text-gray600 cursor-pointer py-4 px-6 capitalize hover:text-foreground transition-all"
                >
                  {client.fullName} | DNI: {client.dni}
                  <span className="bg-accent opacity-0 absolute top-0 left-0 h-full w-full group-hover:opacity-10 transition-all"></span>
                </li>
              ))}
            </ul>
          )}
          {noResults && (
            <div className="absolute mt-1 bg-gray50 rounded w-full py-4 px-6 text-gray600 shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-20">
              No existen resultados
            </div>
          )}
        </div>
      )}
    </div>
  )
}
