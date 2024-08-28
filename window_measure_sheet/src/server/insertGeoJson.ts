import fs from 'fs';
import path from 'path';
import connectDB from './database';
import GeoData from './models/GeoData';

const insertGeoJson = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const filePath = path.join(__dirname, 'data', 'Michigan.geojson');
    console.log(`File path: ${filePath}`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('File not found');
      return;
    }

    console.log('File exists');

    // Read the entire file into memory (not ideal for very large files, but necessary to parse the full JSON)
    const geojsonData = fs.readFileSync(filePath, 'utf8');

    // Parse the JSON file (assuming it contains a FeatureCollection)
    const parsedData = JSON.parse(geojsonData);

    // Ensure the file contains a valid GeoJSON FeatureCollection
    if (parsedData.type !== 'FeatureCollection' || !Array.isArray(parsedData.features)) {
      throw new Error('Invalid GeoJSON format');
    }

    // Extract the first 1000 features
    const first1000Features = parsedData.features.slice(0, 1000);

    // Insert the features into MongoDB
    await GeoData.insertMany(first1000Features);
    console.log('Inserted 1000 records into MongoDB');

  } catch (error) {
    console.error('Error inserting GeoJSON data:', error);
  } finally {
    // Close the connection after insertion
    process.exit();
  }
};

insertGeoJson();
