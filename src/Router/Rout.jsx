import React from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from '../Layout/Layout';
import ErrorPage from '../ErrorPage/ErrorPage';
import Home from '../Component/Home';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import AddTrans from '../Component/AddTrans';
import MyTrans from '../Component/MyTrans';
import Report from '../Component/Report';
import MyProfile from '../Component/MyProfile';
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';
import DashboardLayout from '../Dashboard/DashboardLayout';
import UserOverview from '../Dashboard/UserOverview';
import ManageUsers from '../Dashboard/ManageUsers';
import Analytics from '../Dashboard/Analytics';

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/login",
                Component: Login,
            },
            {
                path: "/register",
                Component: Register,
            }
            ,
            {
                path: "/add-transaction",
                element: <PrivateRoute>
                    <AddTrans></AddTrans>
                </PrivateRoute>,
            }
            ,
            {
                path: "/my-transactions",
                element: <PrivateRoute>
                    <MyTrans></MyTrans>
                </PrivateRoute>,
            }
            ,
            {
                path: "/reports",
                element: <PrivateRoute>
                    <Report></Report>
                </PrivateRoute>,
            },
            {
                path: "/myprofile",
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>,
            }


        ]


    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                Component: UserOverview,
            },
            {
                path: "add-transaction",
                Component: AddTrans,
            },
            {
                path: "my-transactions",
                Component: MyTrans,
            },
            {
                path: "reports",
                Component: Report,
            },
            {
                path: "profile",
                Component: MyProfile,
            },
            {
                path: "manage-users",
                element: (
                    <RoleRoute allowedRoles={["admin", "demo-admin"]}>
                        <ManageUsers></ManageUsers>
                    </RoleRoute>
                ),
            },
            {
                path: "analytics",
                element: (
                    <RoleRoute allowedRoles={["admin", "demo-admin"]}>
                        <Analytics></Analytics>
                    </RoleRoute>
                ),
            },
        ],
    }
]);

export default router;
