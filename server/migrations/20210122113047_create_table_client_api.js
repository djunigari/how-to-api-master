exports.up = function(knex, Promise) {
    return knex.schema.createTable('clientApi', table => {
        table.increments('id').primary()
        table.string('email').notNull().unique()
        table.string('clientHostName').notNull()
        table.string('apiKey').notNull()
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('clientApi')
  };
  