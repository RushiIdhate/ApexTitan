import { useState } from "react";

function RegisterCategory() {
    const [formData, setFormData] = useState({
        categoryName : "",
        description : "",
        status : ""
    });

    const [successStatus, setSuccessStatus] = useState(false);
    const [failStatus, setFailStatus] = useState(false);
    const [reason, setReason] = useState("");

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
                'http://localhost:5050/api/category/registerCategory',
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
                setReason(data.message);
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
                                    <p>Category Registration is successfull.</p>
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
                                    <p>Category Registration is Failed.</p>
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
                    <div className="page-title">Category Registration</div>
                </div>
            </div>
            
            <form onSubmit={handleSubmit}>
                <p className='text-muted fs-6 fw-medium'>Category Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="categoryName"
                                placeholder="Category Name"
                                name="categoryName"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="categoryName">
                                <i className="bi bi-tags me-2 text-success"></i>
                                Category Name
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="status"
                                name="status"
                                onChange={handleChange}
                            >
                                <option>--- Select Status ---</option>
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
                                style={{ height: "120px" }}
                                name="description"
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
                    <i className="fa-solid fa-tag me-2"></i>
                    Register Category
                </button>

            </form>
        </>
    )
}

export default RegisterCategory