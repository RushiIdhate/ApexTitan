const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = () => {
    try {
        const URL = process.env.MONGO_URL;
        const response = mongoose.connect(`${URL}`);

        if(response){
            console.log("Mongodb Database is Connected");
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB;