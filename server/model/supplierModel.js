const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        supplierCode: {
            type: String,
            required: true,
            trim: true
        },

        companyName: {
            type: String,
            required: true,
            trim: true
        },

        supplierType: {
            type: String,
            enum: [
                "Raw Material",
                "Finished Goods",
                "Machinery",
                "Packaging",
                "Services",
                "Other"
            ],
            required: true
        },

        industry: {
            type: String,
            trim: true
        },

        website: {
            type: String,
            trim: true
        },

        contactPerson: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true,
            match: [
                /^[0-9]{10}$/,
                "Please enter a valid phone number"
            ]
        },

        alternatePhone: {
            type: String,
            trim: true
        },

        gstNumber: {
            type: String,
            trim: true,
            uppercase: true
        },

        panNumber: {
            type: String,
            trim: true,
            uppercase: true
        },

        taxType: {
            type: String,
            enum: [
                "GST",
                "Non-GST",
                "Export"
            ],
            default: "GST"
        },

        address: {
            addressLine1: {
                type: String,
                required: true,
                trim: true
            },

            addressLine2: {
                type: String,
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
            }
        },

        paymentTerms: {
            type: String,
            enum: [
                "Advance Payment",
                "Due on Receipt",
                "Net 15",
                "Net 30",
                "Net 45",
                "Net 60",
                "Net 90"
            ],
            default: "Due on Receipt"
        },

        creditLimit: {
            type: Number,
            default: 0,
            min: 0
        },

        currency: {
            type: String,
            default: "INR"
        },

        bankDetails: {
            bankName: {
                type: String,
                trim: true
            },

            accountHolderName: {
                type: String,
                trim: true
            },

            accountNumber: {
                type: String,
                trim: true
            },

            ifscCode: {
                type: String,
                trim: true,
                uppercase: true
            },

            branchName: {
                type: String,
                trim: true
            }
        },

        status: {
            type: String,
            enum: [
                "Active",
                "Inactive",
                "Blocked"
            ],
            default: "Active"
        },

        notes: {
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

supplierSchema.index(
    {
        adminID: 1,
        supplierCode: 1
    },
    {
        unique: true
    }
);

const Supplier = mongoose.model(
    "Supplier",
    supplierSchema
);

module.exports = Supplier;