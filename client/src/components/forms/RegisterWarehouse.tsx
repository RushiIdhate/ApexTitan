import axios from 'axios';
import React, { useEffect, useState } from 'react'

function RegisterWarehouse() {
    const [formData, setFormData] = useState({
        warehouseName : "",
        warehouseType : "",
        manager : "",
        address : {
            addressLine1 : "",
            addressLine2 : "",
            city : "",
            state : "",
            country : "",
            pinCode : ""
        },
        contactNumber : "",
        email : "",
        capacity : "",
        capacityUnit : "",
        status : "",
        description : ""
    });

    const [employee, setEmployee] = useState([""]);
    const [unit, setUnit] = useState([""]);
    const [successStatus, setSuccessStatus] = useState(false);
    const [failStatus, setFailStatus] = useState(false);

    const token = sessionStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name] : value
        });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            address : {
                ...formData.address,
                [name] : value
            }
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                'http://localhost:5050/api/warehouse/registerWarehouse',
                {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token}`
                    },
                    body : JSON.stringify(formData)
                }
            );

            if(response.status === 200){
                setSuccessStatus(true);
            } else {
                setFailStatus(true);
            }

        } catch (error) {
            setFailStatus(true);
        }
    };

    const fetchEmployee = async() => {
        try {
            const response = await axios.get('http://localhost:5050/api/employee/viewEmployee', {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            });

            setEmployee(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUnit = async() => {
        try {
            const response = await axios.get('http://localhost:5050/api/unit/viewUnit', {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            });

            setUnit(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEmployee();
        fetchUnit();
    },[])
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
                                    <p>Warehouse Registration is successfull.</p>
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
                                    <p>Warehouse Registration is Failed.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                <div>
                    <div className="page-title">Warehouse Registration</div>
                </div>
            </div>
            
            <form onSubmit={handleSubmit}>
                <p className='fs-6 fw-medium'>Warehouse Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="warehouseName"
                                placeholder="Warehouse Name"
                                name='warehouseName'
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="warehouseName">
                                <i className="bi bi-building me-2 text-success"></i>
                                Warehouse Name
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="warehouseType"
                                name='warehouseType'
                                onChange={handleChange}
                                required
                            >
                                <option value="">--- Select Warehouse Type ---</option>
                                <option value="Raw Material">Raw Material</option>
                                <option value="Finished Goods">Finished Goods</option>
                                <option value="General">General</option>
                                <option value="Production">Production</option>
                                <option value="Distribution">Distribution</option>
                            </select>

                            <label htmlFor="warehouseType">
                                <i className="bi bi-box-seam me-2 text-success"></i>
                                Warehouse Type
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                name='manager'
                                onChange={handleChange}
                                id="manager"
                            >
                                <option value="">--- Select Manager ---</option>
                                {employee.map((item) => (
                                    <option value={`${item._id}`}>
                                        {item.firstName} {item.lastName}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="manager">
                                <i className="bi bi-person-badge me-2 text-success"></i>
                                Warehouse Manager
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="status"
                                name='status'
                                onChange={handleChange}
                            >
                                <option value="">--- Select Status ---</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>

                            <label htmlFor="status">
                                <i className="bi bi-toggle-on me-2 text-success"></i>
                                Status
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Warehouse Address</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="addressLine1"
                                placeholder="Address Line 1"
                                name='addressLine1'
                                onChange={handleAddressChange}
                                required
                            />

                            <label htmlFor="addressLine1">
                                <i className="bi bi-geo-alt me-2 text-success"></i>
                                Address Line 1
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="addressLine2"
                                placeholder="Address Line 2"
                                name='addressLine2'
                                onChange={handleAddressChange}
                            />

                            <label htmlFor="addressLine2">
                                <i className="bi bi-geo-alt me-2 text-success"></i>
                                Address Line 2
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
                                name='city'
                                onChange={handleAddressChange}
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
                                name='state'
                                onChange={handleAddressChange}
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
                                name='country'
                                onChange={handleAddressChange}
                                placeholder="Country"
                                defaultValue="India"
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
                                name='pinCode'
                                onChange={handleAddressChange}
                                required
                            />

                            <label htmlFor="pinCode">
                                <i className="bi bi-pin-map me-2 text-success"></i>
                                PIN Code
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Contact & Capacity</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="contactNumber"
                                placeholder="Contact Number"
                                name='contactNumber'
                                onChange={handleChange}
                            />

                            <label htmlFor="contactNumber">
                                <i className="bi bi-phone me-2 text-success"></i>
                                Contact Number
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
                                name='email'
                                onChange={handleChange}
                            />

                            <label htmlFor="email">
                                <i className="bi bi-envelope-at me-2 text-success"></i>
                                Email
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control py-1"
                                id="capacity"
                                placeholder="Capacity"
                                min="0"
                                name='capacity'
                                onChange={handleChange}
                            />

                            <label htmlFor="capacity">
                                <i className="bi bi-bar-chart me-2 text-success"></i>
                                Capacity
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="capacityUnit"
                                name='capacityUnit'
                                onChange={handleChange}
                            >
                                <option value="">--- Select Capacity Unit ---</option>
                                {unit.map((item, index) => (
                                    <option value={`${item._id}`}>{item.unitName}</option>
                                ))}
                            </select>

                            <label htmlFor="capacityUnit">
                                <i className="bi bi-rulers me-2 text-success"></i>
                                Capacity Unit
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Description</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12">
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                id="description"
                                placeholder="Description"
                                style={{ height: "120px" }}
                                name='description'
                                onChange={handleChange}
                            ></textarea>

                            <label htmlFor="description">
                                <i className="bi bi-card-text me-2 text-success"></i>
                                Description
                            </label>
                        </div>
                    </div>
                </div>


                <button
                    className="btn bg-primary-subtle mt-3 py-2 rounded-3 border border-primary fw-medium"
                    type="submit"
                >
                    <i className="fa-solid fa-warehouse me-2"></i>
                    Register Warehouse
                </button>

            </form>
        </>
    )
}

export default RegisterWarehouse