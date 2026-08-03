const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        employeeCode: {
            type: String,
            required: true,
            trim: true
        },

        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true
        },

        dateOfBirth: {
            type: Date,
            required: true
        },

        mobileNumber: {
            type: String,
            required: true,
            trim: true,
            match: [/^[0-9]{10}$/, "Please enter a valid mobile number"]
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        address: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        country: {
            type: String,
            default: "India",
            trim: true
        },

        pinCode: {
            type: String,
            required: true,
            trim: true
        },

        department: {
            type: String,
            required: true
        },

        designation: {
            type: String,
            required: true,
            trim: true
        },

        joiningDate: {
            type: Date,
            required: true
        },

        employeeType: {
            type: String,
            enum: [
                "Full Time",
                "Part Time",
                "Contract",
                "Intern"
            ],
            required: true
        },

        reportingManager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        },

        employeeStatus: {
            type: String,
            enum: [
                "Active",
                "On Leave",
                "Resigned",
                "Terminated"
            ],
            default: "Active"
        },

        basicPay: {
            type: Number,
            required: true,
            min: 0
        },

        salaryType: {
            type: String,
            enum: [
                "Monthly",
                "Hourly",
                "Yearly"
            ],
            default: "Monthly"
        },

        resume: {
            type: String
        },

        photo: {
            type: String
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

employeeSchema.index(
    {
        adminID: 1,
        employeeCode: 1
    },
    {
        unique: true
    }
);

const Employee = mongoose.model(
    "Employee",
    employeeSchema
);

module.exports = Employee;