import { Modal } from '@/components'
import { ProductsForm } from '../../../ProductsForm';

export default async function ModalCreateProductPage() {
  
  return (
    <Modal title="Crear Producto" backText='Regresar a la lista de Productos'>
      <ProductsForm />
    </Modal>
  )
}