import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { handleError } from '../Utils'
function Signup() {
  const [SignInfo, setSignInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignInfo = { ...SignInfo };
    copySignInfo[name] = value;
    setSignInfo(copySignInfo);
  }
  console.log('SignInfo ->', SignInfo)
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = SignInfo;
    if (!name || !email || !password) {
      return handleError('All fields are required')
    }

    if (password.length < 4) {
      return handleError('Password must be at least 4 characters long');
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(SignInfo)
      });
      const result = await response.json();
      console.log(result);

      if (result.success) {
        toast.success(result.message || "Signup successful!");
        setTimeout(() => {
          navigate('/login')
        }, 1000)
        setSignInfo({ name: '', email: '', password: '' });

      } else {
        handleError(result.message || "Signup failed");
      }
    } catch (err) {
      handleError(err);
    }
  }
  return (
    <div className='container'>
      <h1>SignUp</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleChange}
            type='text'
            name='name'
            autoFocus
            placeholder='Enter your name...'
            value={SignInfo.name}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your email...'
            value={SignInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={SignInfo.password}
          />
        </div>
        <button type='submit'>Signup</button>
        <span>Already have an account?
          <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup