import React from "react"
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'

import { Provider } from "react-redux"
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from "./stores"

const el = document.getElementById('root')
const root = createRoot(el)

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
)