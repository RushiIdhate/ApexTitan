const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        unitCode: {
            type: String,
            required: true,
            trim: true
        },

        unitName: {
            type: String,
            required: true,
            trim: true
        },

        symbol: {
            type: String,
            required: true,
            trim: true
        },

        unitType: {
            type: String,
            enum: [
                "Quantity",
                "Weight",
                "Length",
                "Volume",
                "Area",
                "Time",
                "Other"
            ],
            required: true
        },

        description: {
            type: String,
            trim: true
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

unitSchema.index(
    {
        adminID: 1,
        unitCode: 1
    },
    {
        unique: true
    }
);

const Unit = mongoose.model(
    "Unit",
    unitSchema
);

module.exports = Unit;