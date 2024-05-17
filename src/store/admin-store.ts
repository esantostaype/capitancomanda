import { Product } from '@/interfaces'
import { fetchData } from '@/utils'
import { create } from 'zustand'

interface AdminStore {
  productIdNumber: number | null
  openModal: boolean
  setProduct: ( productIdNumber: number ) => void
  setOpenModal: ( openModal: boolean ) => void
  product: Product | null
}

const useAdminStore = create<AdminStore>(( set, get ) => ({
  productIdNumber: null,
  openModal: false,
  product: null,
  setProduct: async ( productIdNumber ) => {
    set({ productIdNumber, product: null })
    const product = await fetchData({ url: `/products/${ productIdNumber }` })
    set({ product })
  },
  setOpenModal: ( openModal ) => {
    set({ openModal })
  }
}))

export { useAdminStore }