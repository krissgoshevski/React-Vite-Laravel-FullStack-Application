import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../components/contexts/ContextProvider';


export default function UserForm() {

    // ako id e dostapno ke go prikazeme userot, za userot site informacii 
    const { id } = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const { setNotification } = useStateContext()
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)

                })
        }, [])
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        // ako postoi userot so toa id , togas ke mu pravime update
        // pravime update na ovoj user i so , user kako vtor arg kaj put .. go prakame kako object cel user sto e updejtiran
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification("User was succesfully updated")
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;

                    if (response && response.status === 422) {
                        setErrors(response.data.errors); // za da gi printame erorite na user-interface 
                    }
                })
        } else {
            axiosClient.post(`/users`, user)
                .then(() => {
                    setNotification("User was succesfully created")
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;

                    if (response && response.status === 422) {
                        setErrors(response.data.errors); // za da gi printame erorite na user-interface 
                    }
                })

        }


    }

    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}

            <div className='card animated fadeInDown'>
                {loading && (
                    <div className='text-center'>Loading...</div>
                )}

                {errors && (
                    <div className='alert'>
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input type='text' value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder='Name'></input>
                        <input type='email' value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder='Email'></input>
                        <input type='password' onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder='Password'></input>
                        <input type='password' onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} placeholder='Password Confirmation'></input>
                        <button className='btn'>Save</button>
                    </form>
                }


            </div>
        </>
    )
}