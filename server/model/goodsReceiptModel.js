const mongoose = require("mongoose");

const goodsReceiptSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        receiptNumber: {
            type: String,
            required: true,
            trim: true
        },

        purchaseOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PurchaseOrder",
            required: true
        },

        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true
        },

        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true
        },

        receiptDate: {
            type: Date,
            default: Date.now
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                orderedQuantity: {
                    type: Number,
                    required: true,
                    min: 0
                },

                receivedQuantity: {
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

                rejectionReason: {
                    type: String,
                    trim: true
                }
            }
        ],

        status: {
            type: String,
            enum: [
                "Draft",
                "Pending Inspection",
                "Partially Accepted",
                "Accepted",
                "Rejected",
                "Completed"
            ],
            default: "Draft"
        },

        deliveryNoteNumber: {
            type: String,
            trim: true
        },

        invoiceNumber: {
            type: String,
            trim: true
        },

        notes: {
            type: String,
            trim: true
        },

        receivedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },

        inspectedBy: {
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

goodsReceiptSchema.index(
    {
        adminID: 1,
        receiptNumber: 1
    },
    {
        unique: true
    }
);

const GoodsReceipt = mongoose.model(
    "GoodsReceipt",
    goodsReceiptSchema
);

module.exports = GoodsReceipt;