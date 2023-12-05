import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: 5,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const cartActions = cartSlice.actions;

export default cartSlice;