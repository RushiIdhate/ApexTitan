const Warehouse = require('../model/warehouseModel.js');
const Employee = require('../model/employeeModel.js');
const Unit = require('../model/unitModel.js');

const registerWarehouse = async (req, res) => {
    try {
        const {
            warehouseName,
            warehouseType,
            manager,
            address,
            contactNumber,
            email,
            capacity,
            capacityUnit,
            status,
            description
        } = req.body;

        // Required field validation
        if (
            !warehouseName ||
            !warehouseType ||
            !address ||
            !address.addressLine1 ||
            !address.city ||
            !address.state ||
            !address.country ||
            !address.pinCode
        ) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Warehouse Name, Warehouse Type and Complete Address are Required'
            });
        }

        const adminID = req.adminID;

        // Generate next Warehouse Code
        let nextSeq = 1;

        const lastWarehouseCode = await Warehouse
            .findOne({ adminID })
            .sort({ _id: -1 });

        if (
            lastWarehouseCode &&
            lastWarehouseCode.warehouseCode
        ) {
            const lastCode = parseInt(
                lastWarehouseCode.warehouseCode.split('-')[1],
                10
            );

            nextSeq = lastCode + 1;
        }

        const warehouseCode = `WH-${nextSeq
            .toString()
            .padStart(5, '0')}`;

        // Check if Warehouse Name already exists
        const existWarehouse = await Warehouse.findOne({
            adminID,
            warehouseName
        });

        if (existWarehouse) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Warehouse Already Exist.'
            });
        }

        // Check Manager if provided
        if (manager) {
            const existManager = await Employee.findOne({
                _id: manager,
                adminID
            });

            if (!existManager) {
                return res.status(400).json({
                    status: 'Fail',
                    message: 'Invalid Warehouse Manager'
                });
            }
        }

        // Check Capacity Unit if provided
        if (capacityUnit) {
            const existCapacityUnit = await Unit.findOne({
                _id: capacityUnit,
                adminID
            });

            if (!existCapacityUnit) {
                return res.status(400).json({
                    status: 'Fail',
                    message: 'Invalid Capacity Unit'
                });
            }
        }

        // Create Warehouse
        const response = await Warehouse.create({
            adminID,
            warehouseCode,
            warehouseName,
            warehouseType,
            manager,
            address,
            contactNumber,
            email,
            capacity,
            capacityUnit,
            status,
            description
        });

        if (!response) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Warehouse Registration failed...!'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Warehouse Registration Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Warehouse Registration failed...!',
            error: error.message
        });
    }
};


const viewWarehouse = async (req, res) => {
    try {
        const adminID = req.adminID;

        const WarehouseData = await Warehouse.find({ adminID })
            .populate(
                'manager',
                'employeeCode firstName lastName department designation'
            )
            .populate(
                'capacityUnit',
                'unitCode unitName symbol unitType'
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

        if (!WarehouseData) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Error in fetching Warehouse Data'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Warehouse Data Fetched Successfully',
            data: WarehouseData
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Error in fetching Warehouse Data',
            error: error.message
        });
    }
};


module.exports = {
    registerWarehouse,
    viewWarehouse
};