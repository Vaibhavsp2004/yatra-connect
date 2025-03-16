
import { downloadModel, runModel } from '../modelLoader';
import * as ort from 'onnxruntime-node';

async function makePrediction() {
  try {
    const modelBuffer = await downloadModel();

    const sampleInput = new Float32Array([1.0, 2.0, 3.0, 4.0]); // Replace with your actual input
    const inputTensor = new ort.Tensor('float32', sampleInput, [1, sampleInput.length]);

    const prediction = await runModel(modelBuffer, inputTensor);
    console.log('Prediction:', prediction.data);
  } catch (error) {
    console.error('Error making prediction:', error);
  }
}

makePrediction();
