const mongoose = require('mongoose');

const ClientesSchema = new mongoose.Schema({
  nombre: String,
  cel: String,
  direccion: String
});

module.exports = mongoose.model('Clientes', ClientesSchema);
