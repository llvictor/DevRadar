const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb://dev:{PASSWORD}@cluster0-shard-00-00-a6vdj.mongodb.net:27017,cluster0-shard-00-01-a6vdj.mongodb.net:27017,cluster0-shard-00-02-a6vdj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//app.use(cors({ origin: 'http://localhost:3333' }));
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);

//localhost:3333

// Métodos HTTP: GET, POST, PUT, DELETE

// Query Params: request.query (Filtros, ordenação, paginação)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

