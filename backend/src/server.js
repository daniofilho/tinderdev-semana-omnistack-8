// instale o Nodemon para garantir que não precise ficar executando o server.js toda ver no terminal 
// instale o cors para o React conseguir acessar o server depois

const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

// Cria o server
const server = express();

// Conecta com o banco - https://www.mongodb.com/cloud/atlas
mongoose.connect('mongodb+srv://omnistack:omnistack@tinderdevomnistack8-fu7qh.mongodb.net/omnistack8?retryWrites=true&w=majority', { 
  useNewUrlParser: true
});

server.use(cors());
server.use( express.json() ); // Define que todas as "conversas" serão em JSON
server.use( routes ); // adiciona as rotas criadas

server.listen(3333);