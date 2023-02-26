// Importing helper modules
import { createSlice, type PayloadAction, type Slice } from '@reduxjs/toolkit'

export interface ShopItem {
  productName: string
  description: string
  price: number
  rating: number
  image: string
  unit: string
  stock?: number
}

export interface CartItem {
  productName: string
  quantity: number
  price: number
  unit: string
}

export interface ShopState {
  cart: CartItem[]
  shop_items: ShopItem[]
}

const initialState: ShopState = {
  cart: [],
  shop_items: []
}

const clearCache = (): void => { localStorage.removeItem('cart') }
const createCache = (data: CartItem[]): void => { localStorage.setItem('cart', JSON.stringify(data)) }

const ShopSlice: Slice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    increaseItemQuantity: (
      state: ShopState,
      action: PayloadAction<{ productName: string, quantity: number }>
    ) => {
      const newCart: CartItem[] = [...state.cart].map((item) => {
        const averagePrice: number = item.price / item.quantity
        if (item.productName === action.payload.productName) {
          return {
            ...item,
            quantity: item.quantity + action.payload.quantity,
            price: item.price + averagePrice
          }
        } else return item
      })
      state.cart = newCart
      createCache(newCart)
    },
    reduceItemQuantity: (
      state: ShopState,
      action: PayloadAction<{ productName: string, quantity: number }>
    ) => {
      const targetItem: CartItem | undefined = state.cart.filter(
        (item) => item.productName === action.payload.productName
      )[0]

      const isItemAvailable: boolean = Boolean(targetItem)
      if (!isItemAvailable) return
      let newCart: CartItem[]
      if (targetItem.quantity < 2) {
        newCart = [...state.cart].filter(
          (item) => item.productName !== action.payload.productName
        )
      } else {
        newCart = [...state.cart].map((item) => {
          const averagePrice: number = item.price / item.quantity
          if (item.productName === action.payload.productName) {
            return {
              ...item,
              quantity: item.quantity - action.payload.quantity,
              price: item.price - averagePrice
            }
          } else return item
        })
      }
      state.cart = newCart
      createCache(newCart)
    },
    addItemToCart: (state: ShopState, action: PayloadAction<CartItem>) => {
      // Getting all products in cart by name
      const currentCartItems = [...state.cart].map((item) => item.productName)
      // Searching for product in current cart items
      const isAlreadInCart: boolean = currentCartItems.includes(
        action.payload.productName
      )

      // Checking if product is not already in cart
      let newCart: CartItem[]
      if (!isAlreadInCart) {
        newCart = [...state.cart, action.payload]
      } else {
        newCart = state.cart.map((item) => {
          if (item.productName !== action.payload.productName) return item
          else {
            return {
              ...item,
              price: item.price + action.payload.price,
              quantity: item.quantity + action.payload.quantity
            }
          }
        })
      }
      state.cart = newCart
      createCache(newCart)
    },
    removeItemFromCart: (state: ShopState, action: PayloadAction<string>) => {
      // Getting all products in cart
      const currentCartItems = [...state.cart]
      const newCart: CartItem[] =
        currentCartItems.length === 1
          ? []
          : currentCartItems.filter(
            (item) => item.productName === action.payload
          )
      state.cart = newCart
      createCache(newCart)
    },
    clearCart: (state: ShopState, action) => {
      state.cart = []
      clearCache()
    },
    initCart: (state: ShopState, action) => {
      const cart: string | null = localStorage.getItem('cart')
      const cartValidity: boolean = Boolean(cart)
      if (cartValidity) {
        if (typeof cart === 'string') {
          const parsedCart = JSON.parse(cart)
          state.cart = parsedCart
        }
      }
    },
    initShop: (state: ShopState, action: PayloadAction<ShopItem[]>) => {
      state.shop_items = action.payload
    }
  }
})

export const {
  initShop,
  initCart,
  clearCart,
  addItemToCart,
  removeItemFromCart,
  reduceItemQuantity,
  increaseItemQuantity
} = ShopSlice.actions

export default ShopSlice.reducer
