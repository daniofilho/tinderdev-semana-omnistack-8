// Responsável pelas funções que controlam os dados da Model Dev

const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

  async index( req, res) {

    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
       { _id: { $ne: user } }, // ne = not equal / Traz todos os usuários que não sejam o user passado (o atual)
       { _id: { $nin: loggedDev.likes }}, // nin = Not In
       { _id: { $nin: loggedDev.dislikes }}
      ]
    });

    return res.json(users);

  },

  async store(req, res) {

    // req.body => acessa parâmetros vindos do corpo da requisição

    const { username } = req.body;

    // Verifica se usuário já não existe antes
    const userExists = await Dev.findOne({ user: username });

    if(userExists) {
      return res.json(userExists);
    }

    // Vamos cadastrar o usuário com base nas informações do Github
    const response = await axios.get(`https://api.github.com/users/${username}`); // isso é assíncrono, por isso o await, assim o return espera essa função terminar

    const { name, bio, avatar_url: avatar} = response.data;

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    })

    return res.json(dev);

  }

}