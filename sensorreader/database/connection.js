const pg = require('pg');

async function main(callback) {
    const client = new pg.Client({
        user: 'semerci',
        host: 'localhost',
        database: 'Laundry',
        password: 'ccc',
        port: 5432,
    });
    try {
      await client.connect();
      await callback(client);
      
    } catch (err) {
      console.error(err);
      throw (new Error('Database connection failed'));
    }
  }
  module.exports = main;
