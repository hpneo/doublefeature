module.exports = {
  up: function(migration) {
    migration.createTable('genres', {
      name: 'string',
      tmdb_id: 'string'
    }, {
      useTimestamps: true
    });
  },
  down: function(migration) {
    migration.dropTable('genres');
  }
};