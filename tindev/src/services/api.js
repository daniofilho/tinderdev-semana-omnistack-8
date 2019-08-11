import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

export default api;

/*
  Rode sempre, caso contrário dará erro de promise no servidor
  adb reverse tcp:3333 tcp:3333
  para que o emulador Android entenda que ele deve redirecionar a porta do localhost para a porta do emulador
*/