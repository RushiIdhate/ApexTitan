import axios from "axios";
import { useState } from "react";

function RegisterCustomer() {
    const [formData, setFormData] = useState({
        companyName : "",
        customerType : "",
        industry : "",
        website : "",
        contactPerson : "",
        email : "",
        phone : "",
        alternatePhone : "",
        gstNumber : "",
        panNumber : "",
        taxType : "",
        billingAddress : {
            addressLine1 : "",
            addressLine2 : "",
            city : "",
            state : "",
            country : "",
            pinCode : ""
        },
        shippingAddress : {
            addressLine1 : "",
            addressLine2 : "",
            city : "",
            state : "",
            country : "",
            pinCode : ""
        },
        paymentTerms : "",
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
    const [successStatus, setSuccessStatus] = useState(false);
    const [failStatus, setFailStatus] = useState(false);
    const [sameAddress, setSameAddress] = useState(false);
    const [reason, setReason] = useState("");
    const token = sessionStorage.getItem('token');

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name] : value
        });
    };

    const handleBillingAddressChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            billingAddress : {
                ...formData.billingAddress,
                [name] : value
            }
        })
    };

    const handleShippingAddressChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            shippingAddress : {
                ...formData.shippingAddress,
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
            const response = await fetch('http://localhost:5050/api/customer/registerCustomer',
                {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token}`
                    },
                    body : JSON.stringify(formData)
                }
            )

            const data = await response.json();

            if(response.status === 200){
                setSuccessStatus(true);
            } else {
                setFailStatus(true);
                setReason(data.message);
            }
        } catch (error) {
            
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
                                    <p>Customer Registration is successfull.</p>
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
                                    <p>Customer Registration is Failed.</p>
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
                    <div className="page-title">Customer Registration</div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <p className='text-muted fs-6 fw-medium'>Customer Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12">
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
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="customerType"
                                name="customerType"
                                onChange={handleChange}
                            >
                                <option>--- Select Customer Type ---</option>
                                <option value="Business">Business</option>
                                <option value="Individual">Individual</option>
                            </select>

                            <label htmlFor="customerType">
                                <i className="bi bi-person-badge me-2 text-success"></i>
                                Customer Type
                            </label>
                        </div>
                    </div>

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
                </div>

                <div className="row mb-3">
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
                </div>

                <div className="row mb-3">
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
                </div>

                <div className="row mb-3">
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
                </div>

                <div className="row mb-3">
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


                <p className='text-muted fs-6 fw-medium'>Billing Address</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="billingAddressLine1"
                                placeholder="Address Line 1"
                                name="addressLine1"
                                onChange={handleBillingAddressChange}
                                required
                            />

                            <label htmlFor="billingAddressLine1">
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
                                id="billingAddressLine2"
                                placeholder="Address Line 2"
                                name="addressLine2"
                                onChange={handleBillingAddressChange}
                            />

                            <label htmlFor="billingAddressLine2">
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
                                id="billingCity"
                                placeholder="City"
                                name="city"
                                onChange={handleBillingAddressChange}
                                required
                            />

                            <label htmlFor="billingCity">
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
                                id="billingState"
                                placeholder="State"
                                name="state"
                                onChange={handleBillingAddressChange}
                                required
                            />

                            <label htmlFor="billingState">
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
                                id="billingCountry"
                                placeholder="Country"
                                defaultValue="India"
                                name="country"
                                onChange={handleBillingAddressChange}
                                required
                            />

                            <label htmlFor="billingCountry">
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
                                id="billingPinCode"
                                placeholder="PIN Code"
                                name="pinCode"
                                onChange={handleBillingAddressChange}
                                required
                            />

                            <label htmlFor="billingPinCode">
                                <i className="bi bi-geo me-2 text-success"></i>
                                PIN Code
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Shipping Address</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="sameAsBilling"
                                checked={sameAddress}
                                onChange={(e) => {
                                    setSameAddress(true);

                                    if(true){
                                        setFormData({
                                            ...formData,
                                            shippingAddress : {
                                                ...formData.shippingAddress
                                            }
                                        })
                                    }
                                }}
                            />

                            <label
                                className="form-check-label"
                                htmlFor="sameAsBilling"
                            >
                                Same as Billing Address
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
                                id="shippingAddressLine1"
                                placeholder="Address Line 1"
                                name="addressLine1"
                                onChange={handleShippingAddressChange}
                                disabled={sameAddress}
                            />

                            <label htmlFor="shippingAddressLine1">
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
                                id="shippingAddressLine2"
                                placeholder="Address Line 2"
                                name="addressLine2"
                                onChange={handleShippingAddressChange}
                                disabled={sameAddress}
                            />

                            <label htmlFor="shippingAddressLine2">
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
                                id="shippingCity"
                                placeholder="City"
                                name="city"
                                onChange={handleShippingAddressChange}
                                disabled={sameAddress}
                            />

                            <label htmlFor="shippingCity">
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
                                id="shippingState"
                                placeholder="State"
                                name="state"
                                onChange={handleShippingAddressChange}
                                disabled={sameAddress}
                            />

                            <label htmlFor="shippingState">
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
                                id="shippingCountry"
                                placeholder="Country"
                                defaultValue="India"
                                name="country"
                                onChange={handleShippingAddressChange}
                                disabled={sameAddress}
                            />

                            <label htmlFor="shippingCountry">
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
                                id="shippingPinCode"
                                placeholder="PIN Code"
                                name="pinCode"
                                onChange={handleShippingAddressChange}
                                disabled={sameAddress}
                            />

                            <label htmlFor="shippingPinCode">
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
                                <option>--- Select Payment Term ---</option>
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
                    <i className="fa-solid fa-user-plus me-2"></i>
                    Register Customer
                </button>

            </form>
        </>
    )
}

export default RegisterCustomer