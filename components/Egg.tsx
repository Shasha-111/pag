import React from 'react';

interface EggProps {
  onClick: () => void;
  isHatching: boolean;
  disabled: boolean;
}

const Egg: React.FC<EggProps> = ({ onClick, isHatching, disabled }) => {
  return (
    <div 
      className={`relative w-48 h-64 cursor-pointer transition-all duration-300 ${isHatching ? 'animate-shake' : 'animate-float hover:scale-105 active:scale-95'}`}
      onClick={!disabled ? onClick : undefined}
    >
      {/* Egg Body SVG */}
      <svg 
        viewBox="0 0 100 130" 
        className="w-full h-full drop-shadow-xl"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="eggGradient" x1="50" y1="0" x2="50" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF1F2" />
            <stop offset="1" stopColor="#FECDD3" />
          </linearGradient>
          <filter id="pixelate" x="0" y="0">
             <feFlood floodColor="#000" floodOpacity="0.1" result="shadow"/>
          </filter>
        </defs>
        
        {/* Main Shape */}
        <path 
          d="M50 5 C 20 5, 5 45, 5 80 C 5 110, 25 125, 50 125 C 75 125, 95 110, 95 80 C 95 45, 80 5, 50 5 Z" 
          fill="url(#eggGradient)" 
          stroke="#FDA4AF" 
          strokeWidth="3"
        />
        
        {/* Decorative Spots (Pixel-ish squares) */}
        <rect x="30" y="30" width="8" height="8" fill="#F43F5E" className="opacity-40" />
        <rect x="60" y="50" width="10" height="10" fill="#F43F5E" className="opacity-40" />
        <rect x="25" y="80" width="12" height="12" fill="#F43F5E" className="opacity-40" />
        <rect x="70" y="90" width="6" height="6" fill="#F43F5E" className="opacity-40" />
        <rect x="45" y="60" width="6" height="6" fill="#F43F5E" className="opacity-40" />

        {/* Shine */}
        <path 
          d="M30 20 Q 40 15, 50 20" 
          stroke="white" 
          strokeWidth="4" 
          strokeLinecap="round" 
          className="opacity-60"
        />
      </svg>
      
      {/* Text hint */}
      {!isHatching && !disabled && (
        <div className="absolute -bottom-12 left-0 right-0 text-center text-slate-400 font-medium text-sm tracking-widest uppercase animate-pulse">
          点击孵化
        </div>
      )}
       {isHatching && (
        <div className="absolute -bottom-12 left-0 right-0 text-center text-indigo-500 font-bold text-sm tracking-widest uppercase animate-pulse">
          孵化中...
        </div>
      )}
    </div>
  );
};

export default Egg;
