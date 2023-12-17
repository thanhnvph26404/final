import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi( {
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://localhost:8080/order'
    } ),
    tagTypes: [ 'Order' ],
    endpoints: ( builder ) => ( {

        totalOrderaday: builder.mutation( {
            query: ( { startDate, endDate } ) => 
            {
                const body = { startDate, endDate }
                return {
                    url: `totalOrderaday`,
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: [ 'Order' ]
        } ),
        totalOrderamonth: builder.mutation( {
            query: ( { startYear, endYear } ) => 
            {
                const body = { startYear, endYear }
                return {
                    url: `totalOrderamonth`,
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: [ 'Order' ]
        } ),
        totalproductamonth: builder.mutation( {
            query: ( { startYear, endYear } ) => 
            {
                const body = { startYear, endYear }
                return {
                    url: `productsmonthSold`,
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: [ 'Order' ]
        } ),
        totalProductaday: builder.mutation( {
            query: ( { startDate, endDate } ) => 
            {
                const body = { startDate, endDate }
                return {
                    url: `productsSold`,
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: [ 'Order' ]
        } ),
        totaladay: builder.query( {
            query: () => 
            {
                return {
                    url: `totalOrderaday`,
                    method: 'GET',
                }
            },
            providesTags: [ 'Order' ]
        } ),
        productsoldaday: builder.query( {
            query: () => 
            {
                return {
                    url: `productOrderaday`,
                    method: 'GET',
                }
            },
            providesTags: [ 'Order' ]
        } ),

    } )

} )

export const { useTotalOrderadayMutation, useProductsoldadayQuery, useTotaladayQuery, useTotalProductadayMutation, useTotalproductamonthMutation, useTotalOrderamonthMutation } = orderApi