import React from 'react';
import { Pet } from '../types';

interface PetDisplayProps {
  pet: Pet;
  onReset: () => void;
}

const PetDisplay: React.FC<PetDisplayProps> = ({ pet, onReset }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Epic': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Rare': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="flex flex-col items-center animate-fade-in-up w-full max-w-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 w-full relative overflow-hidden">
        
        {/* Glow effect behind image */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-indigo-50 to-white z-0"></div>

        {/* Image Container */}
        <div className="relative z-10 flex justify-center mb-6 h-48 items-center">
            {pet.imageUrl ? (
                <img 
                src={pet.imageUrl} 
                alt={pet.name} 
                className="w-40 h-40 object-contain pixelated drop-shadow-lg animate-[float_4s_ease-in-out_infinite]"
                />
            ) : (
                <div className="w-32 h-32 bg-slate-200 animate-pulse rounded-lg"></div>
            )}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border ${getRarityColor(pet.rarity)}`}>
            {pet.rarity}
          </div>
          
          <h2 className="text-2xl font-black text-slate-800 mb-1">{pet.name}</h2>
          <p className="text-indigo-500 font-medium text-sm mb-4">{pet.type}</p>
          
          <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-100">
            <p className="text-slate-600 text-sm leading-relaxed">
              <span className="font-semibold text-slate-800">性格：</span> 
              {pet.personality}
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={onReset}
        className="mt-8 px-8 py-3 bg-slate-900 text-white font-bold rounded-full shadow-lg hover:bg-indigo-600 hover:shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
      >
        再次孵化
      </button>
    </div>
  );
};

export default PetDisplay;
