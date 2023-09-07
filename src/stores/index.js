import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import { api } from '../services/api'
import authReducer from '../services/auth/authSlice'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
    api: api.reducer,
    auth: authReducer
})

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(api.middleware)

        return middlewares
    },
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }