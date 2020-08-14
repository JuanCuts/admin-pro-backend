require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { dbConection } = require('./database/config');

//env
// console.log(process.env);

//Base de datos
dbConection();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

//Rutas
app.get('/', function(req, res) {
  console.log('get');
  return res.status(400).send({
      ok: true,
      message: 'hello world'
  });
});