import React from 'react'
import { Navigate, Outlet, Link } from 'react-router-dom'
import { useStateContext } from './contexts/ContextProvider'

const DefaultLayout = () => {

    const { user, token } = useStateContext();
    // ova go zimame od ContextProviderot,
    // useStateContext() poso vaka se vika exportiraniot context 
    // i ovde go imame userot i tokenot od contextProviderot 

    // ako ne postoi tokenot
    // go vrakame userot na login page
    // userot nema da ima acces do ovaa ruta/ do ovaa page ako nema token
    /**
     *  a na default layout child se users i dashboard i / routes
            znaci nema da imame acces ako nema tokenznaci nema acces to child rutite
            
     */
    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault();

    }

    return (
        <div id='defaultLayout'>
            default Layout

            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>

            <div className='content'>
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className='btn-logout' > Logout </a>
                        User informations
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DefaultLayout

/**
 *     <aside>
                <Link to="/dashboard"></Link>
            </aside>
 *  element used to represent content that is tangentially related to the content around it.
 *  It is often used for sidebars or content that is separate from the main content.
 */

/**
 * <Link to="/dashboard"></Link>: This is likely using a React Router <Link> component.
 *  The to="/dashboard" attribute indicates that this link points to the "/dashboard" route.
 *  In React applications using React Router, this would typically be a declarative way to navigate
 *  to the "/dashboard" page without triggering a full page reload.
 */