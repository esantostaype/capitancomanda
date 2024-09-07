import { Branch } from "@/interfaces"
import { fetchData } from "@/utils"
import { useQuery } from "@tanstack/react-query"

type BranchesProps = {
  token?: string
}

type BranchProps = {
  branchId?: string | null
  token?: string
}

export const useBranches = ({ token }: BranchesProps) => {
  const branchesQuery = useQuery({
    queryKey: ['branches'],
    queryFn: () => fetchData<Branch[]>({ url: `/branches`, token }),
    staleTime: 1000 * 60 * 60
  })
  return branchesQuery
}

export const useBranch = ({ branchId, token }: BranchProps) => {
  const branchQuery = useQuery({
    queryKey: ['branch', { branchId }],
    queryFn: () => fetchData<Branch>({ url: `/branches/${ branchId }`, token }),
    staleTime: 1000 * 60 * 60
  })
  return branchQuery
}