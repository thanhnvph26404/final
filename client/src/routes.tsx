
import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";


import { LayoutAdmin, LayoutWebsite } from "./components";
import { DashboardPage, HomePage, NotfoundPage } from "./pages";
import LoginPage from "./pages/website/LoginPage";
import SignupPage from "./pages/website/SignupPage";

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


        ]
    },
    {
        path: '*',
        element: <NotfoundPage />
    }
] )