
import { createBrowserRouter, Navigate } from "react-router-dom";


import { LayoutAdmin, LayoutWebsite } from "./components";


import LoginPage from "./pages/website/LoginPage";
import SignupPage from "./pages/website/SignupPage";

import { AddCategory, CategoryList, DashboardPage, EditCategory, HomePage, NotfoundPage } from "./pages";
import UserList from "./pages/admin/UserList";
import ForgotPage from "./pages/website/ForgotPassword";
import ResetPage from "./pages/website/Resetpassword";
import PurchaseHistory from "./pages/website/PurchaseHistory";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutWebsite />,
        children: [
            { index: true, element: <Navigate to={'home'} /> },
            { path: 'home', element: <HomePage /> },
            { path: 'purchase', element: <PurchaseHistory /> },






        ]
    },
    { path: 'forgot-password', element: <ForgotPage /> },
    { path: "password/reset-password/:randomString", element: < ResetPage /> },
    { path: 'login', element: <LoginPage /> },
    { path: 'signup', element: <SignupPage /> },


    {
        path: '/admin',
        element: <LayoutAdmin />,
        children: [
            { index: true, element: <Navigate to={'dashboard'} /> },
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'category', element: <CategoryList /> },
            { path: 'category/add', element: <AddCategory /> },
            { path: 'category/edit/:id', element: <EditCategory /> },
            { path: 'customers', element: <UserList /> },

        ]
    },
    {
        path: '*',
        element: <NotfoundPage />
    }
])