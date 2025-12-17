
import React from 'react';

const UIOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-between p-8 z-10">
      {/* Header */}
      <div className="w-full text-center mt-10">
        <h1 className="text-6xl md:text-8xl text-white font-christmas drop-shadow-[0_2px_15px_rgba(255,255,255,0.6)] animate-pulse">
          Merry Christmas
        </h1>
        <p className="text-red-400 font-medium tracking-[0.3em] mt-4 uppercase text-sm md:text-lg drop-shadow-md">
          Chúc mừng Giáng sinh an lành
        </p>
      </div>

      {/* Aesthetic Footer */}
      <div className="text-white/30 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold mb-4">
        Magical 3D Experience • 2024
      </div>
    </div>
  );
};

export default UIOverlay;
