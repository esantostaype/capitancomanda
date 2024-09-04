import { create } from 'zustand'
import { Restaurant } from '@/interfaces'

interface GlobalState {
  updateTrigger: boolean
  toggleUpdateTrigger: () => void
}

interface RestaurantState {
  restaurant: Restaurant | null;
  setRestaurant: (restaurant: Restaurant) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  updateTrigger: false,
  toggleUpdateTrigger: () => set((state) => ({ updateTrigger: !state.updateTrigger }))
}))

export const useRestaurantStore = create<RestaurantState>((set) => ({
  restaurant: null,
  setRestaurant: (restaurant: Restaurant) => set({ restaurant })
}))