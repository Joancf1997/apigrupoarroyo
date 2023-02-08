const Usuarios = require('../schema/Usuarios')
const bcrypt = require('bcrypt');

// Encriptar contrasena del usuario
const encryptPassword = async (password) => { 
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt)
}

// Obtener listado de usuarios del sistema
const getUsuarios = async(req, res) => { 
  try{ 
    const listadoUsuarios = await Usuarios.find({},{password: 0});
    res.status(200).json({
      usuarios: listadoUsuarios
    });
  } catch (error) { 
    res.status(400).json({
      message: "Error al cargar los usuarios"
    });
  }
}

// Crear un nuevo usuario del sistema
const crearUsuario = async(req, res) => { 
  const usuario = new Usuarios(req.body)
  usuario.password = await encryptPassword(usuario.password)
  try {
    await usuario.save()
    res.status(200).json({
      username: usuario.usuario,
      message: `Usuario ${usuario.usuario} creado exitosamente`
    });
  } catch (error) {
    res.status(400).json({
      error: error,
      message: 'Error al crear al usuario'
    });
  }
}

// Modificar los datos de un usuario 
const modificarUsuario = async(req, res) => { 
  const usuario = req.body;
  try {
    await Usuarios.updateOne({_id: usuario._id}, {$set: {
      nombre: usuario.nombre,
      email: usuario.email,
      cel: usuario.cel,
      empresa: usuario.empresa,
    }});
    res.status(200).json({
      message: "Usuario actualizado"
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar el usuario"
    });
  }
}

// Modificar las credenciales de un usuario 
const credencialesUsuario = async (req, res) => { 
  const usuarioPassword = req.body;
  var id = usuarioPassword._id
  try {
    if(usuarioPassword.password){
      var password = await encryptPassword(usuarioPassword.password)
      await Usuarios.updateOne({_id: id}, {$set: {password: password, username: usuarioPassword.username}});
    } else { 
      await Usuarios.updateOne({_id: id}, {$set: {username: usuarioPassword.username}});
    }

    res.status(200).json({
      message: "Credenciales actualizadas"
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar las credenciales"
    });
  }
}

// Eliminar un usuario 
const eliminarUsuario = async (req, res) => { 
  const usuarioId = req.body._id;
  try {
    await Usuarios.deleteOne({_id: usuarioId});
    res.status(200).json({
      message: "Usuario Eliminado"
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar el usuario"
    });
  }
}


// Eliminar un sitio de un usuario 
const eliminarSitioUsuario = async (req, res) => { 
  const usuarioId = req.body._idUsuario;
  const sitio = req.body.sitio;
  try {
    await Usuarios.updateOne({_id: usuarioId}, {$pull : {sitios: sitio}});
    res.status(200).json({
      message: "Sitio eliminado exitosamente"
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar el sitio"
    });
  }
}

// Actualizar los procesos a los cuales tiene permiso el usuario 
const permisosUsuario = async(req, res) => { 
  const idUsuario = req.body.id 
  const procesos = req.body.permisos
  try {
    await Usuarios.updateOne({ '_id': idUsuario }, {$set: {permisos: procesos}})
    res.status(200).json({
      message: "Permisos modificados Exitosamente",
      permisos: procesos
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al modificar los permisos",
      error: error
    });
  }
} 

// Listado de procesos a los que tiene el acceso el usuario 
const listadoProcesosUsuario = async (req, res) => { 
  const idUsuario = req.body.id
  try {
    const listadoProcesos = await Usuarios.find({_id: idUsuario}, {permisos: 1})
    res.status(200).json({
      listadoProcesos: listadoProcesos
    });
  } catch (error) {
    res.status(400).json({
      error: error,
      message: 'Error al cargar los usuarios'
    });
  }
}


module.exports = { 
  getUsuarios,
  crearUsuario,
  modificarUsuario,
  credencialesUsuario,
  eliminarUsuario,
  eliminarSitioUsuario,
  permisosUsuario,
  listadoProcesosUsuario
}