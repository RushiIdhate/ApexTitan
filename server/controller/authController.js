const User = require('../model/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if( !email || !password ) {
            return res.status(401).json({status : "Fail", message : "All fields are Required"});
        }

        const userData = await User.findOne({ email });
        const userPassword = userData.password;
       
        const isMatch = await bcrypt.compare(
            password, userPassword
        );

        if(!isMatch){
            return res.status(401).json({status : "Fail", message : "Invalid Crediential"});
        }

        const token = jwt.sign({
            id : userData._id,
            name : userData.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn : '1d'
        });

        if(!token){
            return res.status(401).json({status : "Fail", message : "Token generation fail...!"});
        }

        return res.status(200).json(
            {   
                status : "Success", 
                message : "Login Successfull",
                token : token
            }
        );

    } catch (error) {
        return res.status(401).json({status : "Fail", message : "Login fail", error : error.message});
    }
}

module.exports = login;