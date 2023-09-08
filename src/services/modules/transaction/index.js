import { api } from '../../api'
import doPayment from './doPayment'
import doTopup from './doTopup'
import getBalance from './getBalance'


export const transactionApi = api.injectEndpoints({
    endpoints: build => ({
        getBalance: getBalance(build),
        doTopup: doTopup(build),
        doPayment: doPayment(build)
    }),
    overrideExisting: true,
})

export const {
    useLazyGetBalanceQuery,
    useLazyDoTopupQuery,
    useLazyDoPaymentQuery
} = transactionApi