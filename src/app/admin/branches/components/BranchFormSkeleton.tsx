'use client'
import { Button, ModalBody, ModalFooter } from '@/components'
import { Color, Size, Variant } from '@/interfaces'
import { Skeleton } from '@mui/material'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

export const BranchFormSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto -mt-10 pb-10">
      <ModalBody withTabs>
      <Tabs className="flex flex-col flex-1">
        <TabList className={`disabled border-b border-b-gray50 bg-surface sticky top-0 mb-10 z-[999] flex gap-6 h-10 text-base font-500 leading-none text-gray500`}>
          <Tab>Información</Tab>
          <Tab>Ambientes y Mesas</Tab>
        </TabList>
        <TabPanel>
        <div className="grid grid-cols-7 gap-6">
          <div className="col-span-2">
          <Skeleton animation="wave" variant="rounded" height={234} className="bg-gray50" />
          </div>
          <div className="col-span-5">
            <div className="grid grid-cols-8 gap-6">
              <div className="col-span-4">
                <Skeleton animation="wave" variant="rounded" height={ 47 } className="bg-gray50" />
              </div>
              <div className="col-span-4">
                <Skeleton animation="wave" variant="rounded" height={ 47 } className="bg-gray50" />
              </div>
              <div className="col-span-8">
                <Skeleton animation="wave" variant="rounded" height={ 120 } className="bg-gray50" />
              </div>
            </div>
          </div>
        </div>
        </TabPanel>
      </Tabs>
      </ModalBody>
      <ModalFooter withTabs>
        <Button text="Cancelar" variant={ Variant.CONTAINED } size={ Size.LG } disabled/>
        <Button color={ Color.ACCENT } variant={ Variant.CONTAINED } text="Guardar Sucursal" size={ Size.LG } disabled/>
      </ModalFooter>
    </div>
  )
}