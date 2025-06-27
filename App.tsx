import React, { useState } from 'react';
import TrainingWizard from './components/TrainingWizard';
import MetronomeRecorder from './components/MetronomeRecorder';
import MidiExporter from './components/MidiExporter';
import { classifyAudio, loadModel } from './services/classifier';

export default function App() {
  const [detections, setDetections] = useState<{ label: string; time: number }[]>([]);

  async function handleRecording(blob: Blob) {
    await loadModel();
    const arrayBuffer = await blob.arrayBuffer();
    const audioCtx = new AudioContext();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const float32 = audioBuffer.getChannelData(0);
    const result = await classifyAudio(float32);
    setDetections(result);
  }

  return (
    <div>
      <h1>Beatbox MIDI Generator</h1>
      <TrainingWizard />
      <MetronomeRecorder onFinish={handleRecording} />
      {detections.length > 0 && <MidiExporter detections={detections} />}
    </div>
  );
}
