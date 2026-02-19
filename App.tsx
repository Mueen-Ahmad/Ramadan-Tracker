
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
import AuthPage from './components/AuthPage';
import InstallButton from './components/InstallButton';

import { auth, db, onAuthStateChanged, signOut, doc, getDoc, setDoc } from './firebase';

const STORAGE_KEY = 'ramadan_planner_data_v1';

const INITIAL_DAILY_DATA: DailyData = {
  achievement: '',
  salah: {
    fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false, tarawih: false, duha: false, tahiyatulWudu: false,
    sunnat: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false }
  },
  quran: { ayat: '', page: '', para: '' },
  checklist: new Array(CHECKLIST_ITEMS.length).fill(false)
};

const getInitialState = (): AppState => {
  const initialDaily: Record<number, DailyData> = {};
  for (let i = 1; i <= 30; i++) initialDaily[i] = JSON.parse(JSON.stringify(INITIAL_DAILY_DATA));
  return {
    userName: '',
    dailyData: initialDaily,
    achievements: new Array(15).fill(''),
    disappointments: new Array(15).fill(''),
    reflections: ''
  };
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('cover');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [state, setState] = useState<AppState>(getInitialState());

  // 1. Load from LocalStorage on mount (Offline First)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Local storage parse error", e);
      }
    }
  }, []);

  // 2. Handle Auth State and Cloud Data Fetch
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Firebase Auth Status:", currentUser ? "Logged In" : "Logged Out");
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const cloudData = userDoc.data() as AppState;
            // Merge cloud data with local if needed, here we prioritize cloud for logged in users
            setState(cloudData);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
          }
        } catch (err) {
          console.error("Cloud data fetch error:", err);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 3. Save to LocalStorage (Always) and Firestore (Only if Logged In)
  useEffect(() => {
    // Local persistence (Offline) - Always happens
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    // Online Sync - Only if user is logged in
    if (user) {
      setIsSyncing(true);
      const timeoutId = setTimeout(async () => {
        try {
          // Double check user still exists before sending
          if (auth.currentUser) {
            await setDoc(doc(db, "users", auth.currentUser.uid), state);
            setIsSyncing(false);
            console.log("Cloud sync successful");
          }
        } catch (err) {
          console.error("Cloud sync error:", err);
          setIsSyncing(false);
        }
      }, 3000); // 3 second debounce to reduce writes
      return () => clearTimeout(timeoutId);
    } else {
      setIsSyncing(false);
    }
  }, [state, user]);

  const handleLogout = async () => {
    const confirmed = window.confirm('আপনি কি লগআউট করতে চান? লগআউট করলে অনলাইন সিঙ্ক বন্ধ হয়ে যাবে, তবে আপনার সকল তথ্য এই ফোনে/ব্রাউজারে সুরক্ষিত থাকবে।');
    if (confirmed) {
      try {
        setIsSyncing(false);
        await signOut(auth);
        setUser(null); // Explicitly clear local user state
        alert("সফলভাবে লগআউট করা হয়েছে। এখন আপনি অফলাইন মুডে আছেন।");
      } catch (err) {
        console.error("Logout error:", err);
        alert("লগআউট করতে সমস্যা হয়েছে। পেজটি রিফ্রেশ করে আবার চেষ্টা করুন।");
      }
    }
  };

  const updateDaily = useCallback((day: number, data: Partial<DailyData>) => {
    setState(prev => ({
      ...prev,
      dailyData: {
        ...prev.dailyData,
        [day]: { ...prev.dailyData[day], ...data }
      }
    }));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf8f4]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-[#1a8a3d] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#1a8a3d] font-black text-xl">রমজান প্ল্যানার লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (showAuth) {
    return (
      <div className="relative">
        <button 
          onClick={() => setShowAuth(false)}
          className="fixed top-6 right-6 z-[60] bg-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-2xl font-bold border border-gray-100 hover:bg-gray-50 transition-all"
        >
          ✕
        </button>
        <AuthPage onSuccess={() => setShowAuth(false)} />
      </div>
    );
  }

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
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-2 sm:p-4 pb-24 text-gray-900 font-sans">
      {/* Dynamic Status Bar */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-4 px-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-200 no-print">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${user ? (isSyncing ? 'bg-orange-500 animate-pulse' : 'bg-green-500') : 'bg-gray-400'}`}></div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-gray-700 leading-none mb-1">
              {user ? (isSyncing ? 'ক্লাউডে সেভ হচ্ছে...' : 'অনলাইনে সিঙ্কড') : 'অফলাইন মুড (সেভ হচ্ছে)'}
            </span>
            <InstallButton />
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden md:inline text-xs font-bold text-[#1a8a3d] bg-green-50 px-2 py-1 rounded-md">ID: {user.email?.split('@')[0]}</span>
              <button 
                onClick={handleLogout}
                className="text-xs sm:text-sm font-black text-red-600 bg-red-50 px-3 sm:px-4 py-2 rounded-xl border-2 border-red-100 hover:bg-red-100 transition-all active:scale-95"
              >
                লগআউট
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuth(true)}
              className="text-xs sm:text-sm font-black text-white bg-[#1a8a3d] px-4 sm:px-6 py-2.5 rounded-xl shadow-lg shadow-[#1a8a3d]/20 hover:bg-[#157131] transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="text-lg">☁️</span> সিঙ্ক করুন
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
        {renderPage()}
      </div>

      {/* Navigation Tabs */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 flex justify-around items-center no-print z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <button 
          onClick={() => setCurrentPage('cover')}
          className={`px-3 sm:px-5 py-2.5 rounded-xl font-black text-xs sm:text-base transition-all ${currentPage === 'cover' ? 'bg-[#1a8a3d] text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          হোম
        </button>
        <div className="flex items-center gap-2 overflow-x-auto max-w-[50vw] px-2 py-1 scrollbar-hide">
          {[1, 5, 10, 15, 20, 25, 30].map(d => (
            <button
              key={d}
              onClick={() => setCurrentPage(`day-${d}`)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-black text-xs sm:text-base whitespace-nowrap transition-all ${currentPage === `day-${d}` ? 'bg-[#1a8a3d] text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              দিন {d}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setCurrentPage('review')}
          className={`px-3 sm:px-5 py-2.5 rounded-xl font-black text-xs sm:text-base transition-all ${['review', 'eid-prep'].includes(currentPage) ? 'bg-[#1a8a3d] text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          রিভিউ
        </button>
      </div>
    </div>
  );
};

export default App;
