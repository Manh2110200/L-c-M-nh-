
import React, { useState } from 'react';
import { Gift, X, RefreshCw, Sparkles, Send } from 'lucide-react';
import { AppState, ChristmasWish } from '../types';

interface UIOverlayProps {
  appState: AppState;
  onOpenGift: (name: string) => void;
  wish: ChristmasWish | null;
  onClose: () => void;
}

const UIOverlay: React.FC<UIOverlayProps> = ({ appState, onOpenGift, wish, onClose }) => {
  const [recipientName, setRecipientName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipientName.trim()) {
      onOpenGift(recipientName);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-between p-6 z-20">
      {/* Header */}
      <div className="w-full text-center mt-8">
        <h1 className="text-5xl md:text-8xl text-white font-christmas drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all">
          Merry Christmas
        </h1>
        <div className="h-1 w-24 bg-red-600 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
      </div>

      {/* Main Interaction Area */}
      <div className="flex flex-col items-center gap-8 mb-16 pointer-events-auto w-full max-w-sm">
        {appState === AppState.IDLE && (
          <div className="w-full bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h2 className="text-white text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <Sparkles className="text-yellow-400" size={20} />
              Tạo Quà Noel 3D
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nhập tên người nhận..."
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all text-center font-medium"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full group relative flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-bold text-lg shadow-[0_10px_20px_rgba(220,38,38,0.3)] transition-all transform active:scale-95"
              >
                <Gift className="group-hover:rotate-12 transition-transform" />
                Gửi Lời Chúc
                <div className="absolute -inset-1 bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </form>
          </div>
        )}

        {appState === AppState.GENERATING && (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
              <Gift className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 animate-pulse" size={24} />
            </div>
            <p className="text-white text-sm font-bold uppercase tracking-[0.3em] animate-pulse">Đang gói quà...</p>
          </div>
        )}
      </div>

      {/* Wish Display Modal */}
      {appState === AppState.DISPLAYING && wish && (
        <div className="fixed inset-0 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md pointer-events-auto z-50">
          <div className="relative max-w-md w-full bg-[#1a0505] p-10 rounded-[2.5rem] border-2 border-yellow-500/30 shadow-[0_0_80px_rgba(220,38,38,0.3)] animate-in zoom-in duration-500 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-10"
            >
              <X size={28} />
            </button>
            
            <div className="relative z-10 text-center space-y-8">
              <div className="flex justify-center">
                <div className="bg-gradient-to-tr from-yellow-500 to-red-500 p-[2px] rounded-full">
                  <div className="bg-[#1a0505] p-5 rounded-full">
                    <Sparkles className="text-yellow-400" size={40} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-christmas text-yellow-400">Giáng Sinh An Lành</h2>
                <div className="h-px w-20 bg-white/10 mx-auto"></div>
              </div>
              
              <p className="text-xl text-white/95 leading-relaxed italic font-medium drop-shadow-sm">
                "{wish.message}"
              </p>
              
              <div className="pt-6">
                <button
                  onClick={() => onOpenGift(recipientName)}
                  className="flex items-center gap-2 mx-auto text-yellow-500/60 hover:text-yellow-400 text-sm font-bold uppercase tracking-widest transition-all"
                >
                  <RefreshCw size={16} /> Nhận lời chúc khác
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Text */}
      <div className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-bold mb-4">
        Handcrafted with love for the holidays
      </div>
    </div>
  );
};

export default UIOverlay;
