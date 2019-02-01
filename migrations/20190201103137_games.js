
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games',table=>{
      table.increments();
      table.string('title',255).notNullable();
      table.string('genre',255).notNullable();
      table.integer('releaseYear',255).notNullable()
  })
};

exports.down = function(knex, Promise) {
  
};
