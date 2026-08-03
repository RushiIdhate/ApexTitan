const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },

        leaveType: {
            type: String,
            enum: [
                "Casual Leave",
                "Sick Leave",
                "Paid Leave",
                "Unpaid Leave",
                "Emergency Leave",
                "Other"
            ],
            required: true
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        totalDays: {
            type: Number,
            required: true,
            min: 0
        },

        reason: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Approved",
                "Rejected",
                "Cancelled"
            ],
            default: "Pending"
        },

        appliedDate: {
            type: Date,
            default: Date.now
        },

        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        },

        approvalDate: {
            type: Date
        },

        rejectionReason: {
            type: String,
            trim: true
        },

        remarks: {
            type: String,
            trim: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        }
    },
    {
        timestamps: true
    }
);

leaveSchema.index({
    adminID: 1,
    employee: 1,
    startDate: 1
});

const Leave = mongoose.model(
    "Leave",
    leaveSchema
);

module.exports = Leave;