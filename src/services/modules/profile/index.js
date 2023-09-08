import { api } from '../../api'
import getProfile from './getProfile'
import updateProfile from './updateProfile'

export const profileApi = api.injectEndpoints({
    endpoints: build => ({
        getProfile: getProfile(build),
        updateProfile: updateProfile(build)
    }),
    overrideExisting: true,
})

export const {
    useLazyGetProfileQuery,
    useLazyUpdateProfileQuery
} = profileApi