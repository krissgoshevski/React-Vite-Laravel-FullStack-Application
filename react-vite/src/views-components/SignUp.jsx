import React from 'react'
import { Link } from 'react-router-dom'
// like register form


const nameRef = userRef();
const emailRef = userRef();
const passwordRef = userRef();
const passwordConfirmationRef = userRef();

const onSubmit = (event) => {
    event.preventDefault()

    const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value, // pw_conf mora da bide so _, poso laravel vaka prebaruva za pw_conf

    }

    console.log(payload);
}



const SignUp = () => {
    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className='form'>
                <form onSubmit={onSubmit}>

                    <h1 className='title'>SignUp for free</h1>

                    <input ref={nameRef} type='text' placeholder='Your full name'></input>
                    <input ref={emailRef} type='email' placeholder='Your email address'></input>
                    <input ref={passwordRef} type='password' placeholder='Your password'></input>
                    <input ref={passwordConfirmationRef} type='password' placeholder='Your password Confirmation'></input>

                    <button className='btn btn-block'>SignUp</button>
                    <p className='message'>
                        Already Registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp