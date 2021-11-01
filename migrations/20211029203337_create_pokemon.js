exports.up = function(knex) {
    return knex.schema.createTable('pokemon', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.integer('pokemon_id');
        table.string('name').notNullable();
        table.integer('height');
        table.integer('weight');
        table.string('image')
        table.timestamps(true, true); // adds created_at and updated_at
      });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pokemon');
};