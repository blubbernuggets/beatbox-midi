import { saveAs } from 'file-saver';

export function createMidi(events: { label: string; time: number }[]) {
  const noteMap: Record<string, number> = {
    kick: 36,
    snare: 38,
    hihat: 42,
    crash: 49,
  };
  let data: number[] = [];
  events.forEach(e => {
    data.push(0x90, noteMap[e.label], 100); // Note on
  });
  const blob = new Blob([new Uint8Array(data)], { type: 'audio/midi' });
  saveAs(blob, 'beatbox.mid');
}
