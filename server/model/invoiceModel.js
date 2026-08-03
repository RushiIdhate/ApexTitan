const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        invoiceNumber: {
            type: String,
            required: true,
            trim: true
        },

        invoiceType: {
            type: String,
            enum: [
                "Sales Invoice",
                "Purchase Invoice",
                "Credit Note",
                "Debit Note"
            ],
            required: true
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },

        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier"
        },

        salesOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SalesOrder"
        },

        purchaseOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PurchaseOrder"
        },

        invoiceDate: {
            type: Date,
            default: Date.now
        },

        dueDate: {
            type: Date
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                description: {
                    type: String,
                    trim: true
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

        amountPaid: {
            type: Number,
            default: 0,
            min: 0
        },

        amountDue: {
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

        billingAddress: {
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
                "Issued",
                "Partially Paid",
                "Paid",
                "Overdue",
                "Cancelled"
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

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        }
    },
    {
        timestamps: true
    }
);

invoiceSchema.index(
    {
        adminID: 1,
        invoiceNumber: 1
    },
    {
        unique: true
    }
);

const Invoice = mongoose.model(
    "Invoice",
    invoiceSchema
);

module.exports = Invoice;