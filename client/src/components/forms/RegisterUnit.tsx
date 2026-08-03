import React, { useState } from 'react'

function RegisterUnit() {
    const [formData, setFormData] = useState({
        unitName : "",
        symbol : "",
        unitType : "",
        description : "",
        status : ""
    });

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

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                'http://localhost:5050/api/unit/registerUnit',
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
                                    <p>Unit Registration is successfull.</p>
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
                                    <p>Unit Registration is Failed.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                <div>
                    <div className="page-title">Unit Registration</div>
                </div>
            </div>
            
            <form onSubmit={handleSubmit}>
                <p className='text-muted fs-6 fw-medium'>Unit Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="unitName"
                                placeholder="Unit Name"
                                name='unitName'
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="unitName">
                                <i className="bi bi-rulers me-2 text-success"></i>
                                Unit Name
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="symbol"
                                placeholder="Symbol"
                                name='symbol'
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="symbol">
                                <i className="bi bi-pencil-square me-2 text-success"></i>
                                Symbol
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="unitType"
                                name='unitType'
                                onChange={handleChange}
                                required
                            >
                                <option value="">--- Select Unit Type ---</option>
                                <option value="Quantity">Quantity</option>
                                <option value="Weight">Weight</option>
                                <option value="Length">Length</option>
                                <option value="Volume">Volume</option>
                                <option value="Area">Area</option>
                                <option value="Time">Time</option>
                                <option value="Other">Other</option>
                            </select>

                            <label htmlFor="unitType">
                                <i className="bi bi-box-seam me-2 text-success"></i>
                                Unit Type
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

                <div className="row mb-3">
                    <div className="col-12">
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                id="description"
                                placeholder="Description"
                                name='description'
                                onChange={handleChange}
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
                    <i className="fa-solid fa-ruler me-2"></i>
                    Register Unit
                </button>

            </form>
        </>
    )
}

export default RegisterUnit