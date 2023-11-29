import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { IProductVariant } from '../productVariant/productVariant.interface'

export const productDiscountApi = createApi( {
    reducerPath: 'productDiscountApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://localhost:8080/productDiscount'
    } ),
    tagTypes: [ 'productDiscount' ],
    endpoints: ( builder ) => ( {
        getproductDiscountApi: builder.query( {
            query: () => ``,
            providesTags: [ 'productDiscount' ]
        } ),
        getproductDiscountApiSold: builder.query( {
            query: () => ( {
                url: `sold`,
                method: 'GET',
            } ),
            providesTags: [ 'productDiscount' ]
        } ),

    } )

} )

export const { useGetproductDiscountApiQuery, useGetproductDiscountApiSoldQuery } = productDiscountApi



