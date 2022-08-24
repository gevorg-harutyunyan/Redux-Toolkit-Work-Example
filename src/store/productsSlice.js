import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getProducts } from "../dataService"
import { byId, sumPrice, discountPrice, addQuantityAndTotal } from "../utils"

const initialState = {
  status: "idle",
  productsList: [],
  summaryPrice: 0,
  discountedSummaryPrice: 0,
  discountPrice: 0,
}

export const initProductsList = createAsyncThunk(
  "initProductsList",
  async () => await getProducts()
)

export const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = state.productsList.find(byId(action.payload.id))
      product.quantity++
      product.totalPrice = sumPrice(product.totalPrice, product.price)
      state.summaryPrice = sumPrice(state.summaryPrice, product.price)
      const [discountedPrice, discount] = discountPrice(state.summaryPrice)
      state.discountedSummaryPrice = discountedPrice
      state.discountPrice = discount
    },
    removeProcuct: (state, action) => {
      const product = state.productsList.find(byId(action.payload.id))
      product.quantity--
      product.totalPrice = sumPrice(product.totalPrice, -product.price)
      state.summaryPrice = sumPrice(state.summaryPrice, -product.price)
      const [discountedPrice, discount] = discountPrice(state.summaryPrice)
      state.discountedSummaryPrice = discountedPrice
      state.discountPrice = discount
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initProductsList.pending, (state) => {
        state.status = "loading"
      })
      .addCase(initProductsList.fulfilled, (state, action) => {
        state.status = "idle"
        action.payload.forEach(addQuantityAndTotal)
        state.productsList = action.payload
      })
  },
})

export const { addProduct, removeProcuct } = products.actions

export const getStatus = (state) => state.products.status
export const getProductsList = (state) => state.products.productsList
export const getsummaryPrice = (state) => state.products.discountedSummaryPrice
export const getdiscountPrice = (state) => state.products.discountPrice

export default products.reducer
