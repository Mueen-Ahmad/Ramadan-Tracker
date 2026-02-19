
import React, { useState, useEffect, useCallback } from 'react';
import { AppState, DailyData } from './types';
import { CHECKLIST_ITEMS } from './constants';
import CoverPage from './components/CoverPage';
import InstructionPage from './components/InstructionPage';
import DoDontPage from './components/DoDontPage';
import DailyPage from './components/DailyPage';
import ReviewPage from './components/ReviewPage';
import EidPreparationPage from './components/EidPreparationPage';
import FooterInfoPage from './components/FooterInfoPage';

const INITIAL_DAILY_DATA: DailyData = {
  achievement: '',
  salah: {
    fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false, tarawih: false, duha: false, tahiyatulWudu: false,
    sunnat: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false }
  },
  quran: { ayat: '', page: '', para: '' },
  checklist: new Array(CHECKLIST_ITEMS.length).fill(false)
};

const STORAGE_KEY = 'ramadan_planner_data_v2'; // Bumped version for schema change

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('cover');
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    
    const initialDaily: Record<number, DailyData> = {};
    for (let i = 1; i <= 30; i++) initialDaily[i] = JSON.parse(JSON.stringify(INITIAL_DAILY_DATA));
    
    return {
      userName: '',
      dailyData: initialDaily,
      achievements: new Array(15).fill(''),
      disappointments: new Array(15).fill(''),
      reflections: ''
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateDaily = useCallback((day: number, data: Partial<DailyData>) => {
    setState(prev => ({
      ...prev,
      dailyData: {
        ...prev.dailyData,
        [day]: { ...prev.dailyData[day], ...data }
      }
    }));
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'cover': return <CoverPage onStart={() => setCurrentPage('intro')} name={state.userName} setName={(n) => setState(s => ({...s, userName: n}))} />;
      case 'intro': return <InstructionPage onNext={() => setCurrentPage('dodont')} onBack={() => setCurrentPage('cover')} />;
      case 'dodont': return <DoDontPage onNext={() => setCurrentPage('day-1')} onBack={() => setCurrentPage('intro')} />;
      case 'review': return <ReviewPage state={state} setState={setState} onBack={() => setCurrentPage('day-30')} onNext={() => setCurrentPage('eid-prep')} />;
      case 'eid-prep': return <EidPreparationPage onBack={() => setCurrentPage('review')} onNext={() => setCurrentPage('info')} />;
      case 'info': return <FooterInfoPage onBack={() => setCurrentPage('eid-prep')} />;
      default:
        if (currentPage.startsWith('day-')) {
          const day = parseInt(currentPage.split('-')[1]);
          return (
            <DailyPage 
              day={day} 
              data={state.dailyData[day]} 
              onUpdate={(d) => updateDaily(day, d)}
              onNext={() => day < 30 ? setCurrentPage(`day-${day + 1}`) : setCurrentPage('review')}
              onBack={() => day > 1 ? setCurrentPage(`day-${day - 1}`) : setCurrentPage('dodont')}
            />
          );
        }
        return <CoverPage onStart={() => setCurrentPage('intro')} name={state.userName} setName={(n) => setState(s => ({...s, userName: n}))} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f3f4f6] p-2 sm:p-4 pb-24 text-gray-900">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200">
        {renderPage()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-3 flex justify-around items-center no-print z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setCurrentPage('cover')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${currentPage === 'cover' ? 'bg-[#1a8a3d] text-white shadow-md' : 'text-gray-800 hover:bg-gray-100'}`}
        >
          হোম
        </button>
        <div className="flex items-center gap-3 overflow-x-auto max-w-[60vw] px-2 py-1 scrollbar-hide">
          {[1, 5, 10, 15, 20, 25, 30].map(d => (
            <button
              key={d}
              onClick={() => setCurrentPage(`day-${d}`)}
              className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all ${currentPage === `day-${d}` ? 'bg-[#1a8a3d] text-white shadow-md' : 'text-gray-800 hover:bg-gray-100'}`}
            >
              দিন {d}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setCurrentPage('review')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${['review', 'eid-prep'].includes(currentPage) ? 'bg-[#1a8a3d] text-white shadow-md' : 'text-gray-800 hover:bg-gray-100'}`}
        >
          রিভিউ
        </button>
      </div>
    </div>
  );
};

export default App;
