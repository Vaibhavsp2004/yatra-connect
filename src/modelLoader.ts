import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import * as ort from 'onnxruntime-node';

// Initialize Supabase Client
const SUPABASE_URL = 'https://ryghbxydtrlmowsiywio.supabase.co';
const SUPABASE_KEY = '<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Z2hieHlkdHJsbW93c2l5d2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDQyNTUsImV4cCI6MjA1NzYyMDI1NX0.b2JoADwNRWGKQnp8VViiDKYt8CaaEDkzGBP_v9FEddQ>';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Define the bucket and file name
const bucketName = '<namma-yatri-prediction>';
const filePath = '<ride_demand_model.onnx>.onnx';

export async function downloadModel(): Promise<Uint8Array> {
  try {
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .createSignedUrl(filePath, 60);

    if (error || !data) throw new Error('Error creating signed URL');

    const fileUrl = data.signedUrl;
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });

    if (response.status === 200) {
      console.log('✅ Model file downloaded successfully!');
      return new Uint8Array(response.data);
    } else {
      throw new Error(`Failed to download model: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to download model');
  }
}

export async function runModel(modelBuffer: Uint8Array, inputTensor: ort.Tensor): Promise<ort.Tensor> {
  const session = await ort.InferenceSession.create(modelBuffer);

  const feeds = { input: inputTensor };
  const results = await session.run(feeds);
  const output = results['output'];

  console.log('✅ Prediction completed successfully!');
  return output;
}
