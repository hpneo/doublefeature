module.exports = {
  up: function(migration) {
    migration.createTable('movies', {
      title: 'string',
      tagline: 'string',
      director: 'string',
      year: 'string',
      file_path: 'string',
      backdrop_path: 'string',
      poster_path: 'string',
      tmdb_id: 'string'
    }, {
      useTimestamps: true
    });
  },
  down: function(migration) {
    migration.dropTable('movies');
  }
};