const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },

        notificationType: {
            type: String,
            enum: [
                "Low Stock",
                "Out of Stock",
                "Purchase Order",
                "Sales Order",
                "Production",
                "Quality Control",
                "Payment",
                "Invoice",
                "Stock Transfer",
                "System"
            ],
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        referenceId: {
            type: mongoose.Schema.Types.ObjectId
        },

        referenceModel: {
            type: String,
            enum: [
                "Product",
                "Inventory",
                "PurchaseOrder",
                "SalesOrder",
                "ProductionOrder",
                "QualityControl",
                "Invoice",
                "Payment",
                "StockTransfer"
            ]
        },

        isRead: {
            type: Boolean,
            default: false
        },

        readAt: {
            type: Date
        },

        priority: {
            type: String,
            enum: [
                "Low",
                "Medium",
                "High",
                "Critical"
            ],
            default: "Medium"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        }
    },
    {
        timestamps: true
    }
);

notificationSchema.index({
    adminID: 1,
    recipient: 1,
    isRead: 1
});

const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

module.exports = Notification;