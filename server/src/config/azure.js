const sql = require('mssql');

let pool = null;

async function connectAzureSQL() {
  try {
    pool = await sql.connect({
      user: process.env.AZURE_SQL_USER,
      password: process.env.AZURE_SQL_PASSWORD,
      server: process.env.AZURE_SQL_SERVER,
      database: process.env.AZURE_SQL_DATABASE,
      options: {
        encrypt: true, // required for Azure
        trustServerCertificate: false,
      },
    });
    console.log('Connected to Azure SQL');
    return pool;
  } catch (err) {
    console.error('Azure SQL connection error:', err);
  }
}

module.exports = { 
  connectAzureSQL,
  sql: pool || sql // Export the pool if connected, otherwise the sql module
};
