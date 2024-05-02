import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

interface Store {
  order: OrderItem[]
  addToOrder: ( product: Product ) => void
  increaseQuantity: ( id: Product['id'], spicyLevelNumber: number ) => void
  decreaseQuantity: ( id: Product['id'], spicyLevelNumber: number ) => void
  removeItem: ( id: Product['id'], spicyLevelNumber: number ) => void
  clearOrder: () => void
  setOrder: ( newOrder: OrderItem[] ) => void
  delivery: boolean
}

const useStore = create<Store>(( set, get ) => {

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
        ( item ) => item.id === product.id && item.spicyLevelNumber === ( product.spicyLevelNumber ?? 0 )
      )

      if ( existingItem ) {
        set(( state ) => ({
          order: state.order.map(( item ) =>
            item.id === product.id && item.spicyLevelNumber === ( product.spicyLevelNumber ?? 0 )
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  subtotal: item.price * ( item.quantity + 1 )
                }
              : item
          )
        }))
      } else {
        const spicyLevel = product.spicyLevel ?? false

        set(( state ) => ({
          order: [
            ...state.order,
            {
              ...product,
              quantity: 1,
              subtotal: product.price * 1,
              spicyLevel: spicyLevel,
              spicyLevelNumber: spicyLevel ? ( product.spicyLevelNumber ?? 0) : 0
            }
          ]
        }))
      }

      updateLocalStorage( get().order )
    },

    increaseQuantity: ( id, spicyLevelNumber ) => {
      set(( state ) => ({
        order: state.order.map(( item ) =>
          item.id === id && item.spicyLevelNumber === spicyLevelNumber
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

    decreaseQuantity: (id, spicyLevelNumber ) => {
      set(( state ) => ({
        order: state.order.map(( item ) =>
          item.id === id && item.spicyLevelNumber === spicyLevelNumber
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

    removeItem: ( id, spicyLevelNumber ) => {
      set(( state ) => ({
        order: state.order.filter(( item ) => !(item.id === id && item.spicyLevelNumber === spicyLevelNumber ))
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

export { useStore }
