module.exports = {
  up: function(migration) {
    migration.createTable('movie_genres', {
      movie_id: 'integer',
      genre_id: 'integer'
    }, {
      useTimestamps: true
    });
  },
  down: function(migration) {
    migration.dropTable('movie_genres');
  }
};