const mongoose = require('mongoose');

const RepartidoresSchema = new mongoose.Schema({
  nombre: String,
  dpi: Number,
  cel: String,
  direccion: String,
  cel1: String, 
  cel2: String,
  email: String,
});

module.exports = mongoose.model('Repartidores', RepartidoresSchema);
