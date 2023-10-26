import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from './product.interface'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/products'
    }),
    tagTypes: ['product'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ``,
            providesTags: ['product']
        }),
        getProduct: builder.query({
            query: (id: string) => ({
                url: `/${id}`,
                method: 'GET',
            }),
            providesTags: ['product']
        }),
        addProduct: builder.mutation<IProduct[], IProduct>({
            query: (product) => ({
                url: ``,
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['product']
        }),
        editProduct: builder.mutation<IProduct[], IProduct>({
            query: (product) => ({
                url: `/${product._id}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['product']
        }),
        deleteProduct: builder.mutation<IProduct[], string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['product'],
        })
    })

})

export const { useAddProductMutation, useDeleteProductMutation, useEditProductMutation, useGetProductQuery, useGetProductsQuery } = productApi