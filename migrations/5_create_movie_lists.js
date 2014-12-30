module.exports = {
  up: function(migration) {
    migration.createTable('movie_lists', {
      movie_id: 'integer',
      list_id: 'integer'
    }, {
      useTimestamps: true
    });
  },
  down: function(migration) {
    migration.dropTable('movie_lists');
  }
};