import { api } from '../../api'
import registration from './registration'

export const registrationApi = api.injectEndpoints({
    endpoints: build => ({
        registration: registration(build)
    }),
    overrideExisting: true,
})

export const { useLazyRegistrationQuery } = registrationApi