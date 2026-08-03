const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        productCode: {
            type: String,
            required: true,
            trim: true
        },

        productName: {
            type: String,
            required: true,
            trim: true
        },

        productType: {
            type: String,
            enum: [
                "Raw Material",
                "Component",
                "Finished Goods",
                "Semi Finished Goods",
                "Consumable"
            ],
            required: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
            required: true
        },

        description: {
            type: String,
            trim: true
        },

        brand: {
            type: String,
            trim: true
        },

        sku: {
            type: String,
            trim: true
        },

        barcode: {
            type: String,
            trim: true
        },

        minimumStockLevel: {
            type: Number,
            default: 0,
            min: 0
        },

        maximumStockLevel: {
            type: Number,
            default: 0,
            min: 0
        },

        reorderLevel: {
            type: Number,
            default: 0,
            min: 0
        },

        purchasePrice: {
            type: Number,
            default: 0,
            min: 0
        },

        sellingPrice: {
            type: Number,
            default: 0,
            min: 0
        },

        currency: {
            type: String,
            default: "INR",
            trim: true
        },

        hsnCode: {
            type: String,
            trim: true
        },

        gstRate: {
            type: Number,
            default: 18,
            min: 0,
            max: 100
        },

        productImage: {
            type: String
        },

        status: {
            type: String,
            enum: [
                "Active",
                "Inactive",
                "Discontinued"
            ],
            default: "Active"
        },

        notes: {
            type: String,
            trim: true
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

productSchema.index(
    {
        adminID: 1,
        productCode: 1
    },
    {
        unique: true
    }
);

productSchema.index(
    {
        adminID: 1,
        sku: 1
    },
    {
        unique: true,
        sparse: true
    }
);

productSchema.index(
    {
        adminID: 1,
        barcode: 1
    },
    {
        unique: true,
        sparse: true
    }
);

const Product = mongoose.model(
    "Product",
    productSchema
);

module.exports = Product;