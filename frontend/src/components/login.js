
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import url from "../url"

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState(""); 
    const history = useHistory
    
    ();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            history.push('/dashboard');
        }
    }, [history]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${url}/vendor/login`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values), 
            });

            const data = await response.json(); 
            

            if (response.ok) {
                localStorage.setItem('token', data.token); 
                history.push('/dashboard'); 
            } else {
                setErrorMessage(data.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='registrationContainer'>
            <form onSubmit={handleSubmit} className='registrationformContainer'>
                <h2>Login page</h2>
                <div className='inputcontainer'>
                    <label className='labels'>Enter Email</label>
                    <input className='inputType' type='email' required name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder='Enter Email' />
                </div>
                <div className='inputcontainer'>
                    <label className='labels'>Enter password</label>
                    <input className='inputType' type='password' required name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} placeholder='Enter Password' />
                </div>
                <div className='buttoncontainer'>
                    <button className='submitButton' type='submit'>Login</button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <p className='paragraph'>You don't have an account? <Link to="/registration">Click Here</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
