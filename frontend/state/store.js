import { configureStore } from '@reduxjs/toolkit'
import { ordersApi } from './ordersApi'
import ordersReducer from './ordersSlice'

/*const exampleReducer = (state = { count: 0 }) => {
  return state
}*/

export const resetStore = () => configureStore({
  reducer: {
    //example: exampleReducer,
    // add your reducer(s) here
    ordersState: ordersReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
    ordersApi.middleware,
  ),
})

export const store = resetStore()
