const mongoose = require("mongoose");

const bomSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        bomNumber: {
            type: String,
            required: true,
            trim: true
        },

        bomName: {
            type: String,
            required: true,
            trim: true
        },

        finishedProduct: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        version: {
            type: String,
            default: "1.0",
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        quantityProduced: {
            type: Number,
            required: true,
            min: 0
        },

        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
            required: true
        },

        components: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                quantityRequired: {
                    type: Number,
                    required: true,
                    min: 0
                },

                unit: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Unit",
                    required: true
                },

                wastagePercentage: {
                    type: Number,
                    default: 0,
                    min: 0,
                    max: 100
                }
            }
        ],

        laborCost: {
            type: Number,
            default: 0,
            min: 0
        },

        overheadCost: {
            type: Number,
            default: 0,
            min: 0
        },

        totalMaterialCost: {
            type: Number,
            default: 0,
            min: 0
        },

        totalProductionCost: {
            type: Number,
            default: 0,
            min: 0
        },

        effectiveFrom: {
            type: Date,
            default: Date.now
        },

        effectiveTo: {
            type: Date
        },

        status: {
            type: String,
            enum: [
                "Draft",
                "Active",
                "Inactive",
                "Archived"
            ],
            default: "Draft"
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

bomSchema.index(
    {
        adminID: 1,
        bomNumber: 1
    },
    {
        unique: true
    }
);

const BOM = mongoose.model(
    "BOM",
    bomSchema
);

module.exports = BOM;