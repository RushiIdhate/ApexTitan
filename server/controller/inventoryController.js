const Inventory = require('../model/inventoryModel.js');
const Product = require('../model/productModel.js');
const Warehouse = require('../model/warehouseModel.js');


// Register Inventory
const registerInventory = async (req, res) => {
    try {
        const {
            product,
            warehouse,
            quantityOnHand,
            reservedQuantity,
            damagedQuantity,
            reorderLevel,
            reorderQuantity,
            status
        } = req.body;

        if (!product || !warehouse) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Product and Warehouse are Required'
            });
        }

        const adminID = req.adminID;

        // Check if Product belongs to logged-in Admin
        const existProduct = await Product.findOne({
            _id: product,
            adminID
        });

        if (!existProduct) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Invalid Product'
            });
        }

        // Check if Warehouse belongs to logged-in Admin
        const existWarehouse = await Warehouse.findOne({
            _id: warehouse,
            adminID
        });

        if (!existWarehouse) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Invalid Warehouse'
            });
        }

        // Check if Inventory already exists
        const existInventory = await Inventory.findOne({
            adminID,
            product,
            warehouse
        });

        if (existInventory) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Inventory for this Product and Warehouse Already Exist.'
            });
        }

        // Validate Reserved Quantity
        if (
            reservedQuantity !== undefined &&
            quantityOnHand !== undefined &&
            reservedQuantity > quantityOnHand
        ) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Reserved Quantity cannot be greater than Quantity on Hand'
            });
        }

        // Validate Damaged Quantity
        if (
            damagedQuantity !== undefined &&
            quantityOnHand !== undefined &&
            damagedQuantity > quantityOnHand
        ) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Damaged Quantity cannot be greater than Quantity on Hand'
            });
        }

        // Create Inventory
        const response = await Inventory.create({
            adminID,
            product,
            warehouse,
            quantityOnHand,
            reservedQuantity,
            damagedQuantity,
            reorderLevel,
            reorderQuantity,
            status,
            lastStockMovement: new Date()
        });

        if (!response) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Inventory Registration failed...!'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Inventory Registration Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Inventory Registration failed...!',
            error: error.message
        });
    }
};


// View All Inventory
const viewInventory = async (req, res) => {
    try {
        const adminID = req.adminID;

        const InventoryData = await Inventory.find({ adminID })
            .populate(
                'product',
                'productCode productName productType category unit purchasePrice sellingPrice'
            )
            .populate(
                'warehouse',
                'warehouseCode warehouseName warehouseType'
            )
            .populate(
                'createdBy',
                'firstName lastName employeeCode'
            )
            .populate(
                'updatedBy',
                'firstName lastName employeeCode'
            )
            .sort({
                createdAt: -1
            });

        if (!InventoryData) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Error in fetching Inventory Data'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Inventory Data Fetched Successfully',
            data: InventoryData
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Error in fetching Inventory Data',
            error: error.message
        });
    }
};


// Update Inventory
const updateInventory = async (req, res) => {
    try {
        const {
            inventoryID,
            quantityOnHand,
            reservedQuantity,
            damagedQuantity,
            reorderLevel,
            reorderQuantity,
            status
        } = req.body;

        if (!inventoryID) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Inventory ID is Required'
            });
        }

        const adminID = req.adminID;

        // Find Inventory
        const existInventory = await Inventory.findOne({
            _id: inventoryID,
            adminID
        });

        if (!existInventory) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Inventory not found'
            });
        }

        // Use existing values if new values are not provided
        const newQuantityOnHand =
            quantityOnHand !== undefined
                ? quantityOnHand
                : existInventory.quantityOnHand;

        const newReservedQuantity =
            reservedQuantity !== undefined
                ? reservedQuantity
                : existInventory.reservedQuantity;

        const newDamagedQuantity =
            damagedQuantity !== undefined
                ? damagedQuantity
                : existInventory.damagedQuantity;

        // Validate Reserved Quantity
        if (newReservedQuantity > newQuantityOnHand) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Reserved Quantity cannot be greater than Quantity on Hand'
            });
        }

        // Validate Damaged Quantity
        if (newDamagedQuantity > newQuantityOnHand) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Damaged Quantity cannot be greater than Quantity on Hand'
            });
        }

        const response = await Inventory.findOneAndUpdate(
            {
                _id: inventoryID,
                adminID
            },
            {
                quantityOnHand: newQuantityOnHand,
                reservedQuantity: newReservedQuantity,
                damagedQuantity: newDamagedQuantity,
                reorderLevel,
                reorderQuantity,
                status,
                lastStockMovement: new Date(),
                updatedBy: req.employeeID
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            status: 'Success',
            message: 'Inventory Updated Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Inventory Update failed...!',
            error: error.message
        });
    }
};


module.exports = {
    registerInventory,
    viewInventory,
    updateInventory
};