import { api } from '../../api'
import getProfile from './getProfile'
import updateImage from './updateImage'
import updateProfile from './updateProfile'

export const profileApi = api.injectEndpoints({
    endpoints: build => ({
        getProfile: getProfile(build),
        updateProfile: updateProfile(build),
        updateImage: updateImage(build)
    }),
    overrideExisting: false,
})

export const {
    useLazyGetProfileQuery,
    useLazyUpdateProfileQuery,
    useLazyUpdateImageQuery
} = profileApi