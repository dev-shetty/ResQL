import React from 'react';
import '../styles/Login.css';
import { useState } from 'react';

function Login() {
    const [user, setUser] = useState("");
  return (
    <div className='login-section'>
        <h1 className='user-title'>*User* Login</h1>
        <input type='text' placeholder='username'/>
        <input type='password' placeholder='password'/>
        <button className='login-button'>Login</button>
    </div>
  )
}

export default Login