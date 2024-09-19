'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, ImageUpload, ModalBody, ModalFooter, ModalPage, Spinner, TextField } from '@/components'
import { toast } from 'react-toastify'
import { Branch, Color, Floor, Size, Variant } from '@/interfaces'
import { addBranch, editBranch } from '@/actions/branch-actions'
import { useUiStore } from '@/store/ui-store'
import { useEffect, useState } from 'react'
import { BranchSchema } from '@/schema'
import { useParams, usePathname } from 'next/navigation'
import { fetchData } from '@/utils'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { BranchFormFloors } from './BranchFormFloors'
import { BranchFormSkeleton } from '../BranchFormSkeleton'
import { useGlobalStore } from '@/store/global-store'
import { useBranch } from '@/hooks'

interface BranchFormValues {
  name: string
  phoneNumber?: string
  address?: string
  floors: Floor[]
}

interface Props {
  refetchBranches: () => void
  token?: string
}

export const BranchForm = ({ token, refetchBranches }: Props) => {

  const pathName = usePathname()
  const { id } = useParams()
  const branchId = Array.isArray( id ) ? id[0] : id

  const [ newImage, setNewImage] = useState<string | null>(null)
  const [ deleteImage, setDeleteImage ] = useState<boolean>(false)
  const { activeModalPage, closeModalPage } = useUiStore()
  const { toggleUpdateTrigger } = useGlobalStore()
  const [ tabIndex, setTabIndex ] = useState(0)

  const isEditMode = pathName.startsWith('/admin/branches/edit')
  const isCreateMode = pathName === '/admin/branches/create'

  const { isLoading, data: branch, refetch: refetchBranch } = useBranch({ branchId, token })

  const initialValues: BranchFormValues = {
    name: branch ? branch.name : '',
    phoneNumber: branch ? branch.phoneNumber : '',
    address: branch ? branch.address : '',
    floors: branch?.floors ?? []
  }

  const handleSubmit = async (values: BranchFormValues, actions: FormikHelpers<BranchFormValues>) => {
    const branchValues = {
      ...values,
      image: deleteImage ? null : (newImage || branch?.image || null),
      floors: values.floors.map(floor => ({
        ...floor,
        tables: floor.tables.map(( table, index ) => ({
          number: `${ index + 1 }`,
          status: table.status
        }))
      }))
    }
  
    if (branch) {
      await editBranch(branch.id, branchValues, token ? token : '')
    } else {
      await addBranch(branchValues, token ? token : '')
    }
  
    actions.setSubmitting(false)
    toggleUpdateTrigger()
    closeModalPage(true)
    toast.success(branch ? 'Sucursal Actualizada!' : 'Sucursal Creada!')
    refetchBranches()
    refetchBranch()
  }

  useEffect(() => {
    if ( !activeModalPage ) {
      setTabIndex( 0 )
      setNewImage( null )
    }
  }, [ activeModalPage ])
  
  return (
    <ModalPage
      withTabs
      isOpen={ isEditMode || isCreateMode }
      title={ !branch && isEditMode ? "" : branch?.name || "Crear Sucursal" }
      backText='Regresar a la lista de Sucursales'
      withBackRoute
      isEditMode={ isEditMode }
    >
    {
      isLoading && isEditMode
      ? <BranchFormSkeleton/>
      : <Formik initialValues={ initialValues } onSubmit={ handleSubmit } validationSchema={ BranchSchema }>
      {({ errors, touched, values, isSubmitting }) => (
        <>
        <Form className="flex flex-col flex-1 overflow-y-auto -mt-10 pb-10">
          <Spinner isActive={ isSubmitting } />
          <ModalBody withTabs>
            <Tabs selectedIndex={ tabIndex } onSelect={( index ) => setTabIndex( index )} className="flex flex-col flex-1">
              <TabList className="border-b border-b-gray50 bg-surface sticky top-0 mb-10 z-[999] flex gap-6 h-10 text-base font-500 leading-none text-gray500">
                <Tab>Información</Tab>
                <Tab>Ambientes y Mesas</Tab>
              </TabList>
              <TabPanel>
                <div className="grid grid-cols-7 gap-6">
                  <div className="col-span-2">
                    <ImageUpload
                      newImage={ newImage }
                      deleteImage={ deleteImage }
                      setNewImage={ setNewImage }
                      setDeleteImage={ setDeleteImage }
                      image={ branch?.image || '' }
                      altImage={ branch?.name || '' }
                    />
                  </div>
                  <div className="col-span-5">
                    <div className="grid grid-cols-8 gap-6">
                      <div className="col-span-4">
                        <TextField
                          label='Nombre'
                          type='text'
                          name='name'
                          placeholder='Ingresa el Nombre de la Sucursal'
                          errors={ errors.name }
                          touched={ touched.name }
                          value={ values.name }
                        />
                      </div>
                      <div className="col-span-4">
                        <TextField
                          label='Teléfono'
                          type='text'
                          name='phoneNumber'
                          placeholder='Ingresa el Teléfono de la Sucursal'
                          errors={ errors.phoneNumber }
                          touched={ touched.phoneNumber }
                          value={ values.phoneNumber }
                        />
                      </div>
                      <div className="col-span-8">
                        <TextField
                          label='Dirección'
                          type='text'
                          name='address'
                          placeholder='Ingresa la Dirección de la Sucursal'
                          errors={ errors.address }
                          touched={ touched.address }
                          value={ values.address }
                        />
                      </div>                      
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <BranchFormFloors
                  floors={ values.floors }
                />
              </TabPanel>
            </Tabs>
          </ModalBody>
          <ModalFooter withTabs>
            <Button variant={ Variant.CONTAINED } text="Cancelar" size={ Size.LG } onClick={ ()=> closeModalPage(true) }/>            
            <Button variant={ Variant.CONTAINED } color={ Color.ACCENT } text={ branch ? 'Guardar Sucursal' : 'Crear Sucursal' } size={ Size.LG } submit />
          </ModalFooter>
        </Form>
        </>
      )}
        </Formik>
    }
    </ModalPage>
  )
}
