import React from "react"
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'

import { Provider } from "react-redux"
import { BrowserRouter } from 'react-router-dom'
import { store } from "./stores"

const el = document.getElementById('root')
const root = createRoot(el)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)