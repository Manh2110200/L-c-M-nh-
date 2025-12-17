
import React from 'react';
import { Gift, X, RefreshCw, Sparkles } from 'lucide-react';
import { AppState, ChristmasWish } from '../types';

interface UIOverlayProps {
  appState: AppState;
  onOpenGift: () => void;
  wish: ChristmasWish | null;
  onClose: () => void;
}

const UIOverlay: React.FC<UIOverlayProps> = ({ appState, onOpenGift, wish, onClose }) => {
  return (
    <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-between p-6 z-20">
      {/* Header */}
      <div className="w-full text-center mt-8">
        <h1 className="text-5xl md:text-7xl text-white font-christmas drop-shadow-[0_2px_15px_rgba(255,255,255,0.6)]">
          Merry Christmas
        </h1>
        <p className="text-red-400 font-medium tracking-[0.2em] mt-2 uppercase text-xs md:text-sm drop-shadow-md">
          Chạm vào phép màu Giáng sinh
        </p>
      </div>

      {/* Interaction Area */}
      <div className="flex flex-col items-center gap-6 mb-12 pointer-events-auto">
        {appState === AppState.IDLE && (
          <button
            onClick={onOpenGift}
            className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all transform hover:scale-110 active:scale-95"
          >
            <Gift className="group-hover:rotate-12 transition-transform" />
            Mở Quà Noel
            <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        )}

        {appState === AppState.GENERATING && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-white/20 border-t-red-500 rounded-full animate-spin"></div>
            <p className="text-white text-sm font-medium animate-pulse uppercase tracking-widest">Đang chuẩn bị lời chúc...</p>
          </div>
        )}
      </div>

      {/* Wish Modal */}
      {appState === AppState.DISPLAYING && wish && (
        <div className="fixed inset-0 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm pointer-events-auto z-50">
          <div className="relative max-w-sm w-full bg-gradient-to-br from-red-900/90 to-red-950/95 p-8 rounded-3xl border-2 border-yellow-500/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="bg-yellow-500/20 p-4 rounded-full">
                  <Sparkles className="text-yellow-400 animate-pulse" size={32} />
                </div>
              </div>
              
              <h2 className="text-3xl font-christmas text-yellow-400">Lời chúc từ trái tim</h2>
              
              <p className="text-lg text-white/90 leading-relaxed italic font-medium">
                "{wish.message}"
              </p>
              
              <div className="pt-4 flex justify-center">
                <button
                  onClick={onOpenGift}
                  className="flex items-center gap-2 text-white/60 hover:text-white text-xs transition-colors"
                >
                  <RefreshCw size={14} /> Nhận lời chúc khác
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold mb-4">
        Nhấn vào nút đỏ để nhận điều bất ngờ
      </div>
    </div>
  );
};

export default UIOverlay;
