
const Repartidores = require('../schema/Repartidores')

const getListado = async(req, res) => { 
  try{ 
    const listado = await Repartidores.find({});
    res.status(200).json({
      listado: listado
    });
  } catch (error) { 
    res.status(400).json({
      message: "Error al cargar los repartidores"
    });
  }
}

const nuevo = async (req, res) => { 
  const nuevo = new Repartidores(req.body);
  try {
    await nuevo.save();
    res.status(200).json({
      message: "Repartidor Creada Exitosamente"
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear el nuevo repartidor",
      error: error
    });
  }
}

const modificar = async (req, res) => {
  let Modificado = req.body;
  try {
    const modificado = await Repartidores.updateOne({_id: Modificado._id}, {$set: Modificado});
    if (modificado.modifiedCount > 0){ 
      res.status(200).json({
        message: "Repartidor actualizado Exitosamente"
      });
    } else { 
      res.status(400).json({
        message: "Error al actualizar el repartidor"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar el repartidor"
    });
  }
}

const eliminar = async (req, res) => {
  let id = req.body._id;
  try {
    // const proceso = await Tarifas.findOne({_id: id});
    const eliminado = await Repartidores.deleteOne({_id: id});
    if(eliminado.deletedCount){
      res.status(200).json({
        message: "Repartidor Eliminado Exitosamente"
      });
    } else {
      res.status(400).json({
        message: "Error al eliminar el repartidor"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar el repartidor"
    });
  }
}

module.exports = {
  getListado,
  nuevo,
  modificar,
  eliminar
}