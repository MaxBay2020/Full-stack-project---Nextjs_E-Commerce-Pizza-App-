import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    products: [],
    quantity: 0,
    total: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
            state.quantity ++
            state.total+=action.payload.totalPrice * action.payload.quantity
        },
        reset: (state, action) => {
            state.products=[]
            state.quantity=0
            state.total=0
        }
    }
})

export const {addProduct, reset} =cartSlice.actions
export default cartSlice.reducer
