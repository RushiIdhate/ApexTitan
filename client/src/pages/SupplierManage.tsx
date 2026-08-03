import axios from "axios";
import { useState, useEffect } from "react";

function SupplierManage() {
    const [supplier, setSupplier] = useState([""]);
    const token = sessionStorage.getItem('token');

    const fetchSupplier = async() => {
        try {
            const response = await axios.get('http://localhost:5050/api/supplier/viewSupplier', 
                {
                    headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token}`
                    }
                }
            );

            setSupplier(response.data.data);
        } catch (error) {
            
        }
    };

    useEffect(() => {
        fetchSupplier();
    }, []);
    return (
        <>
            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                <div>
                    <div className="page-title">Supplier Directory</div>
                </div>
            </div>

            <div className="row g-3 mb-3">
                <div className="col-6">
                    <div className="stat-card" style={{ backgroundImage: "linear-gradient(to right, #457b9d, #5993ad, #70abbd, #8bc2cc, #a8dadc)" }}>
                        <div className="d-flex mb-3">
                            <i className="bi bi-people text-white fs-4"></i>
                            <span className="stat-label text-white ms-2 mt-1">Total Supplier</span>
                        </div>
                        <div className="stat-value text-white">$84,210</div>
                        </div>
                </div>
                <div className="col-6">
                    <div className="stat-card" style={{ backgroundImage: "linear-gradient(to right, #d4a373, #ddba8b, #e6d0a6, #f1e5c2, #faedcd)" }}>
                        <div className="d-flex mb-3">
                            <i className="bi bi-activity text-dark fs-4"></i>
                            <span className="stat-label text-dark ms-2 mt-1">Active Supplier</span>
                        </div>
                        <div className="stat-value text-dark">6,342</div>
                    </div>
                </div>
            </div>

            <div className="panel p-0">
                <div className="d-flex justify-content-between align-items-center p-4 pb-0 mb-2">
                    <a href="/supplier-manage/register-supplier" className='btn text-white ms-auto' style={{background : '#4f67d3'}}>
                        <i className='bi bi-person-fill-add me-1'></i> Register Supplier
                    </a>
                </div>
                <hr className='mb-0'/>
                <div className="table-responsive">
                    <table className="table mb-0 align-middle">
                        <thead>
                            <tr>
                                <th>Supplier Code</th>
                                <th>Supplier Type</th>
                                <th>Company Name</th>
                                <th>Industry</th>
                                <th>Contact Person</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {supplier.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.supplierCode}</td>
                                    <td>{item.supplierType}</td>
                                    <td>{item.companyName}</td>
                                    <td>{item.industry}</td>
                                    <td>{item.contactPerson}</td>
                                    <td>{item.phone}</td>
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

export default SupplierManage