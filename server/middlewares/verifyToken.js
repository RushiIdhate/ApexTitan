const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) => {
    try {
        const header = req.headers.authorization;
        
        if(!header){
            return res.status(401).json({
                status : "Fail",
                message : "Authorization required"
            })
        }

        const token = header.split(" ")[1];
        
        const decoded = jwt.verify(
            token, process.env.JWT_SECRET
        );

        req.adminID = decoded.id;

        next();

    } catch (error) {
        return res.status(401).json({   
            status : "Fail",
            message : "Aurhorization Failed",
            error : error.message
        })
    }
}

module.exports = verifyToken;