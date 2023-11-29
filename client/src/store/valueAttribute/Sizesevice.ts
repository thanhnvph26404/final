import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Size } from '../productVariant/productVariant.interface'

export const sizeApi = createApi( {
    reducerPath: 'sizeApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://localhost:8080/size'
    } ),
    tagTypes: [ 'Size' ],
    endpoints: ( builder ) => ( {
        getsizeList: builder.query( {
            query: () => ``,
            providesTags: [ 'Size' ]
        } ),
        getSize: builder.query<Size, any>( {
            query: ( _id: string ) => ( {
                url: `/${ _id }`,
                method: 'GET',
            } ),
            providesTags: [ 'Size' ]
        } ),
        editSize: builder.mutation<Size, Size>( {
            query: ( color ) => ( {
                url: `/${ color._id }`,
                method: 'PUT',
                body: color
            } ),
            invalidatesTags: [ 'Size' ]
        } ),
        addSize: builder.mutation<Size[], Size>( {
            query: ( Color ) => ( {
                url: ``,
                method: 'POST',
                body: Color
            } ),
            invalidatesTags: [ 'Size' ]
        } ),
        deleteSize: builder.mutation<Size[], string>( {
            query: ( id ) => ( {
                url: `/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'Size' ],
        } )
    } ),


} )

export const { useGetsizeListQuery, useAddSizeMutation, useDeleteSizeMutation, useEditSizeMutation, useGetSizeQuery } = sizeApi