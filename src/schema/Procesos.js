const mongoose = require('mongoose');

const ProcesoSchema = new mongoose.Schema({
  nombre: String, 
  icono: String,
  url: String,
});

module.exports = mongoose.model('Proceso', ProcesoSchema);
