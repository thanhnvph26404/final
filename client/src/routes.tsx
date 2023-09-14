import { createBrowserRouter, Navigate } from "react-router-dom";

import { LayoutAdmin, LayoutWebsite } from "./components";
import { DashboardPage, HomePage, NotfoundPage } from "./pages";

export const router = createBrowserRouter( [
    {
        path: '/',
        element: <LayoutWebsite />,
        children: [
            { index: true, element: <Navigate to={ '/' } /> },
            { path: '/', element: <HomePage /> },



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