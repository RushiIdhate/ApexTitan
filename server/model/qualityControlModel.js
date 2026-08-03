const mongoose = require("mongoose");

const qualityControlSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        inspectionNumber: {
            type: String,
            required: true,
            trim: true
        },

        inspectionType: {
            type: String,
            enum: [
                "Incoming Inspection",
                "In Process Inspection",
                "Final Inspection"
            ],
            required: true
        },

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        purchaseOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PurchaseOrder"
        },

        goodsReceipt: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GoodsReceipt"
        },

        productionOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductionOrder"
        },

        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse"
        },

        inspectionDate: {
            type: Date,
            default: Date.now
        },

        inspectedQuantity: {
            type: Number,
            required: true,
            min: 0
        },

        acceptedQuantity: {
            type: Number,
            default: 0,
            min: 0
        },

        rejectedQuantity: {
            type: Number,
            default: 0,
            min: 0
        },

        qualityParameters: [
            {
                parameterName: {
                    type: String,
                    required: true,
                    trim: true
                },

                expectedValue: {
                    type: String,
                    trim: true
                },

                actualValue: {
                    type: String,
                    trim: true
                },

                result: {
                    type: String,
                    enum: [
                        "Pass",
                        "Fail"
                    ]
                }
            }
        ],

        rejectionReason: {
            type: String,
            trim: true
        },

        overallResult: {
            type: String,
            enum: [
                "Passed",
                "Failed",
                "Partially Passed",
                "Pending"
            ],
            default: "Pending"
        },

        status: {
            type: String,
            enum: [
                "Draft",
                "In Progress",
                "Completed",
                "Cancelled"
            ],
            default: "Draft"
        },

        remarks: {
            type: String,
            trim: true
        },

        inspectedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },

        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true
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

qualityControlSchema.index(
    {
        adminID: 1,
        inspectionNumber: 1
    },
    {
        unique: true
    }
);

const QualityControl = mongoose.model(
    "QualityControl",
    qualityControlSchema
);

module.exports = QualityControl;