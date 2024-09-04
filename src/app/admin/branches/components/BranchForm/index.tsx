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

interface FormValues {
  name: string
  phoneNumber: string | undefined
  address: string | undefined
  floors: Floor[]
}

type Props = {
  token?: string
}

export const BranchForm = ({ token }: Props) => {

  const pathName = usePathname()
  const { id } = useParams()

  const [ branch, setBranch ] = useState<Branch | null>(null)
  const [ newImage, setNewImage] = useState<string | null>(null)
  const [ deleteImage, setDeleteImage ] = useState<boolean>(false)
  const { activeModalPage, closeModalPage } = useUiStore()
  const { toggleUpdateTrigger } = useGlobalStore()
  const [ tabIndex, setTabIndex ] = useState(0)

  const isEditMode = pathName.startsWith('/admin/branches/edit')
  const isCreateMode = pathName === '/admin/branches/create'

  useEffect(() => {
    const fetchBranch = async () => {
      if ( id ) {
        try {
          const fetchedBranch = await fetchData({ url: `/branches/${ id }`, token })
          setBranch( fetchedBranch )
        } catch (error) {
          toast.error('Error al obtener la sucursal')
        } finally {
        }
      }
    }
    fetchBranch()
  }, [ id, token ])

  const initialValues: FormValues = {
    name: branch ? branch.name : '',
    phoneNumber: branch ? branch.phoneNumber : '',
    address: branch ? branch.address : '',
    floors: branch?.floors ?? []
  }

  const handleSubmit = async ( values: FormValues, actions: FormikHelpers<FormValues> ) => {
    const branchValues = {
      ...values,
      image: deleteImage ? null : ( newImage || branch?.image || null ),
    }
    { branch
      ? await editBranch( branch.id, branchValues, token ? token : '' )
      : await addBranch( branchValues, token ? token : '' )
    }
    actions.setSubmitting( false )
    toggleUpdateTrigger()
    closeModalPage(true)
    toast.success( branch ? 'Sucursal Actualizada!' : 'Sucursal Creada!')
  }

  useEffect(() => {
    if ( !activeModalPage ) {
      setBranch( null )
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
      !branch && isEditMode
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
