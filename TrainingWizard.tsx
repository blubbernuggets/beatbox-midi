import React, { useState } from 'react';
import { useRecorder } from '../hooks/useRecorder';

const steps = [
  { id: 'kick', label: 'Kick', instructions: 'Make your kick sound (e.g., "buh")' },
  { id: 'snare', label: 'Snare', instructions: 'Make your snare sound (e.g., "psh")' },
  { id: 'hihat', label: 'Hi-Hat', instructions: 'Make your hi-hat (e.g., "tss")' },
  { id: 'crash', label: 'Crash', instructions: 'Say your crash cymbal (e.g., "tssh")' },
  { id: 'kick_snare', label: 'Kick → Snare', instructions: 'Now say "kick then snare"' },
];

export default function TrainingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [recordings, setRecordings] = useState<Record<string, Blob>>({});
  const { recording, audioURL, start, stop } = useRecorder();

  async function handleRecord() {
    const rec = await start();
    setTimeout(() => stop(rec), 2000);
  }

  function handleNext() {
    if (audioURL) {
      fetch(audioURL).then(res => res.blob()).then(blob => {
        const id = steps[currentStep].id;
        setRecordings({ ...recordings, [id]: blob });
        setCurrentStep(s => s + 1);
      });
    }
  }

  return (
    <div>
      {currentStep < steps.length ? (
        <>
          <h2>{steps[currentStep].label}</h2>
          <p>{steps[currentStep].instructions}</p>
          <button onClick={handleRecord} disabled={recording}>
            {recording ? 'Recording...' : 'Record'}
          </button>
          {audioURL && (
            <>
              <audio controls src={audioURL} />
              <button onClick={handleNext}>Next</button>
            </>
          )}
        </>
      ) : (
        <p>All samples recorded!</p>
      )}
    </div>
  );
}
