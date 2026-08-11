const Employee = require('../model/employeeModel.js');

const registerEmployee = async(req, res) => {
    try {
        const { firstName,lastName,gender,dateOfBirth,mobileNumber,email,address,city,state,country,pinCode,department,designation,joiningDate,employeeType,reportingManager,employeeStatus,basicPay,salaryType } = req.body;

        if(!firstName || !lastName || !gender || !dateOfBirth || !mobileNumber || !email || !address || !city || !state || !pinCode || !designation || !joiningDate || !employeeType || !employeeStatus || !basicPay || !salaryType){
            return res.status(401).json({
                status : 'Fail',
                message : 'All Fields are Required'
            })
        }
        
        let nextSeq = 1;
        const adminID = req.adminID;

        const lastEmployeeCode = await Employee.findOne({ adminID }).sort({ _id : -1 });

        if(lastEmployeeCode && lastEmployeeCode.employeeCode){
            const lastCode = parseInt(lastEmployeeCode.employeeCode.split('-')[1], 10);
            nextSeq = lastCode + 1;
        }

        const employeeCode = `EMP-${nextSeq.toString().padStart(5, '0')}`;

        const existEmployee = await Employee.findOne({ adminID, email });

        if(existEmployee){
            return res.status(400).json({
                status : 'Fail',
                message : 'Employee Already Exist.',
            })
        }

        const response = await Employee.create({
            adminID,
            employeeCode,
            firstName,lastName,gender,dateOfBirth,mobileNumber,email,address,city,state,country,pinCode,department,designation,joiningDate,employeeType,reportingManager,employeeStatus,basicPay,salaryType
        });

        if(!response){
            return res.status(401).json({
                status : 'Fail',
                message : 'Employee Registration failed...!',
            })
        }

        return res.status(200).json({
            status : 'Success',
            message : 'Employee Registration Successfully'
        })

    } catch (error) {
        return res.status(401).json({
            status : 'Fail',
            message : 'Employee Registration failed...!',
            error : error.message
        })
    }
};

const viewEmployee = async(req, res) => {
    try {
        const adminID = req.adminID;

        const EmployeeData = await Employee.find({ adminID });

        if(!EmployeeData){
            return res.status(401).json({
                status : 'Fail',
                message : 'Error in fetching Employee Data',
            })
        }

        return res.status(200).json({
            status : 'Success',
            message : 'Employee Data Fetched Successfully',
            data : EmployeeData
        })

    } catch (error) {
        return res.status(401).json({
            status : 'Fail',
            message : 'Error in fetching Employee Data',
            error : error.message
        })
    }
};

const deleteEmployee = async(req, res) => {
    try {
        const { id } = req.params; 
        
        const response = await Employee.findByIdAndDelete(id);

        if(!response){
            return res.status(404).json({
                status  : "Fail",
                message : "Employee not found"
            });
        }

        return res.status(200).json({
            status  : "Success",
            message : "Employee Deleted Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status  : "Error",
            message : "Employee can't be deleted",
            error : error.message
        });
    }
};

module.exports = { registerEmployee, viewEmployee, deleteEmployee }