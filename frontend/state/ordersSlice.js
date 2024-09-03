import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    size: 'All',
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers:{
        setSize(state, action){
            state.size = action.payload
        }   
    }
})

export const {
    setSize
} = ordersSlice.actions

export default ordersSlice.reducer