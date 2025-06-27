import React, { useState, useRef } from 'react';
import { useRecorder } from './useRecorder';

export default function MetronomeRecorder({ onFinish }: { onFinish: (blob: Blob) => void }) {
  const { recording, audioURL, start, stop } = useRecorder();
  const recRef = useRef<MediaRecorder | null>(null);

  const begin = async () => {
    const rec = await start();
    recRef.current = rec;
    setTimeout(() => stop(recRef.current!), 5000); // record 5s
  };

  const save = async () => {
    if (!audioURL) return;
    const blob = await fetch(audioURL).then(r => r.blob());
    onFinish(blob);
  };

  return (
    <div>
      <button onClick={begin} disabled={recording}>
        Record to Metronome
      </button>
      {audioURL && (
        <>
          <audio controls src={audioURL} />
          <button onClick={save}>Finish & Classify</button>
        </>
      )}
    </div>
  );
}
