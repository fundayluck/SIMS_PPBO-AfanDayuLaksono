import { api } from '../../api'
import doTopup from './doTopup'
import getBalance from './getBalance'


export const transactionApi = api.injectEndpoints({
    endpoints: build => ({
        getBalance: getBalance(build),
        doTopup: doTopup(build)
    }),
    overrideExisting: true,
})

export const { useLazyGetBalanceQuery, useLazyDoTopupQuery } = transactionApi