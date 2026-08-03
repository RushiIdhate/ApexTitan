const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        warehouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Warehouse",
            required: true
        },

        movementType: {
            type: String,
            enum: [
                "Purchase",
                "Sale",
                "Purchase Return",
                "Sales Return",
                "Production In",
                "Production Out",
                "Stock Transfer In",
                "Stock Transfer Out",
                "Stock Adjustment",
                "Damaged"
            ],
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        previousQuantity: {
            type: Number,
            required: true,
            min: 0
        },

        newQuantity: {
            type: Number,
            required: true,
            min: 0
        },

        referenceId: {
            type: mongoose.Schema.Types.ObjectId
        },

        referenceModel: {
            type: String,
            enum: [
                "PurchaseOrder",
                "GoodsReceipt",
                "SalesOrder",
                "ProductionOrder",
                "StockTransfer"
            ]
        },

        reason: {
            type: String,
            trim: true
        },

        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        }
    },
    {
        timestamps: true
    }
);

stockMovementSchema.index({
    adminID: 1,
    product: 1,
    warehouse: 1
});

const StockMovement = mongoose.model(
    "StockMovement",
    stockMovementSchema
);

module.exports = StockMovement;