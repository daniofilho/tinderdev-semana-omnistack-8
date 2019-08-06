const express = require('express');
const DevController = require('./controllers/DevController'); 
const LikeController = require('./controllers/LikeController'); 
const DislikeController = require('./controllers/DislikeController'); 

const routes = express.Router();

routes.get( '/', (req, res) => { // request, response
  //return res.send(`Hello ${req.query.name}`); // Texto puro
  return res.json( { message: `Olá ${req.query.name}` });
});

routes.get('/devs', DevController.index );
routes.post('/devs', DevController.store );
routes.post('/devs/:devID/likes', LikeController.store );
routes.post('/devs/:devID/dislikes', DislikeController.store );

module.exports = routes;