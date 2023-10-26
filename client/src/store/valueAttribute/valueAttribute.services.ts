import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IValueAttribute } from './valueAttribute.interface'

export const valueAttributeApi = createApi({
    reducerPath: 'valueAttributeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/valueattribute'
    }),
    tagTypes: ['valueattribute'],
    endpoints: (builder) => ({
        getvalueattributes: builder.query({
            query: () => ``,
            providesTags: ['valueattribute']
        }),
        getSizes: builder.query({
            query: () => ({
                url: `/byidatribute/65311f7434441c10b2810467`,
                method: 'GET',
            }),
            providesTags: ['valueattribute']
        }),
        getColors: builder.query({
            query: () => ({
                url: `/byidatribute/65311f8034441c10b2810469`,
                method: 'GET',
            }),
            providesTags: ['valueattribute']
        }),
        getvalueattribute: builder.query({
            query: (id: string) => ({
                url: `/${id}`,
                method: 'GET',
            }),
            providesTags: ['valueattribute']
        }),

        addvalueattribute: builder.mutation<IValueAttribute[], IValueAttribute>({
            query: (valueattribute) => ({
                url: ``,
                method: 'POST',
                body: valueattribute
            }),
            invalidatesTags: ['valueattribute']
        }),
        editvalueattribute: builder.mutation<IValueAttribute[], IValueAttribute>({
            query: (valueattribute) => ({
                url: `/${valueattribute._id}`,
                method: 'PATCH',
                body: valueattribute
            }),
            invalidatesTags: ['valueattribute']
        }),
        deletevalueattribute: builder.mutation<IValueAttribute[], string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['valueattribute'],
        })
    })

})

export const { useAddvalueattributeMutation,
    useDeletevalueattributeMutation,
    useEditvalueattributeMutation,
    useGetvalueattributeQuery, useGetvalueattributesQuery,
    useGetColorsQuery, useGetSizesQuery } = valueAttributeApi