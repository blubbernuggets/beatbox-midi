import React from 'react';
import { createMidi } from './midi';

export default function MidiExporter({ detections }: { detections: { label: string; time: number }[] }) {
  return <button onClick={() => createMidi(detections)}>Download MIDI</button>;
}
