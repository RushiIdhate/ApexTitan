const Unit = require('../model/unitModel.js');

const registerUnit = async (req, res) => {
    try {
        const {
            unitName,
            symbol,
            unitType,
            description,
            status
        } = req.body;

        if (!unitName || !symbol || !unitType) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Unit Name, Symbol and Unit Type are Required'
            });
        }

        const adminID = req.adminID;

        // Generate next Unit Code
        let nextSeq = 1;

        const lastUnitCode = await Unit
            .findOne({ adminID })
            .sort({ _id: -1 });

        if (lastUnitCode && lastUnitCode.unitCode) {
            const lastCode = parseInt(
                lastUnitCode.unitCode.split('-')[1],
                10
            );

            nextSeq = lastCode + 1;
        }

        const unitCode = `UNIT-${nextSeq
            .toString()
            .padStart(5, '0')}`;

        // Check if Unit already exists
        const existUnit = await Unit.findOne({
            adminID,
            unitName
        });

        if (existUnit) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Unit Already Exist.'
            });
        }

        // Create Unit
        const response = await Unit.create({
            adminID,
            unitCode,
            unitName,
            symbol,
            unitType,
            description,
            status
        });

        if (!response) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Unit Registration failed...!'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Unit Registration Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Unit Registration failed...!',
            error: error.message
        });
    }
};


const viewUnit = async (req, res) => {
    try {
        const adminID = req.adminID;

        const UnitData = await Unit.find({ adminID })
            .populate(
                'createdBy',
                'firstName lastName employeeCode'
            )
            .populate(
                'updatedBy',
                'firstName lastName employeeCode'
            );

        if (!UnitData) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Error in fetching Unit Data'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Unit Data Fetched Successfully',
            data: UnitData
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Error in fetching Unit Data',
            error: error.message
        });
    }
};


module.exports = {
    registerUnit,
    viewUnit
};