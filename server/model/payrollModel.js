const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
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

        payPeriod: {
            month: {
                type: Number,
                required: true,
                min: 1,
                max: 12
            },

            year: {
                type: Number,
                required: true
            }
        },

        basicSalary: {
            type: Number,
            required: true,
            min: 0
        },

        allowances: {
            housingAllowance: {
                type: Number,
                default: 0,
                min: 0
            },

            transportAllowance: {
                type: Number,
                default: 0,
                min: 0
            },

            medicalAllowance: {
                type: Number,
                default: 0,
                min: 0
            },

            otherAllowance: {
                type: Number,
                default: 0,
                min: 0
            }
        },

        deductions: {
            providentFund: {
                type: Number,
                default: 0,
                min: 0
            },

            professionalTax: {
                type: Number,
                default: 0,
                min: 0
            },

            incomeTax: {
                type: Number,
                default: 0,
                min: 0
            },

            loanDeduction: {
                type: Number,
                default: 0,
                min: 0
            },

            otherDeduction: {
                type: Number,
                default: 0,
                min: 0
            }
        },

        grossSalary: {
            type: Number,
            default: 0,
            min: 0
        },

        totalDeductions: {
            type: Number,
            default: 0,
            min: 0
        },

        netSalary: {
            type: Number,
            default: 0,
            min: 0
        },

        workingDays: {
            type: Number,
            default: 0,
            min: 0
        },

        presentDays: {
            type: Number,
            default: 0,
            min: 0
        },

        absentDays: {
            type: Number,
            default: 0,
            min: 0
        },

        leaveDays: {
            type: Number,
            default: 0,
            min: 0
        },

        paymentDate: {
            type: Date
        },

        paymentMethod: {
            type: String,
            enum: [
                "Cash",
                "Bank Transfer",
                "UPI",
                "Cheque"
            ]
        },

        paymentReference: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Draft",
                "Processed",
                "Paid",
                "Cancelled"
            ],
            default: "Draft"
        },

        remarks: {
            type: String,
            trim: true
        },

        processedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
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

payrollSchema.index(
    {
        adminID: 1,
        employee: 1,
        "payPeriod.month": 1,
        "payPeriod.year": 1
    },
    {
        unique: true
    }
);

const Payroll = mongoose.model(
    "Payroll",
    payrollSchema
);

module.exports = Payroll;