// src/server.ts
import express from 'express';
import connectDB from './database';
import GeoData from './models/GeoData';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Create GeoJSON data
app.post('/geojson', async (req, res) => {
  try {
    const geoData = new GeoData(req.body);
    await geoData.save();
    res.status(201).json(geoData);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get all GeoJSON data
app.get('/geojson', async (req, res) => {
  try {
    const geoData = await GeoData.find();
    res.status(200).json(geoData);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));