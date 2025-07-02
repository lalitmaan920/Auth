import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { handleError } from '../Utils'
function Login() {
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...LoginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }
  console.log('LoginInfo ->', LoginInfo)
  const handleLogin = async (e) => {
  e.preventDefault();
  const { email, password } = LoginInfo;

  if (!email || !password) {
    return handleError('All fields are required');
  }

  if (password.length < 4) {
    return handleError('Password must be at least 4 characters long');
  }

  try {
    const url = "http://localhost:8080/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(LoginInfo)
    });

    const result = await response.json();
    console.log(result);

    if (result.success) {
      localStorage.setItem("token", result.jwtToken);
      localStorage.setItem("user", JSON.stringify(result.user)); 

      toast.success(result.message || "Login successful!");
      setTimeout(() => {
        navigate('/home');
      }, 1000);

    
      setLoginInfo({ email: '', password: '' });
    } else {
      handleError(result.message || "Login failed");
    }
  } catch (err) {
    handleError(err);
  }
};

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your email...'
            value={LoginInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={LoginInfo.password}
          />
        </div>
        <button type='submit'>login</button>
        <span>Don't have an account?
          <Link to="/signup">SignUp</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login