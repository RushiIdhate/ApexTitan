import { useState } from "react"

function RegisterSupplier() {
    const [formData, setFormData] = useState({
        companyName : "",
        supplierType : "",
        industry : "",
        website : "",
        contactPerson : "",
        email : "",
        phone : "",
        alternatePhone : "",
        gstNumber : "",
        panNumber : "",
        taxType : "",
        address : {
            addressLine1 : "",
            addressLine2 : "",
            city : "",
            state : "",
            country : "",
            pinCode : ""
        },
        paymentTerms : "",
        creditLimit : "",
        currency : "",
        bankDetails : {
            bankName : "",
            accountHolderName : "",
            accountNumber : "",
            ifscCode : "",
            branchName : ""
        },
        status : "",
        notes : ""
    });

    const[successStatus, setSuccessStatus] = useState(false);
    const[failStatus, setFailStatus] = useState(false);
    const[reason, setReason] = useState("");
    const token = sessionStorage.getItem('token');

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name] : value
        });
    };

    const handleAddressChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            address : {
                ...formData.address,
                [name] : value
            }
        })
    };

    const handleBankDetailChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            bankDetails : {
                ...formData.bankDetails,
                [name] : value
            }
        })
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5050/api/supplier/registerSupplier', 
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
                setReason(data);
            };
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
                                    <p>Supplier Registration is successfull.</p>
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
                                    <p>Supplier Registration is Failed.</p>
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
                    <div className="page-title">Supplier Registration</div>
                </div>
            </div>
            
            <form onSubmit={handleSubmit}>
                <p className='text-muted fs-6 fw-medium'>Supplier Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="companyName"
                                placeholder="Company Name"
                                name="companyName"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="companyName">
                                <i className="bi bi-building me-2 text-success"></i>
                                Company Name
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="supplierType"
                                name="supplierType"
                                onChange={handleChange}
                                required
                            >
                                <option value="">--- Select Supplier Type ---</option>
                                <option value="Raw Material">Raw Material</option>
                                <option value="Finished Goods">Finished Goods</option>
                                <option value="Machinery">Machinery</option>
                                <option value="Packaging">Packaging</option>
                                <option value="Services">Services</option>
                                <option value="Other">Other</option>
                            </select>

                            <label htmlFor="supplierType">
                                <i className="bi bi-box-seam me-2 text-success"></i>
                                Supplier Type
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
                                id="industry"
                                placeholder="Industry"
                                name="industry"
                                onChange={handleChange}
                            />

                            <label htmlFor="industry">
                                <i className="bi bi-diagram-3 me-2 text-success"></i>
                                Industry
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="website"
                                placeholder="Website"
                                name="website"
                                onChange={handleChange}
                            />

                            <label htmlFor="website">
                                <i className="bi bi-globe me-2 text-success"></i>
                                Website
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
                                id="contactPerson"
                                placeholder="Contact Person"
                                name="contactPerson"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="contactPerson">
                                <i className="bi bi-person me-2 text-success"></i>
                                Contact Person
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

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="tel"
                                className="form-control py-1"
                                id="phone"
                                placeholder="Phone Number"
                                name="phone"
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="phone">
                                <i className="bi bi-phone me-2 text-success"></i>
                                Phone Number
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="tel"
                                className="form-control py-1"
                                id="alternatePhone"
                                placeholder="Alternate Phone"
                                name="alternatePhone"
                                onChange={handleChange}
                            />

                            <label htmlFor="alternatePhone">
                                <i className="bi bi-telephone me-2 text-success"></i>
                                Alternate Phone
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
                                id="gstNumber"
                                placeholder="GST Number"
                                name="gstNumber"
                                onChange={handleChange}
                            />

                            <label htmlFor="gstNumber">
                                <i className="bi bi-receipt me-2 text-success"></i>
                                GST Number
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="panNumber"
                                placeholder="PAN Number"
                                name="panNumber"
                                onChange={handleChange}
                            />

                            <label htmlFor="panNumber">
                                <i className="bi bi-card-text me-2 text-success"></i>
                                PAN Number
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="taxType"
                                name="taxType"
                                onChange={handleChange}
                            >
                                <option>--- Select Tax Type ---</option>
                                <option value="GST">GST</option>
                                <option value="Non-GST">Non-GST</option>
                                <option value="Export">Export</option>
                            </select>

                            <label htmlFor="taxType">
                                <i className="bi bi-percent me-2 text-success"></i>
                                Tax Type
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
                                id="addressLine1"
                                placeholder="Address Line 1"
                                name="addressLine1"
                                onChange={handleAddressChange}
                                required
                            />

                            <label htmlFor="addressLine1">
                                <i className="bi bi-geo-alt me-2 text-success"></i>
                                Address Line 1
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="addressLine2"
                                placeholder="Address Line 2"
                                name="addressLine2"
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
                                name="city"
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
                                name="state"
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
                                placeholder="Country"
                                defaultValue="India"
                                name="country"
                                onChange={handleAddressChange}
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
                                onChange={handleAddressChange}
                                required
                            />

                            <label htmlFor="pinCode">
                                <i className="bi bi-geo me-2 text-success"></i>
                                PIN Code
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Payment Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="paymentTerms"
                                name="paymentTerms"
                                onChange={handleChange}
                            >
                                <option>--- Select Payment Terms ---</option>
                                <option value="Due on Receipt">Due on Receipt</option>
                                <option value="Advance Payment">Advance Payment</option>
                                <option value="Net 15">Net 15</option>
                                <option value="Net 30">Net 30</option>
                                <option value="Net 45">Net 45</option>
                                <option value="Net 60">Net 60</option>
                                <option value="Net 90">Net 90</option>
                            </select>

                            <label htmlFor="paymentTerms">
                                <i className="bi bi-calendar-check me-2 text-success"></i>
                                Payment Terms
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control py-1"
                                id="creditLimit"
                                placeholder="Credit Limit"
                                name="creditLimit"
                                onChange={handleChange}
                                min="0"
                            />

                            <label htmlFor="creditLimit">
                                <i className="bi bi-credit-card me-2 text-success"></i>
                                Credit Limit
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
                                id="currency"
                                placeholder="Currency"
                                defaultValue="INR"
                                name="currency"
                                onChange={handleChange}
                            />

                            <label htmlFor="currency">
                                <i className="bi bi-currency-rupee me-2 text-success"></i>
                                Currency
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Bank Details</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="bankName"
                                placeholder="Bank Name"
                                name="bankName"
                                onChange={handleBankDetailChange}
                            />

                            <label htmlFor="bankName">
                                <i className="bi bi-bank me-2 text-success"></i>
                                Bank Name
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="accountHolderName"
                                placeholder="Account Holder Name"
                                name="accountHolderName"
                                onChange={handleBankDetailChange}
                            />

                            <label htmlFor="accountHolderName">
                                <i className="bi bi-person me-2 text-success"></i>
                                Account Holder Name
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
                                id="accountNumber"
                                placeholder="Account Number"
                                name="accountNumber"
                                onChange={handleBankDetailChange}
                            />

                            <label htmlFor="accountNumber">
                                <i className="bi bi-credit-card me-2 text-success"></i>
                                Account Number
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="ifscCode"
                                placeholder="IFSC Code"
                                name="ifscCode"
                                onChange={handleBankDetailChange}
                            />

                            <label htmlFor="ifscCode">
                                <i className="bi bi-upc-scan me-2 text-success"></i>
                                IFSC Code
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
                                id="branchName"
                                placeholder="Branch Name"
                                name="branchName"
                                onChange={handleBankDetailChange}
                            />

                            <label htmlFor="branchName">
                                <i className="bi bi-building me-2 text-success"></i>
                                Branch Name
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
                                <option value="Blocked">Blocked</option>
                            </select>

                            <label htmlFor="status">
                                <i className="bi bi-toggle-on me-2 text-success"></i>
                                Status
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Additional Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12">
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                id="notes"
                                placeholder="Notes"
                                style={{ height: "100px" }}
                                name="notes"
                                onChange={handleChange}
                            ></textarea>

                            <label htmlFor="notes">
                                <i className="bi bi-card-text me-2 text-success"></i>
                                Notes
                            </label>
                        </div>
                    </div>
                </div>


                <button
                    className="btn bg-primary-subtle mt-3 py-2 rounded-3 border border-primary fw-medium"
                    type="submit"
                >
                    <i className="fa-solid fa-truck-field me-2"></i>
                    Register Supplier
                </button>

            </form>
        </>
    )
}

export default RegisterSupplier