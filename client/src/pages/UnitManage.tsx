import axios from 'axios';
import React, { useEffect, useState } from 'react'

function UnitManage() {
    const [unit, setUnit] = useState([]);
    const [totalUnit, setTotalUnit] = useState("");
    const [totalActiveUnit, setTotalActiveUnit] = useState("");
    const token = sessionStorage.getItem('token');

    const fetchUnit = async() => {
        try {
            const response = await fetch(
                'http://localhost:5050/api/unit/viewUnit',
                {
                    method : "GET",
                    headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            const activeUnit = data.data.filter(item => item.status === "Active");

            setUnit(data.data);
            setTotalUnit(data.data.length);
            setTotalActiveUnit(activeUnit.length);
        } catch (error) {
            
        }
    };

    useEffect(() => {
        fetchUnit();
    }, []);
  return (
        <>
            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                <div>
                    <div className="page-title">Unit Directory</div>
                </div>
            </div>

            <div className="row g-3 mb-3">
                <div className="col-6">
                    <div className="stat-card" style={{ backgroundImage: "linear-gradient(to right, #457b9d, #5993ad, #70abbd, #8bc2cc, #a8dadc)" }}>
                        <div className="d-flex mb-3">
                            <i className="bi bi-people text-white fs-4"></i>
                            <span className="stat-label text-white ms-2 mt-1">Total Unit</span>
                        </div>
                        <div className="stat-value text-white">{totalUnit}</div>
                        </div>
                </div>
                <div className="col-6">
                    <div className="stat-card" style={{ backgroundImage: "linear-gradient(to right, #d4a373, #ddba8b, #e6d0a6, #f1e5c2, #faedcd)" }}>
                        <div className="d-flex mb-3">
                            <i className="bi bi-activity text-dark fs-4"></i>
                            <span className="stat-label text-dark ms-2 mt-1">Active Unit</span>
                        </div>
                        <div className="stat-value text-dark">{totalActiveUnit}</div>
                    </div>
                </div>
            </div>

            <div className="panel p-0">
                <div className="d-flex justify-content-between align-items-center p-4 pb-0 mb-2">
                    <a href="/unit-manage/register-unit" className='btn text-white ms-auto' style={{background : '#4f67d3'}}>
                        <i className='bi bi-person-fill-add me-1'></i> Register Unit
                    </a>
                </div>
                <hr className='mb-0'/>
                <div className="table-responsive">
                    <table className="table mb-0 align-middle">
                        <thead>
                            <tr>
                                <th>Unit Code</th>
                                <th>Unit Name</th>
                                <th>Symbol</th>
                                <th>Unit Type</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unit.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.unitCode}</td>
                                    <td>{item.unitName}</td>
                                    <td>{item.symbol}</td>
                                    <td>{item.unitType}</td>
                                    <td><span className="badge-status success">{item.status}</span></td>
                                    <td>{item.description}</td>
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

export default UnitManage