
const Clientes = require('../schema/Clientes')

const getListado = async(req, res) => { 
  try{ 
    const listado = await Clientes.find({});
    res.status(200).json({
      listado: listado
    });
  } catch (error) { 
    res.status(400).json({
      message: "Error al cargar los clientes"
    });
  }
}

const nuevo = async (req, res) => { 
  const nuevo = new Clientes(req.body);
  try {
    await nuevo.save();
    res.status(200).json({
      message: "Cliente Creada Exitosamente"
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear el nuevo cliente",
      error: error
    });
  }
}

const modificar = async (req, res) => {
  let Modificado = req.body;
  try {
    const modificado = await Clientes.updateOne({_id: Modificado._id}, {$set: Modificado});
    if (modificado.modifiedCount > 0){ 
      res.status(200).json({
        message: "Cliente actualizado Exitosamente"
      });
    } else { 
      res.status(400).json({
        message: "Error al actualizar el cliente"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar el cliente"
    });
  }
}

const eliminar = async (req, res) => {
  let id = req.body._id;
  try {
    // const proceso = await Tarifas.findOne({_id: id});
    const eliminado = await Clientes.deleteOne({_id: id});
    if(eliminado.deletedCount){
      res.status(200).json({
        message: "Cliente Eliminado Exitosamente"
      });
    } else {
      res.status(400).json({
        message: "Error al eliminar el cliente"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar el cliente"
    });
  }
}

module.exports = {
  getListado,
  nuevo,
  modificar,
  eliminar
}