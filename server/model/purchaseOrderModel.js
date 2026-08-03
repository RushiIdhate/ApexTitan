const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        purchaseOrderNumber: {
            type: String,
            required: true,
            trim: true
        },

        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true
        },

        orderDate: {
            type: Date,
            default: Date.now
        },

        expectedDeliveryDate: {
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

                unitPrice: {
                    type: Number,
                    required: true,
                    min: 0
                },

                taxRate: {
                    type: Number,
                    default: 0,
                    min: 0,
                    max: 100
                },

                discount: {
                    type: Number,
                    default: 0,
                    min: 0
                },

                totalAmount: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ],

        subtotal: {
            type: Number,
            default: 0,
            min: 0
        },

        discountAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        taxAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        shippingCharges: {
            type: Number,
            default: 0,
            min: 0
        },

        otherCharges: {
            type: Number,
            default: 0,
            min: 0
        },

        grandTotal: {
            type: Number,
            default: 0,
            min: 0
        },

        currency: {
            type: String,
            default: "INR",
            trim: true
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

        shippingAddress: {
            warehouse: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Warehouse"
            },

            addressLine1: {
                type: String,
                trim: true
            },

            addressLine2: {
                type: String,
                trim: true
            },

            city: {
                type: String,
                trim: true
            },

            state: {
                type: String,
                trim: true
            },

            country: {
                type: String,
                default: "India",
                trim: true
            },

            pinCode: {
                type: String,
                trim: true
            }
        },

        status: {
            type: String,
            enum: [
                "Draft",
                "Pending Approval",
                "Approved",
                "Ordered",
                "Partially Received",
                "Received",
                "Cancelled",
                "Closed"
            ],
            default: "Draft"
        },

        notes: {
            type: String,
            trim: true
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

purchaseOrderSchema.index(
    {
        adminID: 1,
        purchaseOrderNumber: 1
    },
    {
        unique: true
    }
);

const PurchaseOrder = mongoose.model(
    "PurchaseOrder",
    purchaseOrderSchema
);

module.exports = PurchaseOrder;