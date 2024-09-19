import express from 'express';
import { connectToMainDatabase, connectToGeoStateDB } from './db'; // Import database connections
import dotenv from 'dotenv';

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Example route to get data from the window_measure_sheet database
app.get('/api/main-data', async (req, res) => {
  try {
    const db = await connectToMainDatabase();
    const [rows] = await db.execute('SELECT * FROM users'); // Replace 'some_table' with your actual table
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Example route to get data from the GeoStateDB database
app.get('/api/geo-data', async (req, res) => {
  try {
    const db = await connectToGeoStateDB();
    const [rows] = await db.execute('SELECT * FROM `michigan_geojson_data` WHERE `geometry` LIKE "%41.8193%"'); // Replace 'geo_states' with your actual table
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

const PORT = process.env.PORT || 5000; // You can change the port if needed
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
