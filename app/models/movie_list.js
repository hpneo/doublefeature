var Canguro = require('canguro');

var MovieList = Canguro.defineModel('MovieList', function() {
  this.belongsTo('movie', { model: require('./movie') });
  this.belongsTo('list', { model: require('./list') });
});

module.exports = MovieList;