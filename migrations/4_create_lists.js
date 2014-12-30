module.exports = {
  up: function(migration) {
    migration.createTable('lists', {
      name: 'string'
    }, {
      useTimestamps: true
    });
  },
  down: function(migration) {
    migration.dropTable('lists');
  }
};