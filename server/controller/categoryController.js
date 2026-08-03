const Category = require('../model/categoryModel.js');

const registerCategory = async (req, res) => {
    try {
        const {
            categoryName,
            description,
            status
        } = req.body;

        if (!categoryName) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Category Name is Required'
            });
        }

        const adminID = req.adminID;

        // Generate next Category Code
        let nextSeq = 1;

        const lastCategoryCode = await Category
            .findOne({ adminID })
            .sort({ _id: -1 });

        if (lastCategoryCode && lastCategoryCode.categoryCode) {
            const lastCode = parseInt(
                lastCategoryCode.categoryCode.split('-')[1],
                10
            );

            nextSeq = lastCode + 1;
        }

        const categoryCode = `CAT-${nextSeq
            .toString()
            .padStart(5, '0')}`;

        // Check if Category already exists
        const existCategory = await Category.findOne({
            adminID,
            categoryName
        });

        if (existCategory) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Category Already Exist.'
            });
        }

        // Create Category
        const response = await Category.create({
            adminID,
            categoryCode,
            categoryName,
            description,
            status
        });

        if (!response) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Category Registration failed...!'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Category Registration Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Category Registration failed...!',
            error: error.message
        });
    }
};


const viewCategory = async (req, res) => {
    try {
        const adminID = req.adminID;

        const CategoryData = await Category.find({ adminID })
            .populate(
                'createdBy',
                'firstName lastName employeeCode'
            )
            .populate(
                'updatedBy',
                'firstName lastName employeeCode'
            );

        if (!CategoryData) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Error in fetching Category Data'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Category Data Fetched Successfully',
            data: CategoryData
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Error in fetching Category Data',
            error: error.message
        });
    }
};


module.exports = {
    registerCategory,
    viewCategory
};