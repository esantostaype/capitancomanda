'use client'
import { AdminTemplate, OpenModalPageButton } from '@/components'
import { BranchForm, BranchesData } from '.'
import { useBranches } from '@/hooks'

type AdminTemplateProps = {
  role?: string
  token?: string
}

export const BranchesPage = ({ role, token }: AdminTemplateProps ) => {

  const { isLoading, data, refetch: refetchBranches } = useBranches({ token })

  return (
    <>
    <AdminTemplate
      title='Sucursales'
      button={ <OpenModalPageButton link="/admin/branches/create"/> }
    >
      <BranchesData branchesData={{ branches: data, token, role, refetchBranches, isLoading }} />
    </AdminTemplate>
    <BranchForm token={ token } refetchBranches={ refetchBranches }/>
    </>
  )
}