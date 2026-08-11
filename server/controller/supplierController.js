const Supplier = require('../model/supplierModel.js');

const registerSupplier = async (req, res) => {
    try {
        const {
            companyName,
            supplierType,
            industry,
            website,
            contactPerson,
            email,
            phone,
            alternatePhone,
            gstNumber,
            panNumber,
            taxType,
            address,
            paymentTerms,
            creditLimit,
            currency,
            bankDetails,
            status,
            notes
        } = req.body;

        if (
            !companyName ||
            !supplierType ||
            !contactPerson ||
            !email ||
            !phone ||
            !address ||
            !address.addressLine1 ||
            !address.city ||
            !address.state ||
            !address.country ||
            !address.pinCode
        ) {
            return res.status(401).json({
                status: 'Fail',
                message: 'All Required Fields are Required'
            });
        }

        const adminID = req.adminID;

        let nextSeq = 1;

        const lastSupplierCode = await Supplier
            .findOne({ adminID })
            .sort({ _id: -1 });

        if (lastSupplierCode && lastSupplierCode.supplierCode) {
            const lastCode = parseInt(
                lastSupplierCode.supplierCode.split('-')[1],
                10
            );

            nextSeq = lastCode + 1;
        }

        const supplierCode = `SUP-${nextSeq
            .toString()
            .padStart(5, '0')}`;

        const existSupplier = await Supplier.findOne({
            adminID,
            email
        });

        if (existSupplier) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Supplier Already Exist.'
            });
        }

        const response = await Supplier.create({
            adminID,
            supplierCode,
            companyName,
            supplierType,
            industry,
            website,
            contactPerson,
            email,
            phone,
            alternatePhone,
            gstNumber,
            panNumber,
            taxType,
            address,
            paymentTerms,
            creditLimit,
            currency,
            bankDetails,
            status,
            notes
        });

        if (!response) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Supplier Registration failed...!'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Supplier Registration Successfully',
            data: response
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Supplier Registration failed...!',
            error: error.message
        });
    }
};


const viewSupplier = async (req, res) => {
    try {
        const adminID = req.adminID;

        const SupplierData = await Supplier.find({ adminID })
            .populate('createdBy', 'firstName lastName employeeCode')
            .populate('updatedBy', 'firstName lastName employeeCode');

        if (!SupplierData) {
            return res.status(401).json({
                status: 'Fail',
                message: 'Error in fetching Supplier Data'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Supplier Data Fetched Successfully',
            data: SupplierData
        });

    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Error in fetching Supplier Data',
            error: error.message
        });
    }
};

const deleteSupplier = async(req, res) => {
    try {
        const {id} = req.params;

        const response = await Supplier.findByIdAndDelete(id);

        if(!response){
            return res.status(401).json({
                status: 'Fail',
                message: 'Error in Deleting Supplier Data'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Supplier data not get deleted'
        });
    } catch (error) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Error in Deleting Supplier Data',
            error: error.message
        });
    }
};


module.exports = {
    registerSupplier,
    viewSupplier, deleteSupplier
};