var Canguro = require('canguro');

var List = Canguro.defineModel('List', function() {
  this.hasMany('movie_lists', { model: require('./movie_list') });
});

module.exports = List;