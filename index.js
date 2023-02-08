const mongoose = require('mongoose');
const express = require('express')
const router = require('./src/routes/auth');

// Conexion a la base de datos
main().catch(err => console.log(err));
async function main() {
  console.log(`Conectando a ${process.env.DATABASE_URL}`)
  try{
    await mongoose.set('strictQuery', true);
    await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log("Base de datos conectada")
  } catch (e) { 
    console.log("Error al conectar a la base de datos")
  }
}

// Servidor 
const app = express()
// allow cors header
app.use(function(_, res, next) {
  res.header("Access-Control-Allow-Origin", ["*"]); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, id, nombre");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
  next();
});
const port = 3000
app.use(express.json())

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




