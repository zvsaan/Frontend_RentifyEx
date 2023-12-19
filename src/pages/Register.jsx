import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [konfirmasi, setKonfirmasi] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showKonfirmasi, setShowKonfirmasi] = useState(false);

    const handlePasswordVisibilityToggle = () => {
        setShowPassword(!showPassword);
    };
    const handlePasswordVisibilityToggle2 = () => {
        setShowKonfirmasi(!showKonfirmasi);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    
        if (email === "" || username === "" || password === "" || konfirmasi === "") {
            setError("Data Gagal ditambahkan, field tidak boleh ada yang kosong");
        } else if (password !== konfirmasi) {
            setError("Password dan Konfirmasi Password harus sama");
        } else if (!passwordRegex.test(password)) {
            setError("Password harus terdiri dari minimal 8 karakter, memiliki setidaknya satu huruf kapital, dan satu angka");
        } else {
            try {
                await axios.post('http://localhost:8080/create/user', {
                    email: email,
                    username: username,
                    password: password,
                    konfirmasi: konfirmasi,
                });
                setError("");
                setSuccessMessage("Account successfully created. Please login.");
            } catch (error) {
                console.error("Error during registration:", error);
                setError("Error during registration. Please try again.");
            }
        }
    };    

    return (
        <div className="login template d-flex justify-content-center align-items-center vh-100 bg-white">
          <div className="form_container p-5 rounded bg-white shadow-lg">
            <form onSubmit={handleSubmit}>
              <h3 className='text-center'>Register</h3>
              {error && <div className="alert alert-danger mb-3" role="alert">{error}</div>}
              {successMessage && <div className="alert alert-success mb-3" role="alert">{successMessage}</div>}
              <div className="mb-3">
                {/* <label htmlFor="username">Username</label> */}
                <input
                  placeholder="Username"
                  className="form-control"
                  type="username"
                  name="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                {/* <label htmlFor="email">Email</label> */}
                <input
                  placeholder="Email"
                  className="form-control"
                  type="email"
                  name="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
    
              <div className="mb-3">
                {/* <label htmlFor="password">Password</label> */}
                <div className="password-input-container position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    className={`password-toggle-icon bi ${showPassword ? 'ri-eye-line' : 'ri-eye-off-line'}`}
                    onClick={handlePasswordVisibilityToggle}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                  />
                </div>
              </div>
    
              <div className="mb-4">
                {/* <label htmlFor="konfirmasi">Konfirmasi Password</label> */}
                <div className="konfirmasi-input-container position-relative">
                  <input
                    type={showKonfirmasi ? "text" : "password"}
                    placeholder="Konfirmasi Password"
                    className="form-control"
                    value={konfirmasi}
                    onChange={(e) => setKonfirmasi(e.target.value)}
                  />
                  <i
                    className={`password-toggle-icon bi ${showKonfirmasi ? 'ri-eye-line' : 'ri-eye-off-line'}`}
                    onClick={handlePasswordVisibilityToggle2}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                  />
                </div>
              </div>
    
              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary">Register</button><br></br>
              </div>
              <div className='text-center'>
                <p className="mb-0" style={{ fontSize: '14px' }}>
                  Already have an account?<Link to="/login" className='ms-2'>Login now</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      );
    }
    
    export default Register;