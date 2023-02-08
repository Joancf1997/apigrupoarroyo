var express = require('express');
var router = express.Router();
require('dotenv').config();
const token = require("../controllers/validateToken");


// Contorladores 
const login = require('../controllers/LoginController');
const Procesos = require('../controllers/ProcesosController');
const Usuarios = require('../controllers/UsuariosController');
const Tarifas = require('../controllers/TarifasController');
const Cliente = require('../controllers/ClientesController');
const Repartidores = require('../controllers/RepartidoresController');
const Pedidos = require('../controllers/PedidosController');


// Login 
router.post('/login', login);

// procesos 
router.get('/procesos', token.tokenValidation, Procesos.getProcesos);
router.post('/procesos', token.tokenValidation, Procesos.nuevoProceso);
router.put('/procesos', token.tokenValidation, Procesos.modificarProceso);
router.delete('/procesos', token.tokenValidation, Procesos.eliminarProceso);

// Usuaios 
router.get('/usuarios', token.tokenValidation, Usuarios.getUsuarios);
router.put('/usuarios', token.tokenValidation, Usuarios.modificarUsuario);
router.post('/usuarios', token.tokenValidation, Usuarios.crearUsuario);
router.delete('/usuarios', token.tokenValidation, Usuarios.eliminarUsuario);
router.put('/credencialesUsuario', token.tokenValidation, Usuarios.credencialesUsuario);
router.post('/permisosUsuario', token.tokenValidation, Usuarios.permisosUsuario);

// tarifas 
router.get('/tarifas', token.tokenValidation, Tarifas.getTarifas);
router.post('/tarifas', token.tokenValidation, Tarifas.nuevaTarifa);
router.put('/tarifas', token.tokenValidation, Tarifas.modificarTarifa);
router.delete('/tarifas', token.tokenValidation, Tarifas.eliminarTarifa);

// clientes 
router.get('/clientes', token.tokenValidation, Cliente.getListado);
router.post('/clientes', token.tokenValidation, Cliente.nuevo);
router.put('/clientes', token.tokenValidation, Cliente.modificar);
router.delete('/clientes', token.tokenValidation, Cliente.eliminar);

// repartidores 
router.get('/repartidores', token.tokenValidation, Repartidores.getListado);
router.post('/repartidores', token.tokenValidation, Repartidores.nuevo);
router.put('/repartidores', token.tokenValidation, Repartidores.modificar);
router.delete('/repartidores', token.tokenValidation, Repartidores.eliminar);

// pedidos 
router.get('/pedidos', token.tokenValidation, Pedidos.getListado);
router.post('/pedidos', token.tokenValidation, Pedidos.nuevo);
router.put('/pedidos', token.tokenValidation, Pedidos.modificar);
router.delete('/pedidos', token.tokenValidation, Pedidos.eliminar);



module.exports = router;
