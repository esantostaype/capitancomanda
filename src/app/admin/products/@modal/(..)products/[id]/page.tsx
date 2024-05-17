import { Modal } from '@/components'
import { fetchData } from '@/utils'
import { ProductsForm } from '../../../ProductsForm';

export default async function ModalProductIdPage({ params } : { params: { id : number } }) {

  const product = await fetchData({ url: `/products/${ params.id }` })
  
  return (
    <Modal title={ product.name } backText='Regresar a la lista de Productos'>
      <ProductsForm product={ product } />
    </Modal>
  );
}