const mongoose = require("mongoose");

const stockTransferSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        transferCode: {
            type: String,
            required: true,
            trim: true
        },

        fromWarehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true
        },

        toWarehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true
        },

        transferDate: {
            type: Date,
            default: Date.now
        },

        expectedArrivalDate: {
            type: Date
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 0
                },

                receivedQuantity: {
                    type: Number,
                    default: 0,
                    min: 0
                }
            }
        ],

        status: {
            type: String,
            enum: [
                "Draft",
                "Pending",
                "In Transit",
                "Completed",
                "Cancelled"
            ],
            default: "Draft"
        },

        reason: {
            type: String,
            trim: true
        },

        notes: {
            type: String,
            trim: true
        },

        requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },

        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        },

        completedBy: {
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

stockTransferSchema.index(
    {
        adminID: 1,
        transferCode: 1
    },
    {
        unique: true
    }
);

const StockTransfer = mongoose.model(
    "StockTransfer",
    stockTransferSchema
);

module.exports = StockTransfer;