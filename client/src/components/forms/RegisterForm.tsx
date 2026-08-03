import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile_number, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [terms, setTerms] = useState("");
    const [successStatus, setSuccessStatus] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            if(password === confirmPassword){
                const response = await axios.post('http://localhost:5050/api/user/register', {
                    name, email, mobile_number, password
                });

                if(response.status === 200){
                    setSuccessStatus(true);
                }
            } else {
                setPasswordMatch(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section
            id="registerform"
            className="container-fluid min-vh-100 bg-light"
        >
            <div className="row min-vh-100">

                {successStatus && (
                    <>
                        <div
                            className="modal fade show"
                            style={{ display: "block" }}
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">

                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            Registration Successful
                                        </h5>
                                    </div>

                                    <div className="modal-body">
                                        <p>Your account has been created successfully.</p>
                                    </div>

                                    <div className="modal-footer">
                                        <a 
                                            className="btn btn-success"
                                            href='/login'
                                        >
                                            Go to Login
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="modal-backdrop fade show"></div>
                    </>
                )}

                <div className="col-lg-5 d-none d-lg-flex register-left justify-content-center align-items-center">
                    <div className="text-center text-white px-5">
                        <i className="fa-solid fa-seedling fs-1 mb-4"></i>
                        <h1
                            className="fw-bold"
                            style={{ fontFamily: "var(--secondary-font)" }}
                        >
                            Join Apex Titan
                        </h1>

                        <p className="lead mt-4">
                            Create your account to access Dashboard of Apex Titans
                        </p>

                    </div>

                </div>

                <div className="col-lg-7 d-flex justify-content-center align-items-center p-4">
                    <div
                        className="card shadow-lg border-0 rounded-4 p-4 p-md-5 w-100"
                        style={{ maxWidth: "550px" }}
                    >
                        <div className="text-center mb-4">
                            <h2
                                className="fw-bold"
                                style={{ fontFamily: "var(--secondary-font)" }}
                            >
                                Create Account
                            </h2>
                            <p className="text-muted mb-0">
                                Register to start using Apex Titan
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            placeholder="First Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />

                                        <label htmlFor="firstName">
                                            <i className="bi bi-person me-2 text-success"></i>
                                            Full Name
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <label htmlFor="email">
                                    <i className="bi bi-envelope-at me-2 text-success"></i>
                                    Email Address
                                </label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="mobile"
                                    placeholder="Mobile"
                                    value={mobile_number}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    required
                                />

                                <label htmlFor="mobile">
                                    <i className="bi bi-phone me-2 text-success"></i>
                                    Mobile Number
                                </label>
                            </div>

                            <div className="d-flex">
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <label htmlFor="password">
                                        <i className="bi bi-lock me-2 text-success"></i>
                                        Password
                                    </label>
                                </div>

                                <div className="form-floating mb-4 ms-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />

                                    <label htmlFor="confirmPassword">
                                        <i className="bi bi-lock me-2 text-success"></i>
                                        Confirm Password
                                    </label>
                                </div>
                            </div>

                            {   passwordMatch ? <></> : (
                                    <p className='text-danger'>Confirm Password should match original Password</p>
                                )
                            }

                            <div className="form-check mb-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="terms"
                                    value={terms}
                                    onChange={(e) => setTerms(e.target.value)}
                                />

                                <label
                                    className="form-check-label"
                                    htmlFor="terms"
                                >
                                    I agree to the Terms & Conditions
                                </label>
                            </div>

                            <button
                                className="btn btn-success w-100 py-3 rounded-pill fw-semibold" type="submit"
                            >
                                <i className="fa-solid fa-user-plus me-2"></i>
                                Create Account
                            </button>

                        </form>

                        <hr className="my-4" />

                        <p className="text-center mb-0">
                            Already have an account?
                            <Link
                                to="/login"
                                className="text-success fw-semibold text-decoration-none ms-2"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterForm