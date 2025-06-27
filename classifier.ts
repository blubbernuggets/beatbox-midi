import * as tf from '@tensorflow/tfjs';

let model: tf.LayersModel | null = null;

export async function loadModel() {
  if (!model) {
    model = await tf.loadLayersModel('/model/model.json');
  }
}

export async function classifyAudio(audioBuffer: Float32Array): Promise<{ label: string; time: number }[]> {
  if (!model) throw new Error('Model not loaded');
  const result: { label: string; time: number }[] = [];
  const frameSize = 16000;
  for (let i = 0; i < audioBuffer.length; i += frameSize / 2) {
    const frame = audioBuffer.slice(i, i + frameSize);
    const input = tf.tensor(frame, [1, frame.length]);
    const prediction = model.predict(input) as tf.Tensor;
    const labelIndex = prediction.argMax(-1).dataSync()[0];
    const label = ['kick', 'snare', 'hihat', 'crash'][labelIndex];
    result.push({ label, time: i / 16000 });
  }
  return result;
}
