import { api } from '../../api'
import authLogin from './authLogin'

export const authApi = api.injectEndpoints({
    endpoints: build => ({
        authLogin: authLogin(build)
    }),
    overrideExisting: false,
})

export const { useLazyAuthLoginQuery } = authApi