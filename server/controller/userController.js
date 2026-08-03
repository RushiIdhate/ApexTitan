const User = require('../model/userModel.js');
const bcrypt = require('bcryptjs');

const register = async(req, res) => {
    try {
        const { name, email, mobile_number, password } = req.body;
        
        if(!name || !email || !mobile_number || !password){
            return res.status(401).json({status : "Fail", message : "All fields are required...!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const response = await User.create({
            name, email, mobile_number, password : hashedPassword
        });

        if(!response){
            return res.status(401).json({status : "Fail", message : "User not get Register...!"});
        }

        return res.status(200).json({status : "Success", message : "User Register Succesfully...!"});
    } catch (error) {
        return res.status(401).json({status : "Fail", message : "User not get Register...!", error : error.message});
    }
}

module.exports = { register };