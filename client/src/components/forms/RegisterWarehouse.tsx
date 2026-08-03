import React from 'react'

function RegisterWarehouse() {
  const successStatus = false;
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

            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                <div>
                    <div className="page-title">Warehouse Registration</div>
                </div>
            </div>
            
            <form>
                <p className='text-muted fs-6 fw-medium'>Warehouse Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="warehouseName"
                                placeholder="Warehouse Name"
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
                                id="manager"
                            >
                                <option value="">--- Select Manager ---</option>
                                {/* Employee options will come from backend */}
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
                            >
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
                            >
                                <option value="">--- Select Capacity Unit ---</option>
                                {/* Unit options will come from backend */}
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