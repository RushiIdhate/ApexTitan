const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        paymentNumber: {
            type: String,
            required: true,
            trim: true
        },

        paymentType: {
            type: String,
            enum: [
                "Customer Payment",
                "Supplier Payment",
                "Refund"
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

        invoice: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invoice"
        },

        paymentDate: {
            type: Date,
            default: Date.now
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        paymentMethod: {
            type: String,
            enum: [
                "Cash",
                "Bank Transfer",
                "UPI",
                "Credit Card",
                "Debit Card",
                "Cheque",
                "Other"
            ],
            required: true
        },

        transactionReference: {
            type: String,
            trim: true
        },

        bankName: {
            type: String,
            trim: true
        },

        chequeNumber: {
            type: String,
            trim: true
        },

        currency: {
            type: String,
            default: "INR",
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Completed",
                "Failed",
                "Cancelled",
                "Refunded"
            ],
            default: "Pending"
        },

        notes: {
            type: String,
            trim: true
        },

        receivedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        },

        processedBy: {
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

paymentSchema.index(
    {
        adminID: 1,
        paymentNumber: 1
    },
    {
        unique: true
    }
);

const Payment = mongoose.model(
    "Payment",
    paymentSchema
);

module.exports = Payment;