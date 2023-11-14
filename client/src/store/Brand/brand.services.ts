import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Brand } from './brand.interface'

export const brandApi = createApi( {
    reducerPath: 'brandApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://localhost:8080/brand'
    } ),
    tagTypes: [ 'Brand' ],
    endpoints: ( builder ) => ( {
        getBrandList: builder.query( {
            query: () => ``,
            providesTags: [ 'Brand' ]
        } ),
        getBrand: builder.query( {
            query: ( id: string ) => ( {
                url: `/${ id }`,
                method: 'GET',
            } ),
            providesTags: [ 'Brand' ]
        } ),
        addBrand: builder.mutation<Brand[], Brand>( {
            query: ( brand ) => ( {
                url: ``,
                method: 'POST',
                body: brand
            } ),
            invalidatesTags: [ 'Brand' ]
        } ),
        editBrand: builder.mutation<Brand[], Brand>( {
            query: ( brand ) => ( {
                url: `/${ brand._id }`,
                method: 'PATCH',
                body: brand
            } ),
            invalidatesTags: [ 'Brand' ]
        } ),
        deleteBrand: builder.mutation<Brand[], string>( {
            query: ( id ) => ( {
                url: `/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'Brand' ],
        } )
    } )

} )

export const { useAddBrandMutation, useDeleteBrandMutation, useEditBrandMutation, useGetBrandListQuery, useGetBrandQuery } = brandApi