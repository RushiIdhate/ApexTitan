import axios from "axios";
import { useEffect, useState } from "react";

function CustomerManage() {
    const token = sessionStorage.getItem('token');
    const [customer, setCustomer] = useState([""]);

    const fetchCustomer = async() => {
        try {
            const response = await axios.get('http://localhost:5050/api/customer/viewCustomer',
                {
                    method : 'GET',
                    headers : {
                        "Content-Type" : 'application/json',
                        "Authorization" : `Bearer ${token}`
                    }
                }
            )
            setCustomer(response.data.data);
        } catch (error) {
            
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, [])

    return (
        <>
            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                <div>
                    <div className="page-title">Customer Directory</div>
                </div>
            </div>

            <div className="row g-3 mb-3">
                <div className="col-6">
                    <div className="stat-card" style={{ backgroundImage: "linear-gradient(to right, #457b9d, #5993ad, #70abbd, #8bc2cc, #a8dadc)" }}>
                        <div className="d-flex mb-3">
                            <i className="bi bi-people text-white fs-4"></i>
                            <span className="stat-label text-white ms-2 mt-1">Total Customer</span>
                        </div>
                        <div className="stat-value text-white">$84,210</div>
                        </div>
                </div>
                <div className="col-6">
                    <div className="stat-card" style={{ backgroundImage: "linear-gradient(to right, #d4a373, #ddba8b, #e6d0a6, #f1e5c2, #faedcd)" }}>
                        <div className="d-flex mb-3">
                            <i className="bi bi-activity text-dark fs-4"></i>
                            <span className="stat-label text-dark ms-2 mt-1">Active Customer</span>
                        </div>
                        <div className="stat-value text-dark">6,342</div>
                    </div>
                </div>
            </div>

            <div className="panel p-0">
                <div className="d-flex justify-content-between align-items-center p-4 pb-0 mb-2">
                    <a href="/customer-manage/register-customer" className='btn text-white ms-auto' style={{background : '#4f67d3'}}>
                        <i className='bi bi-person-fill-add me-1'></i> Register Customer
                    </a>
                </div>
                <hr className='mb-0'/>
                <div className="table-responsive">
                    <table className="table mb-0 align-middle">
                        <thead>
                            <tr>
                                <th>Customer Code</th>
                                <th>Company Name</th>
                                <th>Customer Type</th>
                                <th>Contact Person</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>GST Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.customerCode}</td>
                                    <td>{item.companyName}</td>
                                    <td>{item.customerType}</td>
                                    <td>{item.contactPerson}</td>
                                    <td>{item.phone}</td>
                                    <td><span className="badge-status success">{item.status}</span></td>
                                    <td>{item.gstNumber}</td>
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

export default CustomerManage