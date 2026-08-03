import React from 'react'

function InventoryManage() {
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
                            <span className="stat-label text-white ms-2 mt-1">Total Employee</span>
                        </div>
                        <div className="stat-value text-white">$84,210</div>
                        </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="stat-card" style={{ backgroundImage: "linear-gradient(to right, #d4a373, #ddba8b, #e6d0a6, #f1e5c2, #faedcd)" }}>
                        <div className="d-flex mb-3">
                            <i className="bi bi-activity text-dark fs-4"></i>
                            <span className="stat-label text-dark ms-2 mt-1">Active Employee</span>
                        </div>
                        <div className="stat-value text-dark">6,342</div>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="stat-card" style={{ backgroundImage: "linear-gradient(to right, #c9ada7, #d3bcb5, #ddcbc4, #e7dad4, #f2e9e4)" }}>
                        <div className="d-flex mb-3">
                            <i className="bi bi-briefcase text-dark fs-4"></i>
                            <span className="stat-label text-dark ms-2 mt-1">On Leave / Remote</span>
                        </div>
                        <div className="stat-value text-dark">1,208</div>
                    </div>
                </div>  
                <div className="col-6 col-lg-3">
                    <div className="stat-card" style={{ backgroundImage: "linear-gradient(to right, #84a98c, #97b399, #a9bda6, #bac7b5, #cad2c5)" }}>
                        <div className="d-flex mb-3">
                            <i className="bi bi-layout-wtf text-white fs-4"></i>
                            <span className="stat-label text-white ms-2 mt-1">Departments</span>
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
                                <th>Employee Code</th>
                                <th>Employee Name</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Basic Pay</th>
                                <th>Status</th>
                                <th>Employement Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
  )
}

export default InventoryManage