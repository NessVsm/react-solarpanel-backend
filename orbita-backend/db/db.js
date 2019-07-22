
const database = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'orbita'
    }
  });
  module.exports = {
    database
  }