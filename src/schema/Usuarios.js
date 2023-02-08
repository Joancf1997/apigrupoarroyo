const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  username: String, 
  password: String,    // encriotado
  cel: String,
  permisos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Proceso'}],
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
