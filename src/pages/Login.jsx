import React, { useState } from "react";
import './style.css';
import { Link } from 'react-router-dom';
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(""); 
  const [loggingIn, setLoggingIn] = useState(false); 

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    setLoggingIn(true);

    axios.post('http://localhost:8080/user/login', {
      username: username,
      password: password
    }).then((res) => {
      if(res.data.status === 'success'){
        localStorage.setItem('username', JSON.stringify(res.data.values[0]?.username));
        localStorage.setItem('status', JSON.stringify(res.data.values[0]?.status));
        localStorage.setItem('id', JSON.stringify(res.data.values[0]?.id));
        // Set pesan berhasil
        setMessage("Logging in...");
        // Redirect atau navigasi ke halaman beranda
        if(res.data.values[0]?.status === 'user'){
          window.location.href = '/home';
        } else if(res.data.values[0]?.status === 'admin'){
          window.location.href = '/admin/product';
        } else {
          window.location.href = '/home';
        }
      } else {
        setMessage(res.data.messages);
        // Set status "logging in" menjadi false
        setLoggingIn(false);
        localStorage.setItem('username', JSON.stringify(null));
      }
    });
  }

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="form_container p-5 rounded bg-white shadow-lg">
        <form>
          <h3 className='text-center'>Login</h3>
          {message && <div className="alert alert-info mb-3" role="alert">{message}</div>}
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              placeholder="Masukkan Username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3 password-container-oe">
            <label htmlFor="password">Password</label>
            <div className="password-input-container position-relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`password-toggle-icon bi ${showPassword ? 'ri-eye-line' : 'ri-eye-off-line'}`}
                onClick={()=>handlePasswordVisibilityToggle()}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms-2">Remember me</label>
          </div>
          <div className="d-grid mb-3">
            <button onClick={(e) => handleLogin(e)} className="btn btn-primary">{loggingIn ? "Logging in..." : "Login"}</button>
          </div>
          <div className="d-grid mb-3">
          <div className="d-flex justify-content-between">
            <button className="facebook-btn">
              <i className="ri-facebook-circle-fill icon" style={{ marginRight: '5px' }}></i> Facebook
            </button>
            <button className="google-btn">
              <i className="ri-google-fill icon2" style={{ marginRight: '5px' }}></i> Google
            </button>
          </div>
          </div><br></br>
          <div className='text-center'>
            <p className="mb-0" style={{ fontSize: '14px' }}>
              Don't have an account?<Link to="/register" className='ms-2'>Create now</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;