import axios from 'axios';
import React, { useEffect, useState } from 'react'

function RegisterProduct() {
    const [formData, setFormData] = useState({
        productName : "",
        productType : "",
        category : "",
        unit : "",
        description : "",
        brand : "",
        sku : "",
        barcode : "",
        minimumStockLevel : "",
        maximumStockLevel : "",
        reorderLevel : "",
        purchasePrice : "",
        sellingPrice : "",
        currency : "INR",
        hsnCode : "",
        gstRate : "",
        productImage : "",
        status : "",
        notes : ""
    });

    const [category, setCategory] = useState([""]);
    const [unit, setUnit] = useState([""]);
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
                'http://localhost:5050/api/product/registerProduct',
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
            setFailStatus(true);
        }
    };

    const fetchCategory = async() => {
        const response = await axios.get(
            'http://localhost:5050/api/category/viewCategory',
            {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            }
        );
        setCategory(response.data.data);
    };

    const fetchUnit = async() => {
        const response = await axios.get(
            'http://localhost:5050/api/unit/viewUnit',
            {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            }
        );
        setUnit(response.data.data);
    };

    useEffect(() => {
        fetchCategory();
        fetchUnit();
    }, []);

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
                                    <p>Product Registration is successfull.</p>
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
                                    <p>Product Registration is Failed.</p>
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
                    <div className="page-title">Product Registration</div>
                </div>
            </div>
            
            <form onSubmit={handleSubmit}>
                <p className='text-muted fs-6 fw-medium'>Product Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="productName"
                                placeholder="Product Name"
                                name='productName'
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="productName">
                                <i className="bi bi-box-seam me-2 text-success"></i>
                                Product Name
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="productType"
                                name='productType'
                                onChange={handleChange}
                                required
                            >
                                <option value="">--- Select Product Type ---</option>
                                <option value="Raw Material">Raw Material</option>
                                <option value="Component">Component</option>
                                <option value="Finished Goods">Finished Goods</option>
                                <option value="Semi Finished Goods">Semi Finished Goods</option>
                                <option value="Consumable">Consumable</option>
                            </select>

                            <label htmlFor="productType">
                                <i className="bi bi-boxes me-2 text-success"></i>
                                Product Type
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="category"
                                name='category'
                                onChange={handleChange}
                                required
                            >
                                <option value="">--- Select Category ---</option>
                                {category.map((item, index) => (
                                    <option value={`${item._id}`}>{item.categoryName}</option>
                                ))}
                            </select>

                            <label htmlFor="category">
                                <i className="bi bi-tags me-2 text-success"></i>
                                Category
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="unit"
                                name='unit'
                                onChange={handleChange}
                                required
                            >
                                <option value="">--- Select Unit ---</option>
                                {unit.map((item, index) => (
                                    <option value={`${item._id}`}>{item.unitName}</option>
                                ))}
                            </select>

                            <label htmlFor="unit">
                                <i className="bi bi-rulers me-2 text-success"></i>
                                Unit
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
                                id="brand"
                                placeholder="Brand"
                                name='brand'
                                onChange={handleChange}
                            />

                            <label htmlFor="brand">
                                <i className="bi bi-award me-2 text-success"></i>
                                Brand
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="sku"
                                placeholder="SKU"
                                name='sku'
                                onChange={handleChange}
                            />

                            <label htmlFor="sku">
                                <i className="bi bi-upc-scan me-2 text-success"></i>
                                SKU
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
                                id="barcode"
                                placeholder="Barcode"
                                name='barcode'
                                onChange={handleChange}
                            />

                            <label htmlFor="barcode">
                                <i className="bi bi-upc me-2 text-success"></i>
                                Barcode
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="hsnCode"
                                placeholder="HSN Code"
                                name='hsnCode'
                                onChange={handleChange}
                            />

                            <label htmlFor="hsnCode">
                                <i className="bi bi-card-text me-2 text-success"></i>
                                HSN Code
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Stock Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-4">
                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control py-1"
                                id="minimumStockLevel"
                                placeholder="Minimum Stock Level"
                                min="0"
                                name='minimumStockLevel'
                                onChange={handleChange}
                            />

                            <label htmlFor="minimumStockLevel">
                                <i className="bi bi-arrow-down-circle me-2 text-success"></i>
                                Minimum Stock Level
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control py-1"
                                id="maximumStockLevel"
                                placeholder="Maximum Stock Level"
                                min="0"
                                name='maximumStockLevel'
                                onChange={handleChange}
                            />

                            <label htmlFor="maximumStockLevel">
                                <i className="bi bi-arrow-up-circle me-2 text-success"></i>
                                Maximum Stock Level
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control py-1"
                                id="reorderLevel"
                                placeholder="Reorder Level"
                                min="0"
                                name='reorderLevel'
                                onChange={handleChange}
                            />

                            <label htmlFor="reorderLevel">
                                <i className="bi bi-arrow-repeat me-2 text-success"></i>
                                Reorder Level
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Pricing Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-4">
                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control py-1"
                                id="purchasePrice"
                                placeholder="Purchase Price"
                                min="0"
                                name='purchasePrice'
                                onChange={handleChange}
                            />

                            <label htmlFor="purchasePrice">
                                <i className="bi bi-cart me-2 text-success"></i>
                                Purchase Price
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control py-1"
                                id="sellingPrice"
                                placeholder="Selling Price"
                                min="0"
                                name='sellingPrice'
                                onChange={handleChange}
                            />

                            <label htmlFor="sellingPrice">
                                <i className="bi bi-cash-stack me-2 text-success"></i>
                                Selling Price
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control py-1"
                                id="currency"
                                placeholder="Currency"
                                defaultValue="INR"
                                name='currency'
                                onChange={handleChange}
                            />

                            <label htmlFor="currency">
                                <i className="bi bi-currency-rupee me-2 text-success"></i>
                                Currency
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
                                id="gstRate"
                                placeholder="GST Rate"
                                min="0"
                                max="100"
                                name='gstRate'
                                onChange={handleChange}
                            />

                            <label htmlFor="gstRate">
                                <i className="bi bi-percent me-2 text-success"></i>
                                GST Rate (%)
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Product Image</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-field">
                            <label htmlFor="productImage" className='mb-2'>
                                <i className="bi bi-image me-2 text-success"></i>
                                Product Image
                            </label>

                            <input
                                type="file"
                                className="form-control py-1"
                                id="productImage"
                                accept="image/*"
                            />
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Additional Information</p>
                <hr />

                <div className="row mb-3">
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
                                <option value="Discontinued">Discontinued</option>
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
                                id="notes"
                                placeholder="Notes"
                                name='notes'
                                onChange={handleChange}
                                style={{ height: "120px" }}
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
                    <i className="fa-solid fa-box me-2"></i>
                    Register Product
                </button>

            </form>
        </>
    )
}

export default RegisterProduct