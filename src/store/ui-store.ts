import { create } from 'zustand'

interface UiStore {
  openModal: () => void
  openModalById: (id: string) => void
  activeModal: boolean
  activeModalId: string | null
  activeClassModal: boolean
  openModalPage: () => void
  activeModalPage: boolean
  activeClassModalPage: boolean
  openPopover: () => void
  activePopover: boolean
  activeClassPopover: boolean
  closeModal: (withBackRoute?: boolean) => void
  closeModalPage: (withBackRoute?: boolean) => void
  closePopover: () => void
}

const useUiStore = create<UiStore>((set) => ({
  activeModal: false,
  activeModalId: null,
  activeClassModal: false,
  activeModalPage: false,
  activeClassModalPage: false,
  activePopover: false,
  activeClassPopover: false,
  openModal: () => {
    set({ activeModal: true, activeClassModal: true })
  },
  openModalById: (id: string) => {
    set({ activeModal: true, activeModalId: id, activeClassModal: true })
  },
  openModalPage: () => {
    set({ activeModalPage: true, activeClassModalPage: true })
  },
  openPopover: () => {
    set({ activePopover: true, activeClassPopover: true })
  },
  closeModal: (withBackRoute?: boolean) => {
    set({ activeClassModal: false })
    setTimeout(() => {
      set({ activeModal: false, activeModalId: null })
      if (withBackRoute) {
        window.history.back()
      }
    }, 300)
  },
  closeModalPage: (withBackRoute?: boolean) => {
    set({ activeClassModalPage: false })
    setTimeout(() => {
      set({ activeModalPage: false })
      if (withBackRoute) {
        window.history.back()
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

export { useUiStore }