const express = require('express');
const bodyParser = require('body-parser');
const { config } = require('dotenv')

config();
const app = express();

const userRoute = require('./src/routes/userRoute');
const projectRoute = require('./src/routes/projectRoute');

// Configurar acesso à BD.
const mongoose = require('mongoose');
let url = 'mongodb://127.0.0.1:27017/FatecVotorantim';
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar ao MongoDB'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(userRoute)
app.use(projectRoute)




app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});