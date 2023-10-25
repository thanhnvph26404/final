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
        blockUser: builder.mutation<IUser[], string>( {
            query ( id )
            {
                // Lấy token từ localStorage
                const token = localStorage.getItem( "token" );
                return {
                    url: `/auth/block-user/${ id }`,
                    method: 'PUT',
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                };
            },
            invalidatesTags: [ 'Auth' ],
        } ),

        unblockUser: builder.mutation<IUser[], string>( {
            query ( id )
            {
                // Lấy token từ localStorage
                const token = localStorage.getItem( "token" );
                return {
                    url: `/auth/unblock-user/${ id }`,
                    method: 'PUT',
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                };
            },
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
        changePasswordAuth: builder.mutation( {
            query: ( data: {
                oldPassword: string;
                password: string;
                confirmPassword: string;
            } ) =>
            {
                const checkToken = localStorage.getItem( "tokenChange" );

                return {
                    url: `/password/change-pass`,
                    method: "POST",
                    body: data,
                    headers: {
                        Authorization: "Bearer " + checkToken,
                    },
                };
            },
        } ),
        sendCodeAuth: builder.mutation( {
            query: ( data: { email: string | undefined } ) =>
            {
                const token = localStorage.getItem( "token" )

                return {

                    url: 'password/send-code',
                    method: 'POST',
                    body: data, // Chuyển đối tượng data thành chuỗi JSON
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            },
            invalidatesTags: [ 'Auth' ],

        }
        ),

        checkCodeAuth: builder.mutation( {
            query: ( data: { code: string } ) =>
            {
                const checkToken = localStorage.getItem( "tokenChange" );

                return {
                    url: `password/check-code`,
                    method: "POST",
                    body: data,
                    headers: {
                        Authorization: "Bearer " + checkToken,
                    },
                };
            },
        } ),
        getUserByToken: builder.mutation( {
            query: ( token: string | null ) => ( {
                url: `auth/get-user-token`,
                method: "POST",

                headers: {
                    Authorization: "Bearer " + token,
                },
            } ),
            invalidatesTags: [ "Auth" ],
        } ),
        editUserByToken: builder.mutation( {
            query: ( data: { address: string | null } ) =>
            {
                const token = localStorage.getItem( "token" )

                return {
                    url: `auth/saveaddress`,
                    method: "PUT",
                    body: data,
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            },
            invalidatesTags: [ "Auth" ],
        } ),
        editUser: builder.mutation( {
            query: ( data: { name: string | null, phone: string | null, email: string | null } ) =>
            {
                // Lấy token từ localStorage
                const token = localStorage.getItem( "token" );
                return {
                    url: `/auth/updateUser`,
                    method: 'PUT',
                    body: data,
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                };
            },
            invalidatesTags: [ 'Auth' ],
        } ),
    } )
} )
export const {
    useLoginMutation, useEditUserMutation, useSignupMutation, useUnblockUserMutation, useGetUserByTokenMutation, useChangePasswordAuthMutation, useResetPasswordAuthMutation, useForgotPasswordAuthMutation, useGetUserListQuery, useBlockUserMutation, useSendCodeAuthMutation, useCheckCodeAuthMutation, useEditUserByTokenMutation
} = authApi
export const authReducer = authApi.reducer
export default authApi