var Canguro = require('canguro'),
    MovieDB = require('moviedb')('fdf3c94669f3cc0906fddc99e5cd8208');

var Genre = Canguro.defineModel('Genre', function() {
  this.hasMany('movie_genres', { model: require('./movie_genre') });
});

Genre.loadFromTMDB = function() {
  var promise = new window.Promise(function(resolve, reject) {
    MovieDB.genreList(function(error, response) {
      if (error) {
        reject(error);
      }
      else {
        resolve(response);
      }
    });
  }).then(function(data) {
    var promises = data.genres.map(function(genre) {
      var genre = new Genre({
        tmdb_id: genre.id.toString(),
        name: genre.name
      });

      return genre.save();
    });

    return window.Promise.all(promises);
  });

  return promise;
};

module.exports = Genre;