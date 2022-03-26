require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { dbConection } = require('./database/config');

//Crear servidor de express
const app = express();

//env
// console.log(process.env);

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConection();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

//Rutas
app.use('/api/users', require('./routes/user.router'));
app.use('/api/login', require('./routes/auth.router'));