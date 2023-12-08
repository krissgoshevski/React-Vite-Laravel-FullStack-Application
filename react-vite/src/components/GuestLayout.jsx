import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from './contexts/ContextProvider'


// Outlet e mesto kaj so child elementite, rutite ke bidat napraveni 
// vo nasiot slucaj ke bidat Login i SignUp

const GuestLayout = () => {

    const { token } = useStateContext()


    // ako tokenot postoi, odnosno ako userot e avtenticiran, odnosno logiran uspesno
    // ke moze da pristapi do child elementite na GuestLAyout , za login i signUp page-ovite
    if (token) {
        return <Navigate to="/users" /> // ke go retirektira na / i ke gi pokaze site users // na /users
    }

    return (
        <div className='text-center'>
            For guests users only
            <Outlet />
        </div>
    )
}

export default GuestLayout