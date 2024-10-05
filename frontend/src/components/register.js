import React, { useState } from 'react';
import {useHistory,Link} from 'react-router-dom'
import url from '../url';

function Register() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${url}/vendor/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json(); 

            if (response.ok) {
                console.log('Registration successful', data);
                history.push('/');
            } else {
                setErrorMessage(data.message || "Registration failed");
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };
    return (
        <div className='registrationContainer'>
            <form onSubmit={handleSubmit} className='registrationformContainer'>
                <h2>Registration page</h2>
                <div className='inputcontainer'>
                    <label className='labels'>Enter User Name</label>
                    <input className='inputType' required type='text' name="username" onChange={(e) => setValues({ ...values, username: e.target.value })} placeholder='enter user name' />
                </div>
                <div className='inputcontainer'>
                    <label className='labels'>Enter Email</label>
                    <input className='inputType' required type='email' name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} placeholder='enter email' />
                </div>
                <div className='inputcontainer'>
                    <label className='labels'>Enter password</label>
                    <input className='inputType' required type='password' name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} placeholder='enter password' />
                </div>
                <div className='buttoncontainer'>
                    <button className='submitButton' type='submit'>Register</button>
                    <Link to="/">
                        <button className='submitButton' type='submit'>Login</button>
                    </Link>
                   
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Register;
