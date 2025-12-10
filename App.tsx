import React, { useState, useCallback } from 'react';
import Egg from './components/Egg';
import PetDisplay from './components/PetDisplay';
import { generatePetProfile, generatePetImage } from './services/geminiService';
import { Pet, GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [pet, setPet] = useState<Pet | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleHatch = useCallback(async () => {
    if (gameState === 'hatching') return;
    
    setGameState('hatching');
    setError(null);
    
    try {
      // 1. Generate text profile first
      const profile = await generatePetProfile();
      
      // 2. Generate image based on description
      const imageUrl = await generatePetImage(profile.description);
      
      setPet({
        ...profile,
        imageUrl
      });
      
      setGameState('hatched');
    } catch (err: any) {
      console.error(err);
      setError("孵化失败了，可能是网络问题或魔力不足。请稍后再试。");
      setGameState('error');
    }
  }, [gameState]);

  const handleReset = () => {
    setPet(null);
    setGameState('idle');
    setError(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <main className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-2">
            像素宠物蛋
          </h1>
          <p className="text-slate-500 font-medium">
            Gemini AI 驱动的随机孵化器
          </p>
        </header>

        {/* Main Content Area */}
        <div className="w-full flex justify-center items-center min-h-[400px]">
          {gameState === 'idle' || gameState === 'hatching' ? (
            <Egg 
              onClick={handleHatch} 
              isHatching={gameState === 'hatching'} 
              disabled={gameState === 'hatching'} 
            />
          ) : gameState === 'hatched' && pet ? (
            <PetDisplay pet={pet} onReset={handleReset} />
          ) : gameState === 'error' ? (
             <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-red-100">
                <div className="text-4xl mb-4">🐣</div>
                <h3 className="text-xl font-bold text-red-500 mb-2">哎呀！</h3>
                <p className="text-slate-600 mb-6">{error || "发生了一个未知错误"}</p>
                <button 
                  onClick={handleReset}
                  className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-colors"
                >
                  重试
                </button>
             </div>
          ) : null}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="absolute bottom-4 text-slate-400 text-xs text-center w-full z-10">
        Powered by Google Gemini 2.5 Flash & Tailwind CSS
      </footer>
    </div>
  );
};

export default App;
