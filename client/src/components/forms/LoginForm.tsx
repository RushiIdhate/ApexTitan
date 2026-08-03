import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5050/api/auth/login', {
                email, password
            });

            if(response.status === 200){
                sessionStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (error) {
            
        }
    }

  return (
    <div id="loginform">
            <div className="container-fluid vh-100">
                <div className="row h-100">
                    <div className="col-lg-5 d-none d-lg-flex login-left">
                        <div className="text-center text-white">
                            <i className="bi bi-box-seam fs-1 mb-4"></i>
                            <h1
                                className="fw-bold"
                                style={{ fontFamily: "var(--secondary-font)" }}
                            >
                                Apex Titan
                            </h1>

                            <p className="mt-4 px-5">
                                Smart Farming Platform powered by Artificial
                                Intelligence for Disease Detection, Weather
                                Forecasting and Irrigation Scheduling.
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-7 d-flex justify-content-center align-items-center">
                        <div className="login-card shadow-lg">
                            <h2
                                className="fw-bold text-center mb-2"
                                style={{ fontFamily: "var(--secondary-font)" }}
                            >
                                Welcome Back
                            </h2>

                            <p className="text-center text-muted mb-4">
                                Login to continue using Apex Titan
                            </p>

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Email Address
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-envelope-at"></i>
                                        </span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Password
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-lock"></i>
                                        </span>

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mb-2">                                    
                                    <a
                                        href="/forgot-password"
                                        className="text-success text-decoration-none"
                                    >
                                        Forgot Password?
                                    </a>

                                </div>

                                <button className="btn btn-success w-100 py-3 rounded-pill fw-semibold" type="submit">
                                    Login
                                </button>

                            </form>

                            <hr className="my-4" />

                            <p className="text-center mb-0">
                                Don't have an account?
                                <a
                                    href="/register"
                                    className="text-success text-decoration-none fw-bold ms-2"
                                >
                                    Register
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default LoginForm