import { createBrowserRouter, Navigate, Outlet, useNavigate } from "react-router-dom";
import { LayoutAdmin, LayoutWebsite, ListProduct } from "./components";
import LoginPage from "./pages/website/LoginPage";
import SignupPage from "./pages/website/SignupPage";


import { AddCategory, CategoryList, DashboardPage, EditCategory, HomePage, NotfoundPage, ProductByCategoryPage, ProductPage } from "./pages";

import UserList from "./pages/admin/UserList";
import VouCherList from "./pages/admin/vouchers/VoucherList";
import ForgotPage from "./pages/website/ForgotPassword";
import ResetPage from "./pages/website/Resetpassword";
import AddVoucher from "./pages/admin/vouchers/AddVoucher";
import EditVoucher from "./pages/admin/vouchers/EditVoucher";

import { useEffect } from "react";
import { useGetUserByTokenMutation } from "./store/Auth/Auth.services";
import Profiles from "./pages/website/Profile/Profiles";
import Account from "./pages/website/Profile/AccoutProfile";
import YourComponent from "./pages/website/Profile/YourProfile";
import Information from "./pages/website/Profile/information";
import Changepassword from "./pages/website/Profile/Changepassword";
import { toastError } from "./hook/toastify";
import OrderAddress from "./pages/website/Profile/OrderAddress";
import PurchaseHistory from "./pages/website/PurchaseHistory";

import CartPage from "./pages/website/CartPage";

// import ListSize from "./pages/admin/size/listSize";
// import AddSize from "./pages/admin/size/addSize";
// import UpdateSize from "./pages/admin/size/updateSize";
import ListColor from "./pages/admin/color/ListColor";
import AddColor from "./pages/admin/color/AddColor";
import ProductList from "./pages/admin/products/ListProduct";
import ProductDetail from "./pages/website/ProductDetail";
import Inspection from "./pages/website/Policy/Inspection";
import Exchange from "./pages/website/Policy/ExchangePage";
import Warranty from "./pages/website/Policy/Warranty";
import Privacy from "./pages/website/Policy/Privacy";
import Rules from "./pages/website/Policy/Rules";

import Payment from "./pages/website/Payment";

import AddProduct from "./pages/admin/products/addProduct";
import OrderList from "./pages/admin/orders/OrderList";

import OrderSuccess from "./pages/website/OrderSuccess";

import Updatecolor from "./pages/admin/color/UpdateColor";

import UpdateProduct from "./pages/admin/products/Updateproduct";

import ListOrder from "./pages/admin/Order/Order";
import CheckoutPage from "./pages/website/PaymentPage";
import ChartPage from "./pages/admin/chart/BarChart";
import ProductDetailAdmin from "./pages/admin/products/ProductDetailAdmin";








const PriviteRouter = ( { isAuth }: any ) =>
{
    const navigate = useNavigate()
    const [ getUser ] = useGetUserByTokenMutation();

    const token = localStorage.getItem( "token" )

    useEffect( () =>
    {
        if ( token )
        {
            getUser( token )
                .unwrap()
                .then( ( response ) =>
                {
                    console.log( response );

                    if ( response.data.role === "Admin" )
                    {
                        navigate( "/admin" )
                    } else
                    {

                        navigate( "*" )
                    }

                } )
                .catch( ( error ) =>
                {
                    console.log( error );

                    toastError( "lỗi thao tác" )
                } );
        }
    }, [ getUser, token ] );

    return token ? <Outlet /> : <Navigate to={ "/login" } />

}



export const router = createBrowserRouter( [
    {
        element: <LayoutWebsite />,
        children: [


            { path: "", element: <Navigate to={ 'home' } /> },
            { path: 'home', element: <HomePage /> },
            { path: '/home/product-detail/:id', element: <ProductDetail /> },

            { path: 'cart', element: <CartPage /> },
            { path: 'payment', element: <CheckoutPage /> },
            { path: 'payments', element: <Payment /> },
            { path: 'ordersuccess', element: <OrderSuccess /> },
            { path: 'products/:category', element: <ProductByCategoryPage /> },
            { path: 'products', element: <ProductPage /> },
            { path: 'inspection', element: <Inspection /> },
            { path: 'exchange', element: <Exchange /> },
            { path: 'warranty', element: <Warranty /> },
            { path: 'privacy', element: <Privacy /> },
            { path: 'rules', element: <Rules /> },

            // { index: true, element: <Navigate to={ 'home' } /> },    



            {
                path: "profile",
                element: (
                    <YourComponent>
                        { ( currentUser ) => (
                            <>
                                <Profiles imageUser={ undefined } profiles={ [] } />
                            </>
                        ) }
                    </YourComponent>
                ),
                children: [

                    {
                        path: "account",
                        element: (
                            <YourComponent>
                                { ( currentUser ) => (
                                    <Account />
                                ) }
                            </YourComponent>
                        ),
                    },
                    { path: 'orders', element: <PurchaseHistory /> },

                    {

                        path: "information",
                        element: (
                            <YourComponent>
                                { ( currentUser ) => (
                                    <Information currentUser={ currentUser } />
                                ) }
                            </YourComponent>
                        ),
                    },
                    {
                        path: "order-address",
                        element: (
                            <YourComponent>
                                { ( currentUser ) => (
                                    <OrderAddress currentUser={ currentUser } />
                                ) }
                            </YourComponent>
                        ),
                    },
                    { path: 'orders', element: <PurchaseHistory /> },

                    {
                        path: "change-password",
                        element: (
                            <YourComponent>
                                { ( currentUser ) => (
                                    <Changepassword emailUser={ currentUser?.email } />
                                ) }
                            </YourComponent>
                        ),
                    },
                ]
            },
            { path: 'forgot-password', element: <ForgotPage /> },
            { path: "password/reset-password/:randomString", element: <ResetPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'signup', element: <SignupPage /> },
            { path: 'ordersuccess', element: <OrderSuccess /> },

        ],

    },




    {
        path: '/admin',
        element: <PriviteRouter token={ false } />,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    { path: "", element: <Navigate to={ 'dashboard' } /> },
                    { path: 'dashboard', element: <ChartPage /> },
                    { path: 'category', element: <CategoryList /> },
                    { path: 'products', element: <ProductList /> },

                    { path: 'category/add', element: <AddCategory /> },
                    { path: 'category/edit/:id', element: <EditCategory /> },
                    { path: 'customers', element: <UserList /> },
                    { path: 'vouchers', element: <VouCherList /> },
                    { path: 'vouchers/createVoucher', element: <AddVoucher /> },
                    { path: 'vouchers/editVoucher/:id', element: <EditVoucher /> },

                    { path: 'orderss', element: <OrderList /> },

                    // { path: 'size', element: <ListSize /> },
                    // { path: 'size/add', element: <AddSize /> },
                    // { path: 'size/update/:id', element: <UpdateSize /> },

                    { path: 'color', element: <ListColor /> },
                    { path: 'color/add', element: <AddColor /> },
                    { path: 'color/update/:id', element: <Updatecolor /> },
                    { path: 'products', element: <ListProduct /> },
                    { path: 'products/add', element: <AddProduct /> },

                    { path: 'product/:id', element: <UpdateProduct /> },
                    { path: 'products/productDetailAdmin/:id', element: <ProductDetailAdmin /> },

                    { path: 'orders', element: <ListOrder /> },
                    { path: 'chart', element: <ChartPage /> },


                ]
            }
        ]
    },
    {
        path: '*',
        element: <NotfoundPage />
    }
] )
