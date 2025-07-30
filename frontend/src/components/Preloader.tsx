import React, { useState, useEffect } from 'react';
import coralLogo from '../assets/coral-logo.jpg';

interface PreloaderProps {
  name: string;
  preloaderStep: 'welcome' | 'subtitle' | 'done';
  setPreloaderStep: (step: 'welcome' | 'subtitle' | 'done') => void;
}

const Preloader: React.FC<PreloaderProps> = ({ name, preloaderStep, setPreloaderStep }) => {
  const [typed, setTyped] = useState('');
  const [progress, setProgress] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);
  const subtitle = 'Coral Gardens Inventory Management';

  const funMessages = [
    "Great things are cooking...",
    "Inventory magic in progress!",
    "Stirring up some data...",
    "Almost there, Chef!",
    "Mixing ingredients for success..."
  ];

  useEffect(() => {
    // Progress bar animation
    let start = Date.now();
    const duration = 10000; // 10 seconds
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / duration) * 100));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fun message rotation every 2.5 seconds
    const msgInterval = setInterval(() => {
      setMessageIdx(idx => (idx + 1) % funMessages.length);
    }, 2500);
    return () => clearInterval(msgInterval);
  }, []);

  useEffect(() => {
    if (preloaderStep === 'welcome') {
      setTimeout(() => setPreloaderStep('subtitle'), 5000); // 5 seconds for welcome
    } else if (preloaderStep === 'subtitle') {
      let i = 0;
      setTyped('');
      const interval = setInterval(() => {
        setTyped(subtitle.slice(0, i + 1));
        i++;
        if (i === subtitle.length) {
          clearInterval(interval);
          setTimeout(() => setPreloaderStep('done'), 5000); // 5 seconds for subtitle
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [preloaderStep, setPreloaderStep]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <img
          src={coralLogo}
          alt="Logo"
          className="h-56 w-56 mb-10 animate-spin-slow-pulse"
        />
        <div className="text-blue-900 font-bold text-3xl mb-4 animate-fadein">
          {preloaderStep !== 'subtitle' ? `Welcome ${name}` : ''}
        </div>
        <div className="text-blue-700 text-2xl h-10 min-h-10 font-semibold tracking-wide animate-fadein mb-6">
          {preloaderStep === 'subtitle' ? typed : ''}
        </div>
        <div className="w-96 h-4 bg-blue-100 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-blue-500 text-lg font-medium animate-fadein" style={{ minHeight: 32 }}>
          {funMessages[messageIdx]}
        </div>
      </div>
      <style>{`
        @keyframes spin-slow-pulse {
          0% { 
            transform: scale(0.8); 
            opacity: 0.7; 
            filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.2));
          }
          25% { 
            transform: scale(1.0); 
            opacity: 0.85; 
            filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.5));
          }
          50% { 
            transform: scale(1.3); 
            opacity: 1; 
            filter: drop-shadow(0 0 40px rgba(59, 130, 246, 1)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.8));
          }
          75% { 
            transform: scale(1.0); 
            opacity: 0.85; 
            filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.5));
          }
          100% { 
            transform: scale(0.8); 
            opacity: 0.7; 
            filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.2));
          }
        }
        .animate-spin-slow-pulse {
          animation: spin-slow-pulse 8s linear infinite;
          border-radius: 50%;
        }
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadein {
          animation: fadein 0.7s ease;
        }
      `}</style>
    </div>
  );
};

export default Preloader; 