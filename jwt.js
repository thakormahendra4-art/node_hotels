const jwt = require("jsonwebtoken")

const jwtAuthMiddleware = (req,res,next) =>{

    // check header first
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token Not Found' });
    }

    //Extract jwt token from the request headers 
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // verify jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user info to request object
        req.user = decoded;
        next(); // ✅ this is correct
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'Invalid Token' });
    }
};

// function to generate jwt token
const generateToken = (userData) =>{
        // generate a new jwt token using uaer data
        return jwt.sign(userData,process.env.JWT_SECRE,{expiresIn: 3000})
}
module.exports = {jwtAuthMiddleware,generateToken}