const Product = require('../model/productModel.js');
const Category = require('../model/categoryModel.js');
const Unit = require('../model/unitModel.js');

const registerProduct = async (req, res) => {
    try {
        const {
            productName,
            productType,
            category,
            unit,
            description,
            brand,
            sku,
            barcode,
            minimumStockLevel,
            maximumStockLevel,
            reorderLevel,
            purchasePrice,
            sellingPrice,
            currency,
            hsnCode,
            gstRate,
            productImage,
            status,
            notes
        } = req.body;

        if (
            !productName ||
            !productType ||
            !category ||
            !unit
        ) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Product Name, Product Type, Category and Unit are Required'
            });
        }

        const adminID = req.adminID;

        // Check if Category belongs to logged-in Admin
        const existCategory = await Category.findOne({
            _id: category,
            adminID
        });

        if (!existCategory) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Invalid Category'
            });
        }

        // Check if Unit belongs to logged-in Admin
        const existUnit = await Unit.findOne({
            _id: unit,
            adminID
        });

        if (!existUnit) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Invalid Unit'
            });
        }

        // Generate next Product Code
        let nextSeq = 1;

        const lastProductCode = await Product
            .findOne({ adminID })
            .sort({ _id: -1 });

        if (lastProductCode && lastProductCode.productCode) {
            const lastCode = parseInt(
                lastProductCode.productCode.split('-')[1],
                10
            );

            nextSeq = lastCode + 1;
        }

        const productCode = `PROD-${nextSeq
            .toString()
            .padStart(5, '0')}`;

        // Check if Product Name already exists
        const existProduct = await Product.findOne({
            adminID,
            productName
        });

        if (existProduct) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Product Already Exist.'
            });
        }

        // Check SKU if provided
        if (sku) {
            const existSKU = await Product.findOne({
                adminID,
                sku
            });

            if (existSKU) {
                return res.status(400).json({
                    status: 'Fail',
                    message: 'SKU Already Exist.'
                });
            }
        }

        // Check Barcode if provided
        if (barcode) {
            const existBarcode = await Product.findOne({
                adminID,
                barcode
            });

            if (existBarcode) {
                return res.status(400).json({
                    status: 'Fail',
                    message: 'Barcode Already Exist.'
                });
            }
        }

        // Create Product
        const response = await Product.create({
            adminID,
            productCode,
            productName,
            productType,
            category,
            unit,
            description,
            brand,
            sku,
            barcode,
            minimumStockLevel,
            maximumStockLevel,
            reorderLevel,
            purchasePrice,
            sellingPrice,
            currency,
            hsnCode,
            gstRate,
            productImage,
            status,
            notes
        });

        if (!response) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Product Registration failed...!'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Product Registration Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Product Registration failed...!',
            error: error.message
        });
    }
};


const viewProduct = async (req, res) => {
    try {
        const adminID = req.adminID;

        const ProductData = await Product.find({ adminID })
            .populate(
                'category',
                'categoryCode categoryName'
            )
            .populate(
                'unit',
                'unitCode unitName symbol unitType'
            )
            .populate(
                'createdBy',
                'firstName lastName employeeCode'
            )
            .populate(
                'updatedBy',
                'firstName lastName employeeCode'
            );

        if (!ProductData) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Error in fetching Product Data'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Product Data Fetched Successfully',
            data: ProductData
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Error in fetching Product Data',
            error: error.message
        });
    }
};


module.exports = {
    registerProduct,
    viewProduct
};