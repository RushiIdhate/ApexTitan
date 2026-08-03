import axios from "axios";
import { useEffect, useState } from "react";

function RegisterEmployee() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        mobileNumber: "",
        email: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        department: "",
        designation: "",
        joiningDate: "",
        employeeType: "",
        reportingManager: "",
        employeeStatus: "",
        basicPay: "",
        salaryType: "",
    });
    const [successStatus, setSuccessStatus] = useState(false);
    const [failStatus, setFailStatus] = useState(false);
    const [employee, setEmployeeData] = useState([""]);
    const [reason, setReason] = useState("");
    const token = sessionStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5050/api/employee/registerEmployee',
                {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token}`
                    },
                    body : JSON.stringify(formData)
                }
            );
            
            const data = await response.json();

            if(response.status === 200){
                setSuccessStatus(true);
            } else {
                setFailStatus(true);
                setReason(data.message)
            }
        } catch (error) {
            console.log(error);
            setFailStatus(true);
        }
    };

    const fetchEmployee = async() => {
        try {
            const response = await axios.get('http://localhost:5050/api/employee/viewEmployee',
                {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            );

            setEmployeeData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchEmployee();
    },[]);

    return (
        <>
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
                                    <button type="button" className="btn-close" onClick={() => {setSuccessStatus(false)}}></button>
                                </div>

                                <div className="modal-body">
                                    <p>Employee Registration is successfull.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            {failStatus && (
                <>
                    <div
                        className="modal fade show"
                        style={{ display: "block" }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Registration Failed
                                    </h5>
                                    <button type="button" className="btn-close" onClick={() => {setFailStatus(false)}}></button>
                                </div>

                                <div className="modal-body">
                                    <p>Employee Registration is Failed.</p>
                                    <p>Reason: {reason}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                <div>
                    <div className="page-title">Employee Registration</div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <p className='text-muted fs-6 fw-medium'>Personal Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="firstName"
                                placeholder="First Name"
                                name="firstName"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="firstName">
                                <i className="bi bi-person me-2 text-success"></i>
                                First Name
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="lastName"
                                placeholder="Last Name"
                                name="lastName"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="lastName">
                                <i className="bi bi-person me-2 text-success"></i>
                                Last Name
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="gender"
                                name="gender"
                                onChange={handleChange}
                                required
                            >
                                <option value="">--- Select Gender ---</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>

                            <label htmlFor="gender">
                                <i className="bi bi-gender-ambiguous me-2 text-success"></i>
                                Gender
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="date"
                                className="form-control py-1"
                                id="dateOfBirth"
                                placeholder="Date of Birth"
                                name="dateOfBirth"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="dateOfBirth">
                                <i className="bi bi-calendar me-2 text-success"></i>
                                Date of Birth
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="tel"
                                className="form-control py-1"
                                id="mobileNumber"
                                placeholder="Mobile Number"
                                name="mobileNumber"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="mobileNumber">
                                <i className="bi bi-phone me-2 text-success"></i>
                                Mobile Number
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="email"
                                className="form-control py-1"
                                id="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="email">
                                <i className="bi bi-envelope-at me-2 text-success"></i>
                                Email
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Address</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="address"
                                placeholder="Address"
                                name="address"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="address">
                                <i className="bi bi-geo-alt me-2 text-success"></i>
                                Address
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="city"
                                placeholder="City"
                                name="city"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="city">
                                <i className="bi bi-building me-2 text-success"></i>
                                City
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="state"
                                placeholder="State"
                                name="state"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="state">
                                <i className="bi bi-globe-central-south-asia me-2 text-success"></i>
                                State
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="country"
                                placeholder="Country"
                                defaultValue="India"
                                name="country"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="country">
                                <i className="bi bi-globe me-2 text-success"></i>
                                Country
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="pinCode"
                                placeholder="PIN Code"
                                name="pinCode"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="pinCode">
                                <i className="bi bi-geo me-2 text-success"></i>
                                PIN Code
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Employment</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="department"
                                placeholder="Department"
                                name="department"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="department">
                                <i className="bi bi-diagram-3 me-2 text-success"></i>
                                Department
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="designation"
                                placeholder="Designation"
                                name="designation"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="designation">
                                <i className="bi bi-award me-2 text-success"></i>
                                Designation
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="date"
                                className="form-control py-1"
                                id="joiningDate"
                                placeholder="Joining Date"
                                name="joiningDate"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="joiningDate">
                                <i className="bi bi-calendar me-2 text-success"></i>
                                Joining Date
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="employeeType"
                                name="employeeType"
                                onChange={handleChange}
                                required
                            >
                                <option value="">--- Select Employment Type ---</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Intern">Intern</option>
                            </select>

                            <label htmlFor="employeeType">
                                <i className="bi bi-person-fill-exclamation me-2 text-success"></i>
                                Employment Type
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="reportingManager"
                                name="reportingManager"
                                onChange={handleChange}
                                required
                            >
                                <option value="">--- Select Reporting Manager ---</option>
                                {employee.map((item, index) => (
                                    <option value={`{item._id}`}>{item.firstName} {item.lastName}</option>
                                ))}
                            </select>

                            <label htmlFor="reportingManager">
                                <i className="bi bi-person-check me-2 text-success"></i>
                                Reporting Manager
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="employeeStatus"
                                name="employeeStatus"
                                onChange={handleChange}
                            >
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Resigned">Resigned</option>
                                <option value="Terminated">Terminated</option>
                            </select>

                            <label htmlFor="employeeStatus">
                                <i className="bi bi-person-check me-2 text-success"></i>
                                Employee Status
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Salary Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control py-1"
                                id="basicPay"
                                placeholder="Basic Pay"
                                min="0"
                                name="basicPay"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="basicPay">
                                <i className="bi bi-cash-stack me-2 text-success"></i>
                                Basic Pay
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="salaryType"
                                name="salaryType"
                                onChange={handleChange}
                            >
                                <option value="Monthly">Monthly</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Yearly">Yearly</option>
                            </select>

                            <label htmlFor="salaryType">
                                <i className="bi bi-wallet2 me-2 text-success"></i>
                                Salary Type
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Documents</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-field">
                            <label htmlFor="resume" className='mb-2'>
                                <i className="bi bi-file-person me-2 text-success"></i>
                                Resume
                            </label>

                            <input
                                type="file"
                                className="form-control py-1"
                                id="resume"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-field">
                            <label htmlFor="photo" className='mb-2'>
                                <i className="bi bi-file-image me-2 text-success"></i>
                                Employee Photo
                            </label>

                            <input
                                type="file"
                                className="form-control py-1"
                                id="photo"
                            />
                        </div>
                    </div>
                </div>


                <button
                    className="btn bg-primary-subtle mt-3 py-2 rounded-3 border border-primary fw-medium"
                    type="submit"
                >
                    <i className="fa-solid fa-user-plus me-2"></i>
                    Register Employee
                </button>

            </form></>
    )
}

export default RegisterEmployee