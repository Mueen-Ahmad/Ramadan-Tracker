
import React from 'react';
import { AppState } from '../types';

interface Props {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  onBack: () => void;
  onNext: () => void;
}

const ReviewPage: React.FC<Props> = ({ state, setState, onBack, onNext }) => {
  const updateList = (field: 'achievements' | 'disappointments', idx: number, val: string) => {
    const newList = [...state[field]];
    newList[idx] = val;
    setState(prev => ({ ...prev, [field]: newList }));
  };

  return (
    <div className="p-8 pb-24 bg-white min-h-[800px] text-gray-900">
       <h2 className="text-center text-[#1a8a3d] text-4xl font-black mb-12 tracking-tight">এই রমজানের প্রাপ্তি/অপ্রাপ্তি</h2>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="border-2 border-green-200 rounded-2xl overflow-hidden shadow-sm">
             <div className="bg-[#eefcf2] text-[#1a8a3d] p-4 text-center font-black text-xl border-b-2 border-green-200 uppercase">প্রাপ্তি</div>
             <div className="p-6 space-y-3">
                {state.achievements.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <span className="w-5 h-5 border-2 border-gray-300 rounded shrink-0 bg-white"></span>
                    <input 
                      value={item} 
                      onChange={e => updateList('achievements', idx, e.target.value)}
                      placeholder="নতুন অর্জন লিখুন..."
                      className="w-full border-b-2 border-dotted border-gray-200 focus:outline-none focus:border-[#1a8a3d] text-base font-bold text-gray-800 py-1 bg-white"
                    />
                  </div>
                ))}
             </div>
          </div>

          <div className="border-2 border-red-200 rounded-2xl overflow-hidden shadow-sm">
             <div className="bg-[#fff5f5] text-red-700 p-4 text-center font-black text-xl border-b-2 border-red-200 uppercase">অপ্রাপ্তি</div>
             <div className="p-6 space-y-3">
                {state.disappointments.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <span className="w-5 h-5 border-2 border-gray-300 rounded shrink-0 bg-white"></span>
                    <input 
                      value={item} 
                      onChange={e => updateList('disappointments', idx, e.target.value)}
                      placeholder="অপ্রাপ্তি বা দুর্বলতা..."
                      className="w-full border-b-2 border-dotted border-gray-200 focus:outline-none focus:border-red-500 text-base font-bold text-gray-800 py-1 bg-white"
                    />
                  </div>
                ))}
             </div>
          </div>
       </div>

       <div className="border-2 border-gray-200 rounded-2xl p-6 bg-gray-50 shadow-inner">
          <h4 className="text-center font-black text-gray-800 mb-6 text-lg leading-snug">প্রাপ্তিগুলোর জন্য শুকরিয়া ও অপ্রাপ্তির জন্য ইস্তেগফার এবং পরবর্তী বছরের জন্য পরিকল্পনা লিখুন।</h4>
          <textarea 
            value={state.reflections}
            onChange={e => setState(s => ({...s, reflections: e.target.value}))}
            className="w-full h-64 border-2 border-white p-6 focus:ring-0 text-gray-800 bg-white rounded-xl shadow-sm text-lg italic leading-relaxed font-medium"
            placeholder="আপনার রমজান পরবর্তী ভাবনা ও ভবিষ্যৎ পরিকল্পনা এখানে লিপিবদ্ধ করুন..."
          />
       </div>

       <div className="flex justify-between items-center mt-12 mb-8 no-print gap-4">
          <button onClick={onBack} className="text-gray-800 font-black hover:text-[#1a8a3d] transition-all p-3 text-lg">← পূর্ববর্তী</button>
          <button onClick={() => window.print()} className="bg-blue-600 text-white px-10 py-3 rounded-xl font-black shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105">প্রিন্ট করুন (PDF)</button>
          <button onClick={onNext} className="text-gray-800 font-black hover:text-[#1a8a3d] transition-all p-3 text-lg">পরবর্তী →</button>
       </div>
    </div>
  );
};

export default ReviewPage;
