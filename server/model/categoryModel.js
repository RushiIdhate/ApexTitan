const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        adminID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        categoryCode: {
            type: String,
            required: true,
            trim: true
        },

        categoryName: {
            type: String,
            required: true,
            trim: true
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

categorySchema.index(
    {
        adminID: 1,
        categoryCode: 1
    },
    {
        unique: true
    }
);

const Category = mongoose.model(
    "Category",
    categorySchema
);

module.exports = Category;