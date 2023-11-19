import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sizeApi = createApi({
    reducerPath: 'sizeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/size'
    }),
    tagTypes: ['Size'],
    endpoints: (builder) => ({
        getsizeList: builder.query({
            query: () => ``,
            providesTags: ['Size']
        }),





    }),


})

export const { useGetsizeListQuery } = sizeApi