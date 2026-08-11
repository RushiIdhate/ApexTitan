import axios from 'axios';
import React, { useEffect, useState } from 'react'

function RegisterInventory() {
    const [formData, setFormData] = useState({
        product: "",
        warehouse: "",
        quantityOnHand: "",
        reservedQuantity: "",
        damagedQuantity: "",
        reorderLevel: "",
        reorderQuantity: "",
        lastStockMovement: "",
        status: ""
    });

    const [product, setProduct] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [successStatus, setSuccessStatus] = useState(false);
    const [failStatus, setFailStatus] = useState(false);

    const token = sessionStorage.getItem("token");

    const handleChange = (e) =>{
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name] : value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5050/api/inventory/registerInventory",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (response.status === 200) {
                setSuccessStatus(true);
            } else {
                setFailStatus(true);
            }
        } catch (error) {
            setFailStatus(true);
        }
    };

    const fetchProduct = async() => {
        try {
            const response = await axios.get('http://localhost:5050/api/product/viewProduct',
                {
                    headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token}`
                    }
                }
            );

            setProduct(response.data.data);
        } catch (error) {
            
        }
    };

    const fetchWarehouse = async() => {
        try {
            const response = await axios.get('http://localhost:5050/api/warehouse/viewWarehouse',
                {
                    headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token}`
                    }
                }
            );

            setWarehouse(response.data.data);
        } catch (error) {
            
        }
    };

    useEffect(() => {
        fetchProduct();
        fetchWarehouse();
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
                                    <p>Inventory Registration is successfull.</p>
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
                                    <p>Inventory Registration is Failed.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                <div>
                    <div className="page-title">Inventory Registration</div>
                </div>
            </div>
            
            <form onSubmit={handleSubmit}>
                <p className='text-muted fs-6 fw-medium'>Inventory Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="product"
                                name='product'
                                onChange={handleChange}
                                required
                            >
                                <option value="">--- Select Product ---</option>
                                {product.map((item, index) => (
                                    <option value={`${item._id}`}>{item.productName}</option>
                                ))}
                            </select>

                            <label htmlFor="product">
                                <i className="bi bi-box-seam me-2 text-success"></i>
                                Product
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <select
                                className="form-select"
                                id="warehouse"
                                name='warehouse'
                                onChange={handleChange}
                                required
                            >
                                <option value="">--- Select Warehouse ---</option>
                                {warehouse.map((item, index) => (
                                    <option value={`${item._id}`}>{item.warehouseName}</option>
                                ))}
                            </select>

                            <label htmlFor="warehouse">
                                <i className="bi bi-building me-2 text-success"></i>
                                Warehouse
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
                                id="quantityOnHand"
                                placeholder="Quantity On Hand"
                                name='quantityOnHand'
                                onChange={handleChange}
                            />

                            <label htmlFor="quantityOnHand">
                                <i className="bi bi-boxes me-2 text-success"></i>
                                Quantity On Hand
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control py-1"
                                id="reservedQuantity"
                                placeholder="Reserved Quantity"
                                name='reservedQuantity'
                                onChange={handleChange}
                            />

                            <label htmlFor="reservedQuantity">
                                <i className="bi bi-lock me-2 text-success"></i>
                                Reserved Quantity
                            </label>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control py-1"
                                id="damagedQuantity"
                                placeholder="Damaged Quantity"
                                min="0"
                                name='damagedQuantity'
                                onChange={handleChange}
                            />

                            <label htmlFor="damagedQuantity">
                                <i className="bi bi-exclamation-triangle me-2 text-success"></i>
                                Damaged Quantity
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Reorder Information</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
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

                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="number"
                                className="form-control py-1"
                                id="reorderQuantity"
                                placeholder="Reorder Quantity"
                                min="0"
                                name='reorderQuantity'
                                onChange={handleChange}
                            />

                            <label htmlFor="reorderQuantity">
                                <i className="bi bi-cart-plus me-2 text-success"></i>
                                Reorder Quantity
                            </label>
                        </div>
                    </div>
                </div>


                <p className='text-muted fs-6 fw-medium'>Stock Movement</p>
                <hr />

                <div className="row mb-3">
                    <div className="col-12 col-lg-6">
                        <div className="form-floating">
                            <input
                                type="date"
                                className="form-control py-1"
                                id="lastStockMovement"
                                name='lastStockMovement'
                                onChange={handleChange}
                            />

                            <label htmlFor="lastStockMovement">
                                <i className="bi bi-calendar-event me-2 text-success"></i>
                                Last Stock Movement
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


                <button
                    className="btn bg-primary-subtle mt-3 py-2 rounded-3 border border-primary fw-medium"
                    type="submit"
                >
                    <i className="fa-solid fa-boxes-stacked me-2"></i>
                    Add Inventory
                </button>

            </form>
        </>
    )
}

export default RegisterInventory