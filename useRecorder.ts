import { useState } from 'react';

export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  let mediaRecorder: MediaRecorder;
  let chunks: BlobPart[] = [];

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      setAudioURL(URL.createObjectURL(blob));
    };
    chunks = [];
    mediaRecorder.start();
    setRecording(true);
    return mediaRecorder;
  }

  function stop(rec: MediaRecorder) {
    rec.stop();
    setRecording(false);
  }

  return { recording, audioURL, start, stop };
}
