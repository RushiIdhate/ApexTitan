const Leave = require('../model/leaveModel.js');
const Employee = require('../model/employeeModel.js');


// Apply for Leave
const registerLeave = async (req, res) => {
    try {
        const {
            employee,
            leaveType,
            startDate,
            endDate,
            reason,
            remarks
        } = req.body;

        if (
            !employee ||
            !leaveType ||
            !startDate ||
            !endDate ||
            !reason
        ) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Employee, Leave Type, Start Date, End Date and Reason are Required'
            });
        }

        const adminID = req.adminID;

        // Check if Start Date is before End Date
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Start Date cannot be greater than End Date'
            });
        }

        // Check if Employee belongs to logged-in Admin
        const existEmployee = await Employee.findOne({
            _id: employee,
            adminID
        });

        if (!existEmployee) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Invalid Employee'
            });
        }

        // Calculate Total Days
        const differenceInTime = end.getTime() - start.getTime();

        const totalDays =
            Math.floor(
                differenceInTime / (1000 * 60 * 60 * 24)
            ) + 1;

        // Check for overlapping leave
        const overlappingLeave = await Leave.findOne({
            adminID,
            employee,
            status: {
                $in: ['Pending', 'Approved']
            },
            startDate: {
                $lte: end
            },
            endDate: {
                $gte: start
            }
        });

        if (overlappingLeave) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Employee already has a leave request for the selected dates'
            });
        }

        // Create Leave
        const response = await Leave.create({
            adminID,
            employee,
            leaveType,
            startDate: start,
            endDate: end,
            totalDays,
            reason,
            remarks,
            createdBy: employee
        });

        if (!response) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Leave Application failed...!'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Leave Applied Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Leave Application failed...!',
            error: error.message
        });
    }
};


// View All Leaves
const viewLeave = async (req, res) => {
    try {
        const adminID = req.adminID;

        const LeaveData = await Leave.find({ adminID })
            .populate(
                'employee',
                'employeeCode firstName lastName department designation'
            )
            .populate(
                'approvedBy',
                'employeeCode firstName lastName'
            )
            .populate(
                'createdBy',
                'employeeCode firstName lastName'
            )
            .populate(
                'updatedBy',
                'employeeCode firstName lastName'
            )
            .sort({
                createdAt: -1
            });

        if (!LeaveData) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Error in fetching Leave Data'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Leave Data Fetched Successfully',
            data: LeaveData
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Error in fetching Leave Data',
            error: error.message
        });
    }
};


// Approve Leave
const approveLeave = async (req, res) => {
    try {
        const {
            leaveID,
            remarks
        } = req.body;

        if (!leaveID) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Leave ID is Required'
            });
        }

        const adminID = req.adminID;

        const leaveData = await Leave.findOne({
            _id: leaveID,
            adminID
        });

        if (!leaveData) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Leave not found'
            });
        }

        if (leaveData.status !== 'Pending') {
            return res.status(400).json({
                status: 'Fail',
                message: `Leave is already ${leaveData.status}`
            });
        }

        const response = await Leave.findOneAndUpdate(
            {
                _id: leaveID,
                adminID
            },
            {
                status: 'Approved',
                approvedBy: req.employeeID,
                approvalDate: new Date(),
                remarks: remarks || '',
                updatedBy: req.employeeID
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            status: 'Success',
            message: 'Leave Approved Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Leave Approval failed...!',
            error: error.message
        });
    }
};


// Reject Leave
const rejectLeave = async (req, res) => {
    try {
        const {
            leaveID,
            rejectionReason,
            remarks
        } = req.body;

        if (!leaveID || !rejectionReason) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Leave ID and Rejection Reason are Required'
            });
        }

        const adminID = req.adminID;

        const leaveData = await Leave.findOne({
            _id: leaveID,
            adminID
        });

        if (!leaveData) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Leave not found'
            });
        }

        if (leaveData.status !== 'Pending') {
            return res.status(400).json({
                status: 'Fail',
                message: `Leave is already ${leaveData.status}`
            });
        }

        const response = await Leave.findOneAndUpdate(
            {
                _id: leaveID,
                adminID
            },
            {
                status: 'Rejected',
                rejectionReason,
                remarks: remarks || '',
                updatedBy: req.employeeID
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            status: 'Success',
            message: 'Leave Rejected Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Leave Rejection failed...!',
            error: error.message
        });
    }
};


// Cancel Leave
const cancelLeave = async (req, res) => {
    try {
        const {
            leaveID,
            remarks
        } = req.body;

        if (!leaveID) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Leave ID is Required'
            });
        }

        const adminID = req.adminID;

        const leaveData = await Leave.findOne({
            _id: leaveID,
            adminID
        });

        if (!leaveData) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Leave not found'
            });
        }

        if (
            leaveData.status === 'Cancelled' ||
            leaveData.status === 'Rejected'
        ) {
            return res.status(400).json({
                status: 'Fail',
                message: `Leave cannot be cancelled because it is ${leaveData.status}`
            });
        }

        const response = await Leave.findOneAndUpdate(
            {
                _id: leaveID,
                adminID
            },
            {
                status: 'Cancelled',
                remarks: remarks || '',
                updatedBy: req.employeeID
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            status: 'Success',
            message: 'Leave Cancelled Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Leave Cancellation failed...!',
            error: error.message
        });
    }
};


module.exports = {
    registerLeave,
    viewLeave,
    approveLeave,
    rejectLeave,
    cancelLeave
};