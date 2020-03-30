

const jwt = require('jsonwebtoken');
const config = require('../shared/server.core.shared.config');

const auth = {}

auth.verify = (req,type) => {
    return (req, res, next) => {

        var token = req.headers['x-access-token'];
        if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            
    
            if (type === 2 && decoded.type === 'developer'){
                next()
            }else if(type === 1){
                next()
            }else{
                return res.status(401).send({ auth: false, message: 'Not authorised' });
            }
        });
    }
}

auth.generate = (req,res,type)=>{
    
    var token = jwt.sign({email:req.body.email,'type':type}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });

    return res.status(201).send({ auth: true, token: token });
}

module.exports = auth;