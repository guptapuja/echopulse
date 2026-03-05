import { useState, useEffect } from 'react';

export const useVoice = (onFinalTranscript) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onFinalTranscript(transcript);
    };

    recognition.start();
  };

  return { isListening, startListening };
};