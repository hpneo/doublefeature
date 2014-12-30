var Canguro = require('canguro');

var MovieGenre = Canguro.defineModel('MovieGenre', function() {
  this.belongsTo('movie', { model: require('./movie') });
  this.belongsTo('genre', { model: require('./genre') });
});

module.exports = MovieGenre;