const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  bio: String,
  avatar: {
    type: String,
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId, // o tipo será o ID padrão que o mongo gera
    ref: 'Dev' // e estou relacionando esse id como o id do Dev 
  }],
  dislikes: [{
    type: Schema.Types.ObjectId, 
    ref: 'Dev'
  }]
}, {
  timestamps: true
});

module.exports = model('Dev', DevSchema);