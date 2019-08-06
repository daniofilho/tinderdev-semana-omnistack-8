const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {

    const { user } = req.headers;
    const { devID } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devID);

    // Caso não exista o dev
    if(!targetDev) {
      return res.status(400).json({ error: 'Dev not exists'});
    }

    // Salva o ID do target dentro da tabela de likes do usuário atual
    loggedDev.dislikes.push( targetDev._id );

    await loggedDev.save(); // Não adianta só dar push, precisa salvar também

    return res.json(loggedDev);
  }
};