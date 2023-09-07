import { api } from '../../api'
import getProfile from './getProfile'


export const profileApi = api.injectEndpoints({
    endpoints: build => ({
        getProfile: getProfile(build)
    }),
    overrideExisting: true,
})

export const { useLazyGetProfileQuery } = profileApi