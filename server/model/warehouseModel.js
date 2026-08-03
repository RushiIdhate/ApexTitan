const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        warehouseCode: {
            type: String,
            required: true,
            trim: true
        },

        warehouseName: {
            type: String,
            required: true,
            trim: true
        },

        warehouseType: {
            type: String,
            enum: [
                "Raw Material",
                "Finished Goods",
                "General",
                "Production",
                "Distribution"
            ],
            required: true
        },

        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
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

        contactNumber: {
            type: String,
            trim: true,
            match: [
                /^[0-9]{10}$/,
                "Please enter a valid contact number"
            ]
        },

        email: {
            type: String,
            lowercase: true,
            trim: true
        },

        capacity: {
            type: Number,
            min: 0
        },

        capacityUnit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit"
        },

        status: {
            type: String,
            enum: [
                "Active",
                "Inactive"
            ],
            default: "Active"
        },

        description: {
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

warehouseSchema.index(
    {
        adminID: 1,
        warehouseCode: 1
    },
    {
        unique: true
    }
);

const Warehouse = mongoose.model(
    "Warehouse",
    warehouseSchema
);

module.exports = Warehouse;