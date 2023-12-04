//register form 
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../components/contexts/ContextProvider';





const SignUp = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);
    // po default erorite ke bidat null , kreiram za erorite da se gledaat na userInterface 
    const { setUser, setToken } = useStateContext();


    const onSubmit = (ev) => {
        // debugger;
        ev.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            // pw_conf mora da bide so _, poso laravel vaka prebaruva za pw_conf
        }

        console.log(payload);

        // so POST request gi prakam site vrednosti od inputite so payload se sostojat 
        axiosClient.post('/signup', payload)
            .then(({ data }) => {

                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                console.log(err);
                const response = err.response;

                // od serverot, od Laravel
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors); // za da gi printame erorite na user-interface 
                }
            })
    }







    return (
        <div className='login-signup-form animated fadeInDown'>
            {errors && <div className='alert'>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>}


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

/**
 * 
 *        
                    {errors && <div className='alert'>
                        {Object.keys(errors).map(key => (
                            <p>{errors[key][0]}</p>
                        ))}    
                    </div>}

                    za da g izememe erorite da gi printam na UI, poso e object mora vaka, gi zimam vrednosite
                    oti se key e objektot, value e vrednosta na object 
 */