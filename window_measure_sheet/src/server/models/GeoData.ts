import mongoose, { Schema, Document } from 'mongoose';

interface IGeoData extends Document {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  properties: {
    [key: string]: any;
  };
}

const GeoDataSchema: Schema = new Schema({
  type: { type: String, required: true },
  geometry: {
    type: {
      type: String,
      enum: ['Point', 'LineString', 'Polygon', 'MultiPolygon'],
      required: true,
    },
    coordinates: { type: Array, required: true },
  },
  properties: { type: Object, required: true },
});

const GeoData = mongoose.model<IGeoData>('GeoData', GeoDataSchema);

export default GeoData;
