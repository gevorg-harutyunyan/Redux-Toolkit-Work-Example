import { configureStore } from "@reduxjs/toolkit"
import productsReduser from "./productsSlice"

export const store = configureStore({
  reducer: {
    products: productsReduser,
  },
})
