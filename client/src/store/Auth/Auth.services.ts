import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IOrder, IUser, Login, Signup } from "./Auth.interface"
import { ICartData } from "../Cart/cartInterface";
import { Order, OrderItem } from "../Order/order";

import { IVoucher } from "../voucher/voucher.interface";
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
        addToCart: builder.mutation( {
            query: ( data: { productId: string | null, size: string | null, color: string | null, quantity: number | null } ) =>
            {
                const token = localStorage.getItem( "token" );
                return {
                    url: `auth/add-to-cart`,
                    method: "POST",
                    body: data,
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                };
            },

            invalidatesTags: [ "Auth" ],
        } ),
        getOrder: builder.query( {
            query: () =>
            {
                const token = localStorage.getItem( "token" );
                return {
                    url: `auth/getOrder`,
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            },
            providesTags: [ "Auth" ],
        } ),
        getCart: builder.query( {
            query: () =>
            {
                const token = localStorage.getItem( "token" );
                return {
                    url: `auth/getCart`,
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            },
            providesTags: [ "Auth" ],
        } ),
        getAllOrder: builder.query( {
            query: () =>
            {
                const token = localStorage.getItem( "token" );
                return {
                    url: `auth/getAllOrder`,
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                };
            },

            providesTags: [ "Auth" ],
        } ),
        updateOrderStatus: builder.mutation<IOrder, { id: string; status: string }>( {
            query: ( { id, status } ) =>
            {
                const token = localStorage.getItem( "token" );
                return {
                    url: `auth/update-order/${ id }`, // Thay đổi đường dẫn tùy thuộc vào API của bạn
                    method: 'PUT',
                    body: { status },
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }
            },

            invalidatesTags: [ 'Auth' ], // Nếu có thay đổi, cập nhật lại dữ liệu
        } ),
        createOrder: builder.mutation<Order, { COD: boolean, couponApplied: boolean, Address: string, TTONL: boolean, shippingType: string }>( {
            query: ( { COD, couponApplied, Address, TTONL, shippingType } ) =>
            {
                const token = localStorage.getItem( "token" );

                return {

                    url: 'auth/creatOrder',
                    method: 'POST',
                    body: { COD, couponApplied, Address, TTONL, shippingType },
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }

            },
            invalidatesTags: [ 'Auth' ], // Nếu có thay đổi, cập nhật lại dữ liệu

        } ),
        deleteoneProduct: builder.mutation<ICartData[], string>( {
            query: ( id ) =>  
            {
                const token = localStorage.getItem( "token" );

                return {
                    url: `auth/removeOneCart/${ id }`,
                    method: 'DELETE',
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }
            },

            invalidatesTags: [ 'Auth' ], // Nếu có thay đổi, cập nhật lại dữ liệu
        } ),
        applycoupon: builder.mutation<IVoucher, { voucher: string }>( {
            query: ( voucher ) =>
            {
                const token = localStorage.getItem( "token" );

                return {

                    url: 'auth/applycoupon',
                    method: 'POST',
                    body: voucher,
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }
            },
            invalidatesTags: [ 'Auth' ], // Nếu có thay đổi, cập nhật lại dữ liệu

        } ),
        getOneOrder: builder.query<Order, string>( {
            query: ( id ) =>  
            {
                const token = localStorage.getItem( "token" );

                return {
                    url: `auth/getoneOrder/${ id }`,
                    method: 'GET',
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }
            },
            providesTags: [ 'Auth' ]
        } ),
        updateOrdersStatus: builder.mutation<IOrder, { id: string; status: string }>( {
            query: ( { id, status } ) =>
            {
                const token = localStorage.getItem( "token" );
                return {
                    url: `auth/update-order/${ id }`,
                    method: "PUT",
                    body: { status },
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                };
            },
            invalidatesTags: [ "Auth" ],
        } ),

        confirmCancelOrder: builder.mutation<void, { id: string; isConfirmed: boolean }>( {
            query: ( { id, isConfirmed } ) =>
            {
                const token = localStorage.getItem( "token" );
                return {
                    url: `auth/confirm-cancel-order/${ id }`,
                    method: "PUT",
                    body: { isConfirmed },
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                };
            },
            invalidatesTags: [ "Auth" ],
        } ),
        cancelOrder: builder.mutation<void, { id: string; reason: string }>( {
            query: ( { id, reason } ) =>
            {
                const token = localStorage.getItem( "token" );
                return {
                    url: `auth/cancel-order/${ id }`,
                    method: "POST",
                    body: { reason },
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                };
            },
            invalidatesTags: [ "Auth" ],
        } ),

    } )
} )
export const {
    useLoginMutation, useAddToCartMutation, useCancelOrderMutation, useConfirmCancelOrderMutation, useUpdateOrdersStatusMutation, useGetOneOrderQuery, useApplycouponMutation, useDeleteoneProductMutation, useCreateOrderMutation, useGetCartQuery, useUpdateOrderStatusMutation, useGetAllOrderQuery, useGetOrderQuery, useEditUserMutation, useSignupMutation, useUnblockUserMutation, useGetUserByTokenMutation, useChangePasswordAuthMutation, useResetPasswordAuthMutation, useForgotPasswordAuthMutation, useGetUserListQuery, useBlockUserMutation, useSendCodeAuthMutation, useCheckCodeAuthMutation, useEditUserByTokenMutation
} = authApi
export const authReducer = authApi.reducer
export default authApi