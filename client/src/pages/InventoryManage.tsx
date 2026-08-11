import axios from 'axios';
import React, { useEffect, useState } from 'react'

function InventoryManage() {
    const [inventory, setInventory] = useState([]);
    const token = sessionStorage.getItem('token');

    const fetchInventory = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5050/api/inventory/viewInventory",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            setInventory(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);
    return (
        <>
            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                <div>
                    <div className="page-title">Inventory Directory</div>
                </div>
            </div>

            <div className="row g-3 mb-3">
                <div className="col-6 col-lg-3">
                    <div className="stat-card" style={{ backgroundImage: "linear-gradient(to right, #457b9d, #5993ad, #70abbd, #8bc2cc, #a8dadc)" }}>
                        <div className="d-flex mb-3">
                            <i className="bi bi-people text-white fs-4"></i>
                            <span className="stat-label text-white ms-2 mt-1">Total Products</span>
                        </div>
                        <div className="stat-value text-white">$84,210</div>
                        </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="stat-card" style={{ backgroundImage: "linear-gradient(to right, #d4a373, #ddba8b, #e6d0a6, #f1e5c2, #faedcd)" }}>
                        <div className="d-flex mb-3">
                            <i className="bi bi-activity text-dark fs-4"></i>
                            <span className="stat-label text-dark ms-2 mt-1">Active Products</span>
                        </div>
                        <div className="stat-value text-dark">6,342</div>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="stat-card" style={{ backgroundImage: "linear-gradient(to right, #c9ada7, #d3bcb5, #ddcbc4, #e7dad4, #f2e9e4)" }}>
                        <div className="d-flex mb-3">
                            <i className="bi bi-briefcase text-dark fs-4"></i>
                            <span className="stat-label text-dark ms-2 mt-1">Total Damaged Qty</span>
                        </div>
                        <div className="stat-value text-dark">1,208</div>
                    </div>
                </div>  
                <div className="col-6 col-lg-3">
                    <div className="stat-card" style={{ backgroundImage: "linear-gradient(to right, #84a98c, #97b399, #a9bda6, #bac7b5, #cad2c5)" }}>
                        <div className="d-flex mb-3">
                            <i className="bi bi-layout-wtf text-white fs-4"></i>
                            <span className="stat-label text-white ms-2 mt-1">Total Reserved Qty</span>
                        </div>
                        <div className="stat-value text-white">2.3%</div>
                    </div>
                </div>
            </div>

            <div className="panel p-0">
                <div className="d-flex justify-content-between align-items-center p-4 pb-0 mb-2">
                    <a href="/inventory-manage/register-inventory" className='btn text-white ms-auto' style={{background : '#4f67d3'}}>
                        <i className='bi bi-person-fill-add me-1'></i> Register Inventory
                    </a>
                </div>
                <hr className='mb-0'/>
                <div className="table-responsive">
                    <table className="table mb-0 align-middle">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Purchase Price</th>
                                <th>Selling Price</th>
                                <th>Qty</th>
                                <th>Warehouse Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product.productName}</td>
                                    <td>{item.product.productType}</td>
                                    <td>{item.product.purchasePrice}</td>
                                    <td>{item.product.sellingPrice}</td>
                                    <td>{item.quantityOnHand}</td>
                                    <td>{item.warehouse.warehouseName}</td>
                                    <td><span className="badge-status success">{item.status}</span></td>
                                    <td className='px-1'>
                                        <a href="#" className='text-danger'><i className='bi bi-trash fs-6'></i></a>
                                        <a href="#" className='ms-2 text-warning'><i className='bi bi-arrow-repeat fs-6'></i></a>
                                        <a href="#" className='ms-2 text-success'><i className='bi bi-person-lines-fill fs-6'></i></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
  )
}

export default InventoryManage