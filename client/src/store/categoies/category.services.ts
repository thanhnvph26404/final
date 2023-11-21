import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICategory } from './category.interface'

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/category'
    }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCategoryList: builder.query({
            query: () => ``,
            providesTags: ['Category']
        }),
        getCategory: builder.query({
            query: (id: string) => ({
                url: `/${id}`,
                method: 'GET',
            }),
            providesTags: ['Category']
        }),
        addCategory: builder.mutation<ICategory[], ICategory>({
            query: (category) => ({
                url: ``,
                method: 'POST',
                body: category
            }),
            invalidatesTags: ['Category']
        }),
        editCategory: builder.mutation<ICategory[], ICategory>({
            query: (category) => ({
                url: `/${category._id}`,
                method: 'PATCH',
                body: category
            }),
            invalidatesTags: ['Category']
        }),
        deleteCategory: builder.mutation<ICategory[], string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        })
    })

})

export const { useAddCategoryMutation, useGetCategoryListQuery, useDeleteCategoryMutation, useEditCategoryMutation, useGetCategoryQuery } = categoryApi