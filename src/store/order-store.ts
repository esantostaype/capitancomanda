import { create } from 'zustand'
import { Product, OrderItemFull } from '@/interfaces'
import { findLastOrder as fetchLastOrder } from '@/actions/order-actions'

interface Store {
  order: OrderItemFull[]
  addToOrder: (
    product: OrderItemFull,
    quantity: number,
  ) => void
  increaseQuantity: (
    id: Product['id'],
    uniqueId: string
  ) => void
  decreaseQuantity: (
    id: Product['id'],
    uniqueId: string
  ) => void
  removeItem: ( uniqueId: string ) => void
  clearOrder: () => void
  setOrder: ( newOrder: OrderItemFull[] ) => void
  findLastOrder: () => Promise<string>
  delivery: boolean
}

export const useOrderStore = create<Store>(( set, get ) => {

  const updateLocalStorage = ( order: OrderItemFull[] ) => {
    if ( typeof window !== 'undefined' && window.localStorage ) {
      localStorage.setItem('order', JSON.stringify( order ))
    }
  }

  return {
    order: [],
    delivery: false,
    addToOrder: ( product, quantity) => {
      const existingItem = get().order.find(
        (item) => item.id === product.id && 
          item.uniqueId === product.uniqueId
      )

      const finalUniqueId = product.uniqueId || product.id
    
      if (existingItem) {
        set((state) => ({
          order: state.order.map((item) =>
            (item.id === product.id && item.uniqueId === finalUniqueId)
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  subtotal: item.price * (quantity + item.quantity),
                  selectedVariations: item.selectedVariations,
                  selectedAdditionals: item.selectedAdditionals,
                  notes: item.notes
                }
              : item
          ),
        }));
      } else {
        set((state) => ({
          order: [
            ...state.order,
            {
              ...product,
              quantity,
              subtotal: product.price * quantity,
              selectedVariations: product.selectedVariations,
              selectedAdditionals: product.selectedAdditionals,
              uniqueId: finalUniqueId,
              notes: product.notes
            },
          ],
        }));
      }
    
      updateLocalStorage(get().order);
    },

    increaseQuantity: ( id, uniqueId ) => {
      set((state) => ({
        order: state.order.map((item) =>
          item.id === id && item.uniqueId === uniqueId
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1),
              }
            : item
        ),
      }));
      updateLocalStorage(get().order);
    },
    
    decreaseQuantity: ( id, uniqueId ) => {
    
      set((state) => ({
        order: state.order
          .map((item) =>
            item.id === id && item.uniqueId === uniqueId
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  subtotal: item.price * (item.quantity - 1),
                }
              : item
          )
          .filter((item) => item.quantity > 0),
      }));
      updateLocalStorage(get().order);
    },
    
    removeItem: ( uniqueId ) => {
      set(( state ) => ({
        order: state.order.filter(( item ) => !( item.uniqueId === uniqueId ))
      }))

      updateLocalStorage( get().order )
    },

    clearOrder: () => {
      set(() => ({
        order: [],
        delivery: false
      }))
      updateLocalStorage([])
    },
    
    setOrder: ( newOrder ) => {
      set({ order: newOrder })
    },

    findLastOrder: async () => {
      try {
        const result = await fetchLastOrder()
        const newOrderNumber = result.orderNumber 
          ? (parseInt(result.orderNumber) + 1).toString().padStart(5, '0') 
          : '00001'
        return newOrderNumber
      } catch (error) {
        console.error('Error al obtener la última órden:', error)
        throw error
      }
    }
  }
})