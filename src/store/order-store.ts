import { create } from 'zustand'
import { OrderItem, Product, SelectedVariants, SelectedAdditionals, OrderItemFull } from '@/interfaces'

interface Store {
  order: OrderItemFull[]
  addToOrder: (
    product: OrderItemFull,
    quantity: number,
    selectedVariants: SelectedVariants,
    selectedAdditionals: SelectedAdditionals,
    notes: string,
    uniqueId: string
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
    addToOrder: ( product, quantity, selectedVariants, selectedAdditionals, notes, uniqueId ) => {
      const existingItem = get().order.find(
        (item) => item.id === product.id && 
          item.uniqueId === uniqueId
      )

      const finalUniqueId = uniqueId || product.id
    
      if (existingItem) {
        set((state) => ({
          order: state.order.map((item) =>
            (item.id === product.id && item.uniqueId === finalUniqueId)
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  subtotal: item.price * (quantity + item.quantity),
                  selectedVariants: item.selectedVariant,
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
              selectedVariants,
              selectedAdditionals,
              uniqueId: finalUniqueId,
              notes
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
    }
  }
})