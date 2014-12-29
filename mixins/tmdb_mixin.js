var MovieDB = require('moviedb')('fdf3c94669f3cc0906fddc99e5cd8208');

function search(query) {
  var promise = new window.Promise(function(resolve, reject) {
    MovieDB.searchMovie({ query: query }, function(error, response) {
      if (error) {
        reject(error);
      }
      else {
        resolve(response);
      }
    });
  });

  return promise;
}

function find(id) {
  var promise = new window.Promise(function(resolve, reject) {
    MovieDB.movieInfo({ id: id, append_to_response: 'credits' }, function(error, response) {
      if (error) {
        reject(error);
      }
      else {
        resolve(response);
      }
    });
  });

  return promise;
}

module.exports = {
  search: search,
  find: find
};