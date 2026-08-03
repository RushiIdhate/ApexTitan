const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
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

        quantityOnHand: {
            type: Number,
            default: 0,
            min: 0
        },

        reservedQuantity: {
            type: Number,
            default: 0,
            min: 0
        },

        damagedQuantity: {
            type: Number,
            default: 0,
            min: 0
        },

        reorderLevel: {
            type: Number,
            default: 0,
            min: 0
        },

        reorderQuantity: {
            type: Number,
            default: 0,
            min: 0
        },

        lastStockMovement: {
            type: Date
        },

        status: {
            type: String,
            enum: [
                "Active",
                "Inactive"
            ],
            default: "Active"
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

inventorySchema.index(
    {
        adminID: 1,
        product: 1,
        warehouse: 1
    },
    {
        unique: true
    }
);

const Inventory = mongoose.model(
    "Inventory",
    inventorySchema
);

module.exports = Inventory;