
const Tarifas = require('../schema/Tarifas')

// Obtener listado de Tarifas del sistema
const getTarifas = async(req, res) => { 
  try{ 
    const listadoTarifas = await Tarifas.find({});
    res.status(200).json({
      Tarifas: listadoTarifas
    });
  } catch (error) { 
    res.status(400).json({
      message: "Error al cargar los Tarifas"
    });
  }
}

// Crear un nuevo proceso
const nuevaTarifa = async (req, res) => { 
  const nuevaTarifa = new Tarifas(req.body);
  try {
    await nuevaTarifa.save();
    res.status(200).json({
      message: "Tarifa Creada Exitosamente"
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear la nueva tarifa",
      error: error
    });
  }
}

// Modificar en proceso indicado
const modificarTarifa = async (req, res) => {
  let procesoModificado = req.body;
  try {
    const modificado = await Tarifas.updateOne({_id: procesoModificado._id}, {$set: procesoModificado});
    if (modificado.modifiedCount > 0){ 
      res.status(200).json({
        message: "Tarifa actualizada Exitosamente"
      });
    } else { 
      res.status(400).json({
        message: "Error al actualizar la tarifa"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar la tarifa"
    });
  }
}

// Eliminar el proceso indicado 
const eliminarTarifa = async (req, res) => {
  let id = req.body._id;
  try {
    const proceso = await Tarifas.findOne({_id: id});
    const eliminado = await Tarifas.deleteOne({_id: id});
    if(eliminado.deletedCount){
      res.status(200).json({
        message: "Tarifa Eliminada Exitosamente"
      });
    } else {
      res.status(400).json({
        message: "Error al eliminar la tarifa"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar la tarifa"
    });
  }
}

module.exports = {
  getTarifas,
  nuevaTarifa,
  modificarTarifa,
  eliminarTarifa
}