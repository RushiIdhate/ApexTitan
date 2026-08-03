const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
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

        attendanceDate: {
            type: Date,
            required: true,
            default: Date.now
        },

        loginTime: {
            type: Date,
            required: true,
            default: Date.now
        },

        logoutTime: {
            type: Date
        },

        status: {
            type: String,
            enum: [
                "Present",
                "Absent",
                "Half Day",
                "On Leave"
            ],
            default: "Present"
        },

        loginLocation: {
            latitude: {
                type: Number
            },

            longitude: {
                type: Number
            },

            address: {
                type: String,
                trim: true
            }
        },

        logoutLocation: {
            latitude: {
                type: Number
            },

            longitude: {
                type: Number
            },

            address: {
                type: String,
                trim: true
            }
        },

        deviceInfo: {
            type: String,
            trim: true
        },

        ipAddress: {
            type: String,
            trim: true
        },

        totalWorkingHours: {
            type: Number,
            default: 0,
            min: 0
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

// One attendance record per employee per day
attendanceSchema.index(
    {
        adminID: 1,
        employee: 1,
        attendanceDate: 1
    },
    {
        unique: true
    }
);

const Attendance = mongoose.model(
    "Attendance",
    attendanceSchema
);

module.exports = Attendance;