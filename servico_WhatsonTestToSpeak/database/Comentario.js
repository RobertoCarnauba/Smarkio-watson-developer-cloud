const Sequelize = require('sequelize');
const connection = require('./database');

const Comentario = connection.define('comentarios',{
    descricao:{
        type:Sequelize.TEXT,
        allowNull:false
    }
});

Comentario.sync({force: false}).then(() =>{})

module.exports = Comentario;