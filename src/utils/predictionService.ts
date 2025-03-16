
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const SUPABASE_URL = 'https://ryghbxydtrlmowsiywio.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Z2hieHlkdHJsbW93c2l5d2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDQyNTUsImV4cCI6MjA1NzYyMDI1NX0.b2JoADwNRWGKQnp8VViiDKYt8CaaEDkzGBP_v9FEddQ';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Mock prediction data (to simulate ONNX model prediction)
export const predictionResults = [
  { area: 'Koramangala', predicted_demand: 0.89, coordinates: { lat: 12.9352, lng: 77.6245 } },
  { area: 'Electronic City', predicted_demand: 0.83, coordinates: { lat: 12.8452, lng: 77.6602 } },
  { area: 'Marathahalli', predicted_demand: 0.79, coordinates: { lat: 12.9591, lng: 77.6987 } },
  { area: 'Indiranagar', predicted_demand: 0.76, coordinates: { lat: 12.9784, lng: 77.6408 } },
  { area: 'Whitefield', predicted_demand: 0.69, coordinates: { lat: 12.9698, lng: 77.7500 } },
  { area: 'HSR Layout', predicted_demand: 0.62, coordinates: { lat: 12.9116, lng: 77.6446 } },
  { area: 'Malleshwaram', predicted_demand: 0.56, coordinates: { lat: 12.9970, lng: 77.5705 } },
  { area: 'JP Nagar', predicted_demand: 0.51, coordinates: { lat: 12.9100, lng: 77.5900 } },
  { area: 'Yelahanka', predicted_demand: 0.42, coordinates: { lat: 13.1034, lng: 77.5855 } },
  { area: 'Jayanagar', predicted_demand: 0.37, coordinates: { lat: 12.9300, lng: 77.5800 } }
];

// Function to store predictions in Supabase
export const storePrediction = async (predictionData: any) => {
  try {
    const { data, error } = await supabase
      .from('predictions')
      .insert([
        { 
          data: predictionData,
          created_at: new Date().toISOString() 
        }
      ]);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error storing prediction:', error);
    throw error;
  }
};

// Function to store pre-booking details in Supabase
export const storePreBooking = async (bookingDetails: any) => {
  try {
    const { data, error } = await supabase
      .from('pre_bookings')
      .insert([
        { 
          ...bookingDetails,
          created_at: new Date().toISOString() 
        }
      ]);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error storing pre-booking:', error);
    throw error;
  }
};

// Simulate running an ONNX model
export const runPredictionModel = async (inputFeatures: any) => {
  // In a real implementation, this would use the actual ONNX model
  // For now, we'll return the mock data with some randomization
  
  // Add some randomness to the predictions to simulate real-time changes
  return predictionResults.map(result => ({
    ...result,
    predicted_demand: Math.min(0.95, Math.max(0.3, result.predicted_demand + (Math.random() - 0.5) * 0.2))
  }));
};

// Get high demand areas that should be recommended to drivers
export const getHighDemandAreas = async () => {
  const predictions = await runPredictionModel({});
  return predictions
    .filter(area => area.predicted_demand > 0.7)
    .sort((a, b) => b.predicted_demand - a.predicted_demand);
};
