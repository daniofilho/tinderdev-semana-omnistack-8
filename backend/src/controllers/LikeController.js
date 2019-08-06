const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {

    // req.params => acessa parâmetros vindos da rota
    // req.headers => acessa parâmetros vindos do header do request

    const { user } = req.headers;
    const { devID } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devID);

    // Caso não exista o dev
    if(!targetDev) {
      return res.status(400).json({ error: 'Dev not exists'});
    }

    // Verifica se ambos deram like para mostrar "match" na tela
    if( targetDev.likes.includes(loggedDev._id) ) {
      console.log('Match!');
    }

    // Salva o ID do target dentro da tabela de likes do usuário atual
    loggedDev.likes.push( targetDev._id );

    await loggedDev.save(); // Não adianta só dar push, precisa salvar também

    return res.json(loggedDev);
  }
};