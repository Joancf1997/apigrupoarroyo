const mongoose = require('mongoose');

const TarifasSchema = new mongoose.Schema({
  tarifa: Number,
  zona: String,
});

module.exports = mongoose.model('Tarifas', TarifasSchema);
