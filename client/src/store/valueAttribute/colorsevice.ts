import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Color } from '../productVariant/productVariant.interface'

export const colorApi = createApi({
    reducerPath: 'colorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8081/color'
    }),
    tagTypes: ['Color'],
    endpoints: (builder) => ({
        getcolorList: builder.query({
            query: () => ``,
            providesTags: ['Color']
        }),
        getColor: builder.query({
            query: (id: string) => ({
                url: `/${id}`,
                method: 'GET',
            }),
            providesTags: ['Color']
        }),
        editColor: builder.mutation<Color, Color>({
            query: (color) => ({
                url: `/${color._id}`,
                method: 'PUT',
                body: color
            }),
            invalidatesTags: ['Color']
        }),
        addcolor: builder.mutation<Color[], Color>({
            query: (Color) => ({
                url: ``,
                method: 'POST',
                body: Color
            }),
            invalidatesTags: ['Color']
        }),
        deleteColor: builder.mutation<Color[], string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Color'],
        })




    }),


})

export const { useGetcolorListQuery, useGetColorQuery, useAddcolorMutation, useDeleteColorMutation, useEditColorMutation } = colorApi