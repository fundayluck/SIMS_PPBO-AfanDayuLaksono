import { Config } from '../config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut } from './auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: Config.API_URL,
    credentials: 'same-origin',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }

        return headers
    }
})

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // here you can deal with 401 error
        api.dispatch(logOut())
    }
    return result
}

export const api = createApi({
    baseQuery: baseQueryWithInterceptor,
    endpoints: () => ({}),
})