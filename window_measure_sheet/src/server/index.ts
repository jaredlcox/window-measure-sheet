import express from "express";
import { connectToMainDatabase, connectToGeoStateDB } from "./db";
import dotenv from "dotenv";
import cors from "cors"; // Import the CORS middleware

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Enable CORS for your frontend (http://localhost:3000)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.2.143:3000"], // Allow multiple origins
  })
);

// Example route to get data from the window_measure_sheet database
app.get("/api/main-data", async (req, res) => {
  try {
    const db = await connectToMainDatabase();
    const [rows] = await db.execute("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Example route to get data from the GeoStateDB database
app.get("/api/geo-data", async (req, res) => {
  const { lat, long } = req.query;

  if (!long || !lat || Array.isArray(long) || Array.isArray(lat)) {
    return res
      .status(400)
      .json({ error: "Coordinates are required and must be single values" });
  }

  // Extract the first two decimal places from latitude and longitude
  const longitudePart = (long as string).substring(0, 6); // -83.65
  const latitudePart = (lat as string).substring(0, 5); // 43.01

  try {
    const db = await connectToGeoStateDB();

    // Create the REGEXP pattern for latitude and longitude
    const formattedRegExp = `'-?${longitudePart}[0-9]*, ${latitudePart}[0-9]*'`;

    // Directly embed the formattedRegExp in the query string
    const query = `
      SELECT * 
      FROM michigan_geojson_data 
      WHERE geometry REGEXP ${formattedRegExp};
    `;
    
    console.log(query);

    // Execute the query without bind parameters since REGEXP is embedded directly
    const [rows] = await db.query(query);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
