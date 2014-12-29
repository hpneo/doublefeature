var Canguro = require('canguro'),
    MovieDB = require('moviedb')('fdf3c94669f3cc0906fddc99e5cd8208');

var MovieGenre = Canguro.defineModel('MovieGenre', function() {
  this.belongsTo('movie', { model: require('./movie') });
  this.belongsTo('genre', { model: require('./genre') });
});

module.exports = MovieGenre;