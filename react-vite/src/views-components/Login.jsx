
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { useStateContext } from '../components/contexts/ContextProvider';
import axiosClient from '../axios-client';


const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        // koga pravime request do api laravel, mora sekogas da gi zememe greskite
        setErrors(null)

        // so POST request gi prakam site vrednosti od inputite so payload se sostojat 
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                // console.log(err);
                const response = err.response;

                // od serverot, od Laravel
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors); // za da gi printame erorite na user-interface 
                    } else {
                        setErrors({
                            email: [response.data.message]
                        });

                    }

                }
            })

    }

    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className='form'>
                <form onSubmit={onSubmit}>

                    {errors && <div className='alert'>
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                    }

                    <h1 className='title'>Login into your account</h1>

                    <input ref={emailRef} type='email' placeholder='Your email'></input>
                    <input ref={passwordRef} type='password' placeholder='Your password'></input>

                    <button className='btn btn-block'>Login</button>
                    <p className='message'>
                        Not Registered? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login