const config = require('../knexfile.js')
const knex = require('knex')(config)

//carrega as migrations knex migrate:latest
knex.migrate.latest([config])
module.exports = knex