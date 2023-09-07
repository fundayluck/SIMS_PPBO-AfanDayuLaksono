import { api } from '../../api'
import getBanner from './getBanner'
import getServices from './getServices'

export const informationApi = api.injectEndpoints({
    endpoints: build => ({
        getBanner: getBanner(build),
        getServices: getServices(build)
    }),
    overrideExisting: true,
})

export const {
    useLazyGetBannerQuery,
    useLazyGetServicesQuery
} = informationApi