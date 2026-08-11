const Customer = require('../model/customerModel.js');

const registerCustomer = async(req, res) => {
    try {
        const { 
            companyName, customerType, industry, website, contactPerson, email, phone, alternatePhone, gstNumber, 
            panNumber, taxType, billingAddress, shippingAddress, paymentTerms, currency, bankDetails, status, notes 
        } = req.body;

        if(!companyName || !contactPerson || !email || !phone || !billingAddress || !shippingAddress || !bankDetails){
            return res.status(401).json({
                status : "Fail",
                message : "All fields are Required"
            })
        }

        const adminID = req.adminID;
        const existCustomer = await Customer.findOne({ adminID, email });

        if(existCustomer){
            return res.status(401).json({
                status : "Fail",
                message : "Customer already Registered"
            })
        }

        let nextSeq = 1;

        const lastCustomer = await Customer.findOne({ adminID }).sort({ customerCode : -1 });
        if(lastCustomer && lastCustomer.customerCode){
            const lastCustomerCode = parseInt(lastCustomer.customerCode.split("-")[1], 10);
            nextSeq = lastCustomerCode + 1;
        }

        const customerCode = `CUST-${nextSeq.toString().padStart(5, "0")}`;

        const response = await Customer.create({
            adminID, customerCode, companyName, customerType, industry, website, contactPerson, email, phone, alternatePhone, gstNumber, 
            panNumber, taxType, billingAddress, shippingAddress, paymentTerms, currency, bankDetails, status, notes
        })

        if(!response){
            return res.status(401).json({
                status : "Fail",
                message : "Customer Registration fail"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Customer Registration Successfull"
        })

    } catch (error) {
        return res.status(401).json({
            status : "Fail",
            message : "Customer Registration fail",
            error : error.message
        })
    }
};

const viewCustomer = async(req, res) => {
    try {
        const adminID = req.adminID;
        
        const CustomerData = await Customer.find({ adminID });

        if(!CustomerData){
            return res.status(401).json({
                status : 'Fail',
                message : 'Error in fetching Customer Data',
            })
        }

        return res.status(200).json({
            status : 'Success',
            message : 'Customer Data Fetched Successfully',
            data : CustomerData
        })

    } catch (error) {
        return res.status(401).json({
            status : 'Fail',
            message : 'Error in fetching Customer Data',
            error : error.message
        })
    }
};

const deleteCustomer = async(req, res) => {
    try {
        const { id } = req.params;
        const response = await Customer.findByIdAndDelete(id);

        if(!response){
            return res.status(400).json({
                status : "Fail",
                message : "Customer deletion fail"
            });
        }

        return res.status(200).json({
            status : "Success",
            message : "Customer deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status : "Error",
            message : "Error while deleting Customer",
            error : error.message
        });
    }
};

module.exports = { registerCustomer, viewCustomer, deleteCustomer }