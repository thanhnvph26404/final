
import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";


import { LayoutAdmin, LayoutWebsite } from "./components";


import LoginPage from "./pages/website/LoginPage";
import SignupPage from "./pages/website/SignupPage";

import { AddCategory, CategoryList, DashboardPage, EditCategory, HomePage, NotfoundPage } from "./pages";

export const router = createBrowserRouter( [
    {
        path: '/',
        element: <LayoutWebsite />,
        children: [
            { index: true, element: <Navigate to={ '/' } /> },
            { path: '/', element: <HomePage /> },
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <SignupPage /> },






        ]
    },

    {
        path: '/admin',
        element: <LayoutAdmin />,
        children: [
            { index: true, element: <Navigate to={ 'dashboard' } /> },
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'category', element: <CategoryList /> },
            { path: 'category/add', element: <AddCategory /> },
            { path: 'category/edit/:id', element: <EditCategory /> },

        ]
    },
    {
        path: '*',
        element: <NotfoundPage />
    }
] )