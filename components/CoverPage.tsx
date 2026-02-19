
import React from 'react';

interface Props {
  onStart: () => void;
  name: string;
  setName: (name: string) => void;
}

const CoverPage: React.FC<Props> = ({ onStart, name, setName }) => {
  return (
    <div className="relative min-h-[850px] flex flex-col items-center justify-center text-center bg-[#fcfdfc] p-4 overflow-hidden">
      {/* Elegant Decorative Border / Frame */}
      <div className="absolute inset-4 border-2 border-[#1a8a3d]/20 rounded-[40px] pointer-events-none z-0"></div>
      <div className="absolute inset-8 border border-[#1a8a3d]/10 rounded-[32px] pointer-events-none z-0"></div>

      {/* Background Decorative Elements */}
      <div className="absolute top-12 left-12 text-4xl opacity-20 select-none animate-pulse">🌙</div>
      <div className="absolute top-12 right-12 text-4xl opacity-20 select-none animate-pulse delay-700">✨</div>
      <div className="absolute bottom-32 left-16 text-6xl opacity-10 select-none rotate-12">🕌</div>
      <div className="absolute bottom-32 right-16 text-6xl opacity-10 select-none -rotate-12">📿</div>

      {/* Floating Sparkles in background */}
      <div className="absolute top-1/4 right-1/4 text-xs opacity-20">✦</div>
      <div className="absolute bottom-1/4 left-1/3 text-xs opacity-20">✦</div>

      {/* Main Content Container */}
      <div className="z-10 flex flex-col items-center max-w-lg w-full">
        
        {/* Decorative Top Ornament */}
        <div className="mb-8 flex items-center gap-3 opacity-40">
           <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#1a8a3d]"></div>
           <span className="text-[#1a8a3d] text-xl">✦</span>
           <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#1a8a3d]"></div>
        </div>

        {/* Hero Section with Orbiting Icons */}
        <div className="mb-12 relative">
           {/* The Central Circle */}
           <div className="relative z-20 scale-110">
              <div className="w-56 h-56 bg-gradient-to-br from-[#1a8a3d] to-[#157131] rounded-full flex items-center justify-center text-white border-[8px] border-white shadow-[0_25px_60px_rgba(26,138,61,0.25)] relative overflow-hidden">
                 {/* Inner Glow/Pattern */}
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                 <div className="text-center relative z-10">
                    <h1 className="text-5xl font-black drop-shadow-lg tracking-tight">রমজান</h1>
                    <h2 className="text-3xl font-medium mt-1 tracking-widest opacity-90">প্ল্যানার</h2>
                 </div>
              </div>
           </div>
           
           {/* Beautifully Arranged Orbiting Icons */}
           {/* 1. Quran - Top Left */}
           <div className="absolute -top-10 -left-10 w-16 h-16 bg-white border-2 border-[#1a8a3d]/30 rounded-full flex items-center justify-center text-2xl shadow-xl hover:scale-110 transition-all cursor-default z-30 animate-[bounce_3s_infinite_ease-in-out]">📖</div>
           
           {/* 2. Kaaba - Top Right */}
           <div className="absolute -top-10 -right-10 w-16 h-16 bg-white border-2 border-[#1a8a3d]/30 rounded-full flex items-center justify-center text-2xl shadow-xl hover:scale-110 transition-all cursor-default z-30 animate-[bounce_3.5s_infinite_ease-in-out_0.5s]">🕋</div>
           
           {/* 3. Checklist - Center Right */}
           <div className="absolute top-1/2 -right-16 -translate-y-1/2 w-16 h-16 bg-white border-2 border-[#1a8a3d]/30 rounded-full flex items-center justify-center text-2xl shadow-xl hover:scale-110 transition-all cursor-default z-30 animate-[bounce_4s_infinite_ease-in-out_1s]">📋</div>
           
           {/* 4. Dua - Bottom Right */}
           <div className="absolute -bottom-6 -right-8 w-16 h-16 bg-white border-2 border-[#1a8a3d]/30 rounded-full flex items-center justify-center text-2xl shadow-xl hover:scale-110 transition-all cursor-default z-30 animate-[bounce_3.2s_infinite_ease-in-out_1.5s]">🤲</div>
           
           {/* 5. Clock - Bottom Left */}
           <div className="absolute -bottom-6 -left-8 w-16 h-16 bg-white border-2 border-[#1a8a3d]/30 rounded-full flex items-center justify-center text-2xl shadow-xl hover:scale-110 transition-all cursor-default z-30 animate-[bounce_3.8s_infinite_ease-in-out_2s]">🕒</div>
           
           {/* 6. Extra Decor: Tasbih - Center Left */}
           <div className="absolute top-1/2 -left-16 -translate-y-1/2 w-12 h-12 bg-[#eefcf2] border border-[#1a8a3d]/20 rounded-full flex items-center justify-center text-xl shadow-lg opacity-60 z-10 animate-pulse">✨</div>
        </div>

        {/* Subtitle Pill */}
        <div className="bg-[#eefcf2] px-10 py-3.5 rounded-full inline-block mb-14 text-[#1a8a3d] font-bold border-2 border-[#1a8a3d]/20 shadow-sm backdrop-blur-sm">
          মাসব্যাপী আত্মশুদ্ধির সচিত্র পরিকল্পনা
        </div>

        {/* Name Input Field */}
        <div className="w-full max-w-xs mx-auto mb-16 relative group">
          <label className="block text-gray-400 text-[10px] font-black mb-2 uppercase tracking-[0.2em] group-focus-within:text-[#1a8a3d] transition-colors">আপনার নাম</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="নাম লিখুন..."
            className="w-full border-b-2 border-[#1a8a3d]/20 p-4 bg-transparent focus:outline-none focus:border-[#1a8a3d] text-2xl font-bold text-center placeholder-gray-200 transition-all"
          />
          {/* Decorative Input Accents */}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1a8a3d] transition-all duration-500 group-focus-within:w-full"></div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-20 text-[#1a8a3d] text-xs">❦</div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={onStart}
          className="group relative bg-[#1a8a3d] text-white px-20 py-5 rounded-full font-black text-xl overflow-hidden shadow-[0_15px_45px_rgba(26,138,61,0.35)] hover:shadow-[0_20px_60px_rgba(26,138,61,0.45)] transition-all transform hover:-translate-y-1.5 active:scale-95 z-20"
        >
          <span className="relative z-10 flex items-center gap-4">
            শুরু করুন <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
          </span>
          {/* Glossy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
        </button>

        {/* Bottom Ornament */}
        <div className="mt-14 flex items-center gap-4 opacity-30">
           <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#1a8a3d]"></div>
           <span className="text-[#1a8a3d] text-xs">RAMADAN KAREEM</span>
           <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#1a8a3d]"></div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default CoverPage;
