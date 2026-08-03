const mongoose = require("mongoose");

const productionOrderSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        productionOrderNumber: {
            type: String,
            required: true,
            trim: true
        },

        bom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BOM",
            required: true
        },

        finishedProduct: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        plannedQuantity: {
            type: Number,
            required: true,
            min: 0
        },

        producedQuantity: {
            type: Number,
            default: 0,
            min: 0
        },

        rejectedQuantity: {
            type: Number,
            default: 0,
            min: 0
        },

        productionWarehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true
        },

        plannedStartDate: {
            type: Date,
            required: true
        },

        plannedEndDate: {
            type: Date,
            required: true
        },

        actualStartDate: {
            type: Date
        },

        actualEndDate: {
            type: Date
        },

        components: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                requiredQuantity: {
                    type: Number,
                    required: true,
                    min: 0
                },

                consumedQuantity: {
                    type: Number,
                    default: 0,
                    min: 0
                }
            }
        ],

        priority: {
            type: String,
            enum: [
                "Low",
                "Medium",
                "High",
                "Urgent"
            ],
            default: "Medium"
        },

        status: {
            type: String,
            enum: [
                "Draft",
                "Planned",
                "Released",
                "In Progress",
                "Paused",
                "Completed",
                "Cancelled"
            ],
            default: "Draft"
        },

        notes: {
            type: String,
            trim: true
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },

        approvedBy: {
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

productionOrderSchema.index(
    {
        adminID: 1,
        productionOrderNumber: 1
    },
    {
        unique: true
    }
);

const ProductionOrder = mongoose.model(
    "ProductionOrder",
    productionOrderSchema
);

module.exports = ProductionOrder;