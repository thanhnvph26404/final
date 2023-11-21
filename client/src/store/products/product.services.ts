import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { IProductVariant } from '../productVariant/productVariant.interface'
import { Iproductdata } from './product.interface'

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
        addProduct: builder.mutation<Iproductdata[], Iproductdata>({
            query: (product) => ({
                url: ``,
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['product']
        }),
        editProduct: builder.mutation<Iproductdata[], Iproductdata>({
            query: (product) => ({
                url: `/${product._id}`,
                method: 'PUT',
                body: product
            }),
            invalidatesTags: ['product']
        }),
        deleteProduct: builder.mutation<Iproductdata[], string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['product'],
        }),
        // ProductVariant: builder.query<IProductVariant[], void>( {
        //     query: () => ( {
        //         url: `http://localhost:8080/productvariant`,
        //         providesTags: [ 'product' ],
        //     } ),
        // } ),


        sortByProduct: builder.query({
            query: () => ({
                url: 'http://localhost:8080/products',
                method: 'GET',
                provideTags: ['product'],
                params: {
                    sort: 'price'
                }

            })
        })
    })

})

export const { useAddProductMutation, useDeleteProductMutation, useEditProductMutation, useGetProductQuery, useGetProductsQuery, useSortByProductQuery } = productApi



