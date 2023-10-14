import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IUser, Login, Signup } from "./Auth.interface"
const authApi = createApi( {
    reducerPath: "auth",
    tagTypes: [ "Auth" ],
    baseQuery: fetchBaseQuery( {
        baseUrl: "http://localhost:8080",
    } ),
    endpoints: ( builder ) => ( {
        signup: builder.mutation<Signup, Signup>( {
            query: ( auth ) => ( {
                url: `auth/register`,
                method: "POST",
                body: auth
            } ), invalidatesTags: [ "Auth" ]
        } ),
        login: builder.mutation<Login, Login>( {
            query: ( auth ) => ( {
                url: `auth/login`,
                method: "POST",
                body: auth
            } ),
            invalidatesTags: [ "Auth" ]
        } ),
        getUserList: builder.query( {
            query: () => `auth/getAllUser`,
            providesTags: [ 'Auth' ]
        } ),
        deleteUser: builder.mutation<IUser[], string>( {
            query: ( id ) => ( {
                url: `/auth/removeUser/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'Auth' ],
        } ),
        forgotPasswordAuth: builder.mutation( {
            query: ( data: { email: string } ) => ( {
                url: `/password/forgot-password`,
                method: "POST",
                body: data,
            } ),
        } ),
        resetPasswordAuth: builder.mutation( {
            query: ( data: {
                password: string;
                randomCode: string;
                randomString: string | undefined;
            } ) =>
            {
                const forgotToken = localStorage.getItem( "forgotToken" );

                return {
                    url: `/password/reset-password`,
                    method: "POST",
                    body: data,
                    headers: {
                        Authorization: "Bearer " + forgotToken,
                    },
                };
            },
        } ),
    } )
} )
export const {
    useLoginMutation, useSignupMutation, useResetPasswordAuthMutation, useForgotPasswordAuthMutation, useGetUserListQuery, useDeleteUserMutation
} = authApi
export const authReducer = authApi.reducer
export default authApi