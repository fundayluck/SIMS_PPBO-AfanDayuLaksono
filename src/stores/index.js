import { configureStore } from "@reduxjs/toolkit"
import { api } from '../services/api'

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: null
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware),
})

export { store }