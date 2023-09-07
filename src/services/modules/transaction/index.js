import { api } from '../../api'
import getBalance from './getBalance'


export const transactionApi = api.injectEndpoints({
    endpoints: build => ({
        getBalance: getBalance(build)
    }),
    overrideExisting: true,
})

export const { useLazyGetBalanceQuery } = transactionApi