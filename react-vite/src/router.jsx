
import { Navigate, createBrowserRouter } from "react-router-dom" // ova ja ko importirav

import Login from "./views-components/Login"
import SignUp from "./views-components/SignUp"
import Users from "./views-components/Users"
import NotFound from "./views-components/NotFound"
import DefaultLayout from "./components/DefaultLayout"
import GuestLayout from "./components/GuestLayout"
import Dashboard from "./views-components/Dashboard"
//Navigate to="/users" za redirect
// a ako kaj element koristime komponenta <users /> ova direktno ke ja otvori taa stranicata odma

const router = createBrowserRouter([

    {
        // DefaultLayout e toj so e najaven vo sistemot veke i ima token 
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/users" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
        ]

    },
    {
        // GuestLayout -> toj so ne e najaven vo sistemot
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
        ]
    },

    {
        // za sekoga druga pateka ke mi dava not-found 

        path: '*',
        element: <NotFound />
    },
]);


export default router