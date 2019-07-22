require("dotenv-safe").load();
var jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) =>{
    var token = req.headers['x-access-token'];
    
    if (!token) return res.status(401).send({ 
        auth: false, message: 'O usuário não está logado' 
    });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ 
            auth: false, message: 'Falha em autenticar o token.' 
        });
        req.userId = decoded.id;
        req.userstate = decoded.state;
        next();
      });
}

module.exports = {
    verifyJWT
  }