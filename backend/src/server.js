// instale o Nodemon para garantir que não precise ficar executando o server.js toda ver no terminal 
// instale o cors para o React conseguir acessar o server depois
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

// Cria o server
const app = express(); // http
const server = require('http').Server(app); // unindo o servidor para aceitar websocket E http
const io = require('socket.io')(server);

const connectedUsers = {}; //  vamos salvar na memória do servidor, mas o ideal é salvar em banco, pode ser mongo tb

io.on('connection', socket => { // quando vier conexão pelo socket
  /*socket.on('hello', message => {
    console.log(message);
  });*/
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
})

// Conecta com o banco - https://www.mongodb.com/cloud/atlas
mongoose.connect('mongodb+srv://omnistack:omnistack@tinderdevomnistack8-fu7qh.mongodb.net/omnistack8?retryWrites=true&w=majority', { 
  useNewUrlParser: true
});

//middleware
app.use((req, res, next) => { // faz qq coisa com req e res e dps chama o next pra dar sequencia 
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use( express.json() ); // Define que todas as "conversas" serão em JSON
app.use( routes ); // adiciona as rotas criadas

server.listen(3333);