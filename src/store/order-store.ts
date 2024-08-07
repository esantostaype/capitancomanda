import { create } from 'zustand'
import { OrderItem, Product } from '../interfaces'

interface Store {
  order: OrderItem[]
  addToOrder: ( product: Product ) => void
  increaseQuantity: ( id: Product['id'] ) => void
  decreaseQuantity: ( id: Product['id'] ) => void
  removeItem: ( id: Product['id'] ) => void
  clearOrder: () => void
  setOrder: ( newOrder: OrderItem[] ) => void
  delivery: boolean
}

export const useOrderStore = create<Store>(( set, get ) => {

  const updateLocalStorage = ( order: OrderItem[] ) => {
    if ( typeof window !== 'undefined' && window.localStorage ) {
      localStorage.setItem('order', JSON.stringify( order ))
    }
  }

  return {
    order: [],
    delivery: false,
    addToOrder: ( product ) => {
      const existingItem = get().order.find(
        ( item ) => item.id === product.id
      )

      if ( existingItem ) {
        set(( state ) => ({
          order: state.order.map(( item ) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  subtotal: item.price * ( item.quantity + 1 )
                }
              : item
          )
        }))
      } else {
        set(( state ) => ({
          order: [
            ...state.order,
            {
              ...product,
              quantity: 1,
              subtotal: product.price * 1
            }
          ]
        }))
      }

      updateLocalStorage( get().order )
    },

    increaseQuantity: ( id ) => {
      set(( state ) => ({
        order: state.order.map(( item ) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * ( item.quantity + 1 )
              }
            : item
        ),
      }))

      updateLocalStorage( get().order )
    },

    decreaseQuantity: (id ) => {
      set(( state ) => ({
        order: state.order.map(( item ) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: item.price * ( item.quantity - 1 )
              }
            : item
        ),
      }))

      updateLocalStorage(get().order )
    },

    removeItem: ( id ) => {
      set(( state ) => ({
        order: state.order.filter(( item ) => !(item.id === id ))
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