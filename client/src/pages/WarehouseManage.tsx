import axios from 'axios';
import React, { useEffect, useState } from 'react'

function WarehouseManage() {
    const [warehouse, setWarehouse] = useState([]);
    const token = sessionStorage.getItem('token');

    const fetchWarehouse = async() => {
        try {
            const response = await axios.get(
                'http://localhost:5050/api/warehouse/viewWarehouse',
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
        fetchWarehouse();
    }, []);
    return (
    <>
            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                <div>
                    <div className="page-title">Warehouse Directory</div>
                </div>
            </div>

            <div className="panel p-0">
                <div className="d-flex justify-content-between align-items-center p-4 pb-0 mb-2">
                    <a href="/warehouse-manage/register-warehouse" className='btn text-white ms-auto' style={{background : '#4f67d3'}}>
                        <i className='bi bi-person-fill-add me-1'></i> Register Warehouse
                    </a>
                </div>
                <hr className='mb-0'/>
                <div className="table-responsive">
                    <table className="table mb-0 align-middle">
                        <thead>
                            <tr>
                                <th>Warehouse Code</th>
                                <th>Warehouse Name</th>
                                <th>Warehouse Type</th>
                                <th>Manager</th>
                                <th>Capacity</th>
                                <th>Status</th>
                                <th>capacityUnit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {warehouse.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.warehouseCode}</td>
                                    <td>{item.warehouseName}</td>
                                    <td>{item.warehouseType}</td>
                                    <td>{item.manager.firstName} {item.manager.lastName}</td>
                                    <td>{item.capacity}</td>
                                    <td><span className="badge-status success">{item.status}</span></td>
                                    <td>{item.capacityUnit.unitName}</td>
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

export default WarehouseManage