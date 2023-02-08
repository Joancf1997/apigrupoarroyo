const Usuarios = require('../schema/Usuarios');
const Procesos = require('../schema/Procesos');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => { 
  const usuario = await Usuarios.findOne({username: req.body.usuario})
  if(!usuario) return res.status(400).json('Usuario no existe en el sistema')
  const correctPassword = await bcrypt.compare(req.body.password, usuario.password)
  if(!correctPassword) return res.status(401).json('Contraseña invalida');
  const token = jwt.sign({_id: usuario._id}, 'Ay0T3Cl0ud', {
    expiresIn: '3h'
  })
  const rutasPermisos = await Procesos.find({_id: usuario.permisos})
  res.status(200).json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    permisos: rutasPermisos,
    token: token
  });

}

module.exports = login
