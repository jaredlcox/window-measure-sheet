import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to window_measure_sheet database
export async function connectToMainDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  });

  return connection;
}

// Connect to GeoStateDB database
export async function connectToGeoStateDB() {
  const connection = await mysql.createConnection({
    host: process.env.GEO_DB_HOST,
    user: process.env.GEO_DB_USERNAME,
    password: process.env.GEO_DB_PASSWORD,
    database: process.env.GEO_DB_DATABASE,
    port: process.env.GEO_DB_PORT,
  });

  return connection;
}
