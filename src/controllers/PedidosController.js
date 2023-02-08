
const Pedidos = require('../schema/Pedidos')

const getListado = async(req, res) => { 
  try{ 
    const listado = await Pedidos.find({});
    res.status(200).json({
      listado: listado
    });
  } catch (error) { 
    res.status(400).json({
      message: "Error al cargar los pedidos"
    });
  }
}

const nuevo = async (req, res) => { 
  const nuevo = new Pedidos(req.body);
  try {
    await nuevo.save();
    res.status(200).json({
      message: "Pedido Creado Exitosamente"
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear el nuevo pedido",
      error: error
    });
  }
}

const modificar = async (req, res) => {
  let Modificado = req.body;
  try {
    const modificado = await Pedidos.updateOne({_id: Modificado._id}, {$set: Modificado});
    if (modificado.modifiedCount > 0){ 
      res.status(200).json({
        message: "Pedido actualizado Exitosamente"
      });
    } else { 
      res.status(400).json({
        message: "Error al actualizar el pedido"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar el pedido"
    });
  }
}

const eliminar = async (req, res) => {
  let id = req.body._id;
  try {
    // const proceso = await Tarifas.findOne({_id: id});
    const eliminado = await Pedidos.deleteOne({_id: id});
    if(eliminado.deletedCount){
      res.status(200).json({
        message: "Pedido Eliminado Exitosamente"
      });
    } else {
      res.status(400).json({
        message: "Error al eliminar el pedido"
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar el pedido"
    });
  }
}

module.exports = {
  getListado,
  nuevo,
  modificar,
  eliminar
}