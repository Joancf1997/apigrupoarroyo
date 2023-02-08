
const Procesos = require('../schema/Procesos')

// Obtener listado de procesos del sistema
const getProcesos = async(req, res) => { 
  try{ 
    const listadoProcesos = await Procesos.find({});
    res.status(200).json({
      procesos: listadoProcesos
    });
  } catch (error) { 
    res.status(400).json({
      message: "Error al cargar los procesos"
    });
  }
}

// Crear un nuevo proceso
const nuevoProceso = async (req, res) => { 
  const nuevoProceso = new Procesos(req.body);
  try {
    await nuevoProceso.save();
    res.status(200).json({
      message: "Proceso Creado Exitosamente"
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear el nuevo proceso",
      error: error
    });
  }
}

// Modificar en proceso indicado
const modificarProceso = async (req, res) => {
  let procesoModificado = req.body;
  try {
    const modificado = await Procesos.updateOne({_id: procesoModificado._id}, {$set: procesoModificado});
    if (modificado.modifiedCount > 0){ 
      res.status(200).json({
        message: "Proceso actualizado Exitosamente"
      });
    } else { 
      res.status(400).json({
        message: "Error al actualizar el proceso"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar el proceso"
    });
  }
}

// Eliminar el proceso indicado 
const eliminarProceso = async (req, res) => {
  let id = req.body._id;
  try {
    const proceso = await Procesos.findOne({_id: id});
    const eliminado = await Procesos.deleteOne({_id: id});
    if(eliminado.deletedCount){
      res.status(200).json({
        message: "Proceso Eliminado Exitosamente"
      });
    } else {
      res.status(400).json({
        message: "Error al eliminar el proceso"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar el proceso"
    });
  }
}

module.exports = {
  getProcesos,
  nuevoProceso,
  modificarProceso,
  eliminarProceso
}