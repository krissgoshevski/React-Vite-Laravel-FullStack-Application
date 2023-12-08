import React, { useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useStateContext } from './contexts/ContextProvider'
import axiosClient from '../axios-client'
import { Navigate } from 'react-router-dom'




const DefaultLayout = () => {



    const { user, token, setUser, setToken, notification } = useStateContext();
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


    const onLogout = async (ev) => {
        ev.preventDefault();

        try {
            await axiosClient.post('/logout');
            setUser({});
            setToken(null);

        } catch (error) {
            console.error('Error logging out:', error);
        }
    };



    // useEffect e hook , stavame callback , vtor arg e array
    // ke go printame userot so negovite informacii (toj so e logiran)
    // setUser metodata e od StateContext
    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                // Handle the error as needed (e.g., redirect to login page)
            });
    }, []);





    return (
        <div id='defaultLayout'>

            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>

            <div className='content'>
                {notification &&
                    <div className='notification'>
                        {notification}
                    </div>
                }
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <Link to="/login" className='btn-logout' onClick={onLogout}>Logout</Link>
                        {/* <a href="#logout" onClick={onLogout} className='btn-logout' > Logout </a> */}

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