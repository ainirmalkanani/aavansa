'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Product, WishlistItem } from '@/types'

interface WishlistState {
  items: WishlistItem[]
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'LOAD'; payload: WishlistItem[] }

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.find((i) => i.product.id === action.payload.id)) return state
      return { items: [...state.items, { product: action.payload, addedAt: new Date().toISOString() }] }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.product.id !== action.payload) }
    case 'LOAD':
      return { items: action.payload }
    default:
      return state
  }
}

interface WishlistContextValue extends WishlistState {
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  toggleWishlist: (product: Product) => void
  isWishlisted: (productId: string) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] })

  useEffect(() => {
    const saved = localStorage.getItem('aavansa-wishlist')
    if (saved) {
      try { dispatch({ type: 'LOAD', payload: JSON.parse(saved) }) } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('aavansa-wishlist', JSON.stringify(state.items))
  }, [state.items])

  return (
    <WishlistContext.Provider
      value={{
        ...state,
        addToWishlist: (p) => dispatch({ type: 'ADD_ITEM', payload: p }),
        removeFromWishlist: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
        toggleWishlist: (p) => {
          if (state.items.find((i) => i.product.id === p.id)) {
            dispatch({ type: 'REMOVE_ITEM', payload: p.id })
          } else {
            dispatch({ type: 'ADD_ITEM', payload: p })
          }
        },
        isWishlisted: (id) => !!state.items.find((i) => i.product.id === id),
        count: state.items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
