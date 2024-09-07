import { Category } from "@/interfaces"
import { fetchData } from "@/utils"
import { useQuery } from "@tanstack/react-query"

type CategoriesProps = {
  filterKey?: string
  token?: string
}

type CategoryProps = {
  id?: string | string[]
  token?: string
}

export const useCategories = ({ token }: CategoriesProps) => {
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchData<Category[]>({ url: `/categories`, token })
  })
  return categoriesQuery
}

export const useCategory = ({ id, token }: CategoryProps) => {
  const categoryQuery = useQuery({
    queryKey: ['category', { id }],
    queryFn: () => fetchData<Category>({ url: `/categories/${ id }`, token })
  })
  return categoryQuery
}