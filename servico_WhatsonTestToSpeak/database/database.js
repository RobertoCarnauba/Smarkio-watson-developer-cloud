const Sequelize = require('sequelize');

const connection = new Sequelize('comentarios','root','',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;