const jwt = require('jsonwebtoken')

const tokenValidation = (req, res, next) => { 
  const token = req.header('Authorization');
  if(!token) return res.status(401).json("Acceso Denegado");
  const validar = jwt.verify(token, 'Ay0T3Cl0ud')
  next()
}

module.exports = { 
  tokenValidation
}