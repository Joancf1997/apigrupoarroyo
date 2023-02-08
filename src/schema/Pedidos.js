const mongoose = require('mongoose');

// Estados del pedido Ingresado, Asignado, Terminado, Cancelado
//  Tipo pago Efectivo o transferencia

const PedidosSchema = new mongoose.Schema({
  cliente: { 
    nombre: String,
    direccion: String, 
    cel: String, 
    _id: mongoose.Types.ObjectId
  },
  repartidor: { 
    nombre: String, 
    cel: String, 
    _id: mongoose.Types.ObjectId
  },
  fechaEntrega: Date, 
  estado: String, 
  totalPedido: Number, 
  comisionTotal: Number,
  detalle: [{
    nombreRecibe: { 
      nombre: String,
      _id: mongoose.Types.ObjectId
    }, 
    ceRecibe: String, 
    direccionRecibe: String, 
    zona: String, 
    costoEnvio: Number, 
    pagaPersonaEnvia: Boolean,
    cobroPersonaRecibe: Number, 
    tipoProducto: String,
    totalEnvio: Number,
    entregado: Boolean, 
    tipoPago: String
  }]
});

module.exports = mongoose.model('Pedidos', PedidosSchema);
