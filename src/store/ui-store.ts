import { create } from 'zustand'

interface UiStore {
  openModal: () => void
  openModalById: (id: string) => void
  activeModal: boolean
  activeModalById: boolean
  activeClassModal: boolean
  activeModalId: string | null
  closeModal: (withBackRoute?: boolean) => void
  
  openModalConfirm: ( id: string ) => void
  activeModalConfirm: boolean
  activeClassModalConfirm: boolean
  activeModalConfirmId: string | null
  closeModalConfirm: () => void

  openModalPage: () => void
  activeModalPage: boolean
  activeClassModalPage: boolean
  closeModalPage: (withBackRoute?: boolean) => void

  openPopover: () => void
  activePopover: boolean
  activeClassPopover: boolean
  closePopover: () => void
  
}

export const useUiStore = create<UiStore>((set) => ({
  activeModal: false,
  activeClassModal: false,
  activeModalId: null,
  activeModalById: false,
  activeModalConfirm: false,
  activeClassModalConfirm: false,
  activeModalConfirmId: null,
  activeModalPage: false,
  activeClassModalPage: false,
  activePopover: false,
  activeClassPopover: false,
  openModal: () => {
    set({ activeModal: true, activeClassModal: true })
  },
  openModalById: (id: string) => {
    set({ activeModalById: true, activeModalId: id, activeClassModal: true })
  },
  openModalConfirm: (id: string) => {
    set({ activeModalConfirm: true, activeModalConfirmId: id, activeClassModalConfirm: true })
  },
  openModalPage: () => {
    set({ activeModalPage: true, activeClassModalPage: true })
  },
  openPopover: () => {
    set({ activePopover: true, activeClassPopover: true })
  },
  closeModal: ( withBackRoute?: boolean ) => {
    set({ activeClassModal: false })
    setTimeout(() => {
      set({ activeModal: false, activeModalId: null })
      if ( withBackRoute ) {
        history.back()
      }
    }, 300)
  },
  closeModalConfirm: () => {
    set({ activeClassModalConfirm: false })
    setTimeout(() => {
      set({ activeModalConfirm: false })
    }, 300)
  },
  closeModalPage: ( withBackRoute?: boolean ) => {
    set({ activeClassModalPage: false })
    setTimeout(() => {
      set({ activeModalPage: false })
      if (withBackRoute) {
        history.back()
      }
    }, 300)
  },
  closePopover: () => {
    set({ activeClassPopover: false })
    setTimeout(() => {
      set({ activePopover: false })
    }, 300)
  }
}))