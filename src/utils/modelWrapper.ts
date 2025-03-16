
import { getHighDemandAreas, storePrediction } from './predictionService';

// This wrapper simulates the functionality that would be provided by
// integrating the ONNX model directly.

interface PredictionInput {
  time?: string;
  day?: string;
  location?: string;
  weather?: string;
  specialEvents?: boolean;
}

interface PredictionResult {
  area: string;
  predicted_demand: number;
  coordinates: { lat: number; lng: number };
}

// Function to get predictions and store them
export const predictRideDemand = async (input: PredictionInput = {}): Promise<PredictionResult[]> => {
  try {
    // Get predictions from our simulated model
    const predictions = await getHighDemandAreas();
    
    // Store the prediction results in Supabase
    await storePrediction(predictions);
    
    return predictions;
  } catch (error) {
    console.error('Error predicting ride demand:', error);
    throw error;
  }
};

// Function to guide drivers to high demand areas
export const getDriverRecommendations = async (
  driverLocation: { lat: number; lng: number }
): Promise<PredictionResult[]> => {
  try {
    // Get high demand areas
    const highDemandAreas = await getHighDemandAreas();
    
    // Calculate distances from driver to each high demand area
    // and sort by a combination of predicted demand and proximity
    const recommendationsWithDistance = highDemandAreas.map(area => {
      const distance = calculateDistance(
        driverLocation.lat, 
        driverLocation.lng,
        area.coordinates.lat,
        area.coordinates.lng
      );
      
      return {
        ...area,
        distance,
        score: area.predicted_demand * (1 / (distance + 0.1)) // Score based on demand and proximity
      };
    });
    
    // Sort by score (higher is better)
    return recommendationsWithDistance
      .sort((a, b) => b.score - a.score)
      .map(({ score, distance, ...rest }) => rest); // Remove the temporary calculation fields
  } catch (error) {
    console.error('Error getting driver recommendations:', error);
    throw error;
  }
};

// Helper function to calculate distance between two points (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI/180);
}
