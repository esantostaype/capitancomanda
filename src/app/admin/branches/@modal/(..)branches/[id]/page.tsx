import { Modal } from '@/components'
import { fetchData } from '@/utils'
import { BranchesForm } from '@/app/admin/branches/BranchesForm'
import { setSession } from '@/utils/session'

export default async function ModalCategoryIdPage({ params } : { params: { id : number } }) {
  const { token } = await setSession()
  const branch = await fetchData({ url: `/branches/${ params.id }`, token: token })
  
  return (
    <Modal title={ branch.name }  withBackRoute={ true }>
      <BranchesForm branch={ branch } token={ token } withBackRoute={ true }/>
    </Modal>
  );
}