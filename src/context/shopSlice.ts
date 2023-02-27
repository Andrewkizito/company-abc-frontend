/* eslint-disable @typescript-eslint/no-unused-vars */
// Importing helper modules
import { createSlice, type PayloadAction, type Slice } from '@reduxjs/toolkit'

export interface ShopItem {
  _id?: string;
  productName: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  unit: string;
  stock: number;
}

export interface CartItem {
  productName: string;
  quantity: number;
  price: number;
  unit: string;
}

export interface ShopState {
  cart: CartItem[];
  shop_items: ShopItem[];
}

const initialState: ShopState = {
  cart: [],
  shop_items: [],
}

// Clear cart cache in localstorage function
const clearCache = (): void => {
  localStorage.removeItem('cart')
}

// Create cart cache in localstorage function
const createCache = (data: CartItem[]): void => {
  localStorage.setItem('cart', JSON.stringify(data))
}

// Update cart function
const updateCart = (state: ShopState, newCart: CartItem[]): void => {
  // Update cart state
  state.cart = newCart
  // Caching new cart in localstorage
  createCache(newCart)
}

const ShopSlice: Slice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    increaseItemQuantity: (
      state: ShopState,
      action: PayloadAction<{ productName: string; quantity: number }>
    ) => {
      // looping though current cart and returning a new cart if possible
      const newCart: CartItem[] = [...state.cart].map((item) => {
        // Finding matching item
        if (item.productName === action.payload.productName) {
          // Available stock
          const stockAvailable: number = state.shop_items.filter(
            (item) => item.productName === action.payload.productName
          )[0].stock

          // Calculating new quantity
          const newQuantity: number = item.quantity + action.payload.quantity

          // Calculating average price
          const averagePrice: number = item.price / item.quantity

          /* If the available stock is greate or equal to 
            current stock, then go ahead and update the item's quantity */
          if (stockAvailable >= newQuantity) {
            return {
              ...item,
              quantity: newQuantity,
              price: item.price + averagePrice,
            }
          } else {
            return item
          }
        } else return item
      })
      updateCart(state, newCart)
    },
    reduceItemQuantity: (
      state: ShopState,
      action: PayloadAction<{ productName: string; quantity: number }>
    ) => {
      const targetItem: CartItem | undefined = state.cart.filter(
        (item) => item.productName === action.payload.productName
      )[0]

      const isItemAvailable = Boolean(targetItem)
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
              price: item.price - averagePrice,
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

      // Searching if product exists in current cart
      const isAlreadInCart: boolean = currentCartItems.includes(
        action.payload.productName
      )

      // Available stock
      const stockAvailable: number = state.shop_items.filter(
        (item) => item.productName === action.payload.productName
      )[0].stock

      // Checking if product is not already in cart
      if (!isAlreadInCart) {
        // Add item to current cart
        const newCart: CartItem[] = [...state.cart]

        // Checking if stock is greater than 0
        if (stockAvailable > 0) {
          newCart.push(action.payload)
        } else {
          window.alert('Not enough stock left')
        }
        updateCart(state, newCart)
      } else {
        // Loop through current cart
        const newCart: CartItem[] = state.cart.map((item) => {
          if (item.productName !== action.payload.productName) return item
          else {
            // Find the current product and update its quantity
            const newQuantity: number = item.quantity + action.payload.quantity
            // Checking stock
            if (stockAvailable >= newQuantity) {
              return {
                ...item,
                price: item.price + action.payload.price,
                quantity: item.quantity + action.payload.quantity,
              }
            } else {
              window.alert('Not enough stock left')
              return item
            }
          }
        })
        updateCart(state, newCart)
      }
    },
    removeItemFromCart: (state: ShopState, action: PayloadAction<string>) => {
      // Getting all products in cart
      const currentCartItems = [...state.cart]

      // Looping through current cart, deleting matching item, and return new cart value
      const newCart: CartItem[] =
        currentCartItems.length === 1
          ? []
          : currentCartItems.filter(
              (item) => item.productName === action.payload
            )
      updateCart(state, newCart)
    },
    clearCart: (state: ShopState, action) => {
      // Clearing cart in both state and memory
      state.cart = []
      clearCache()
    },
    initCart: (state: ShopState, action) => {
      // Getting cart cached in localstorage
      const cart: string | null = localStorage.getItem('cart')

      // Validating it a cache exists
      const cartValidity = Boolean(cart)

      if (cartValidity) {
        // Checking type of cache
        if (typeof cart === 'string') {
          // Updating cart with cache
          const parsedCart = JSON.parse(cart)
          state.cart = parsedCart
        }
      }
    },
    initShop: (state: ShopState, action: PayloadAction<ShopItem[]>) => {
      // Update shop items
      state.shop_items = action.payload
    },
  },
})

export const {
  initShop,
  initCart,
  clearCart,
  addItemToCart,
  removeItemFromCart,
  reduceItemQuantity,
  increaseItemQuantity,
} = ShopSlice.actions

export default ShopSlice.reducer
