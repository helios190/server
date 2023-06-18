const pg = require('pg');

const config = {
    host: '74.235.43.176', // IP address of your Azure virtual machine
    port: 5432, // Default PostgreSQL port
    user: 'postgres', // PostgreSQL username
    password: 'AdzkiaKhansa_12345', // PostgreSQL password
    database: 'SBM-Final', // PostgreSQL database name
};

const client = new pg.Client(config);

client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
    // Perform database operations here
  })
  .catch((error) => {
    console.error('Error connecting to the PostgreSQL database', error);
  });

module.exports = client;