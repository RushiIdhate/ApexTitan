import React from 'react'

function LeaveManage() {
  return (
    <>
            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                <div>
                    <div className="page-title">Employee Leave Directory</div>
                </div>
            </div>

            <div className="panel p-0">
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

export default LeaveManage