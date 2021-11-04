const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

    //leer token
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            message: 'Token is required'
        })
    }

    try{

        const { user_id } = jwt.verify( token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch(err){
        return res.status(401).json({
            ok: false,
            message: "Token not valid"
        })
    }
}

module.exports = {
    validateJWT
}