
import React from 'react';
import { DailyData, QuranTracker, SalahTracker } from '../types';
import { DAILY_CONTENT, CHECKLIST_ITEMS, SALAH_KEYS } from '../constants';

interface Props {
  day: number;
  data: DailyData;
  onUpdate: (data: Partial<DailyData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DailyPage: React.FC<Props> = ({ day, data, onUpdate, onNext, onBack }) => {
  const content = DAILY_CONTENT[day] || DAILY_CONTENT[1];

  const toggleChecklist = (index: number) => {
    const newList = [...data.checklist];
    newList[index] = !newList[index];
    onUpdate({ checklist: newList });
  };

  const toggleSalah = (key: keyof SalahTracker, isSunnat = false) => {
    if (isSunnat && key in data.salah.sunnat) {
      const newSunnat = { ...data.salah.sunnat, [key]: !data.salah.sunnat[key as keyof SalahTracker['sunnat']] };
      onUpdate({ salah: { ...data.salah, sunnat: newSunnat } });
    } else {
      onUpdate({ salah: { ...data.salah, [key]: !data.salah[key] } });
    }
  };

  const updateQuran = (field: keyof QuranTracker, val: string) => {
    onUpdate({ quran: { ...data.quran, [field]: val } });
  };

  return (
    <div className="p-4 sm:p-6 bg-[#fdfdfd] min-h-screen border-t-8 border-[#1a8a3d] text-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-gray-800 font-bold hover:text-[#1a8a3d] transition-colors p-2">← পূর্ববর্তী</button>
        <div className="bg-[#1a8a3d] text-white px-8 py-2 rounded-full font-bold text-xl shadow-md border-2 border-[#157131]">
          {day} রমজান
        </div>
        <button onClick={onNext} className="text-gray-800 font-bold hover:text-[#1a8a3d] transition-colors p-2">পরবর্তী →</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Ayat & Achievement */}
        <div className="space-y-6">
          <div className="bg-[#eefcf2] p-5 rounded-2xl border-2 border-[#c6e9d2] shadow-sm">
            <h3 className="text-[#1a8a3d] font-black border-b-2 border-[#1a8a3d] mb-4 inline-block text-lg">দিনের আয়াত</h3>
            <p className="text-3xl font-arabic text-right mb-4 leading-relaxed text-black" dir="rtl">{content.ayatAr}</p>
            <p className="text-xl font-medium mb-1 text-gray-900 leading-snug">{content.ayatBn}</p>
            <p className="text-sm text-gray-600 italic font-bold">{content.ayatRef}</p>
          </div>

          <div className="bg-[#fffdf2] p-5 rounded-2xl border-2 border-[#f3e3a9] shadow-sm">
            <h3 className="text-[#856404] font-black border-b-2 border-[#856404] mb-4 inline-block text-lg">আজকের বিশেষ অর্জন</h3>
            <textarea 
              value={data.achievement}
              onChange={(e) => onUpdate({ achievement: e.target.value })}
              placeholder="এমন একটা বিশেষ কাজের কথা লিখুন যা করতে পেরে আপনি পরিতৃপ্ত..."
              className="w-full h-28 bg-white border border-gray-200 rounded-lg focus:ring-[#1a8a3d] focus:border-[#1a8a3d] p-3 text-base italic text-gray-800 placeholder-gray-400 font-medium"
            />
          </div>
        </div>

        {/* Right Column: Hadith & Dua */}
        <div className="space-y-6">
          <div className="bg-[#eefcf2] p-5 rounded-2xl border-2 border-[#c6e9d2] shadow-sm">
            <h3 className="text-[#1a8a3d] font-black border-b-2 border-[#1a8a3d] mb-4 inline-block text-lg">দিনের হাদীস</h3>
            <p className="text-xl font-medium mb-1 text-gray-900 leading-snug">{content.hadithBn}</p>
            <p className="text-sm text-gray-600 italic font-bold">{content.hadithRef}</p>
          </div>

          <div className="bg-[#fffafa] p-5 rounded-2xl border-2 border-[#fed7d7] shadow-sm">
            <h3 className="text-[#c53030] font-black border-b-2 border-[#c53030] mb-4 inline-block text-lg">দিনের দু'আ</h3>
            <p className="text-3xl font-arabic text-right mb-4 leading-relaxed text-black" dir="rtl">{content.duaAr}</p>
            <p className="text-xl font-medium mb-1 text-gray-900 leading-snug">{content.duaBn}</p>
            <p className="text-sm text-gray-600 italic font-bold">{content.duaRef}</p>
          </div>
        </div>
      </div>

      {/* Middle Interactive Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {/* Salah Tracker */}
        <div className="border-2 border-gray-200 rounded-2xl p-5 bg-white shadow-md">
          <h4 className="font-black flex items-center gap-3 mb-6 text-[#1a8a3d] text-lg uppercase">
            <span className="p-2 bg-[#1a8a3d] text-white rounded-lg text-sm shadow-sm">📖</span> সালাত ট্র্যাকার
          </h4>
          <div className="space-y-3">
            <div className="grid grid-cols-3 text-xs text-gray-600 font-black mb-2 uppercase tracking-wider">
              <span>সালাত</span>
              <span className="text-center">ফরয</span>
              <span className="text-center">সুন্নাত</span>
            </div>
            {SALAH_KEYS.map(key => (
              <div key={key} className="grid grid-cols-3 items-center py-2 border-b-2 border-gray-50 last:border-0">
                <span className="text-base font-bold text-gray-800">{key === 'fajr' ? 'ফজর' : key === 'dhuhr' ? 'যুহর' : key === 'asr' ? 'আসর' : key === 'maghrib' ? 'মাগরিব' : key === 'isha' ? 'ইশা' : key === 'tarawih' ? 'তারাবীহ' : 'দুহা'}</span>
                <div className="flex justify-center">
                  <input 
                    type="checkbox" 
                    checked={data.salah[key]} 
                    onChange={() => toggleSalah(key)}
                    className="w-6 h-6 rounded border-2 border-gray-400 text-[#1a8a3d] bg-white focus:ring-[#1a8a3d] cursor-pointer"
                  />
                </div>
                <div className="flex justify-center">
                  {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].includes(key) && (
                    <input 
                      type="checkbox" 
                      checked={data.salah.sunnat[key as keyof SalahTracker['sunnat']]} 
                      onChange={() => toggleSalah(key as keyof SalahTracker['sunnat'], true)}
                      className="w-6 h-6 rounded-full border-2 border-gray-400 text-[#1a8a3d] bg-white focus:ring-[#1a8a3d] cursor-pointer"
                    />
                  )}
                </div>
              </div>
            ))}
            <div className="grid grid-cols-3 items-center py-2 border-t-2 border-gray-50">
               <span className="text-sm font-bold text-gray-800 leading-tight">দুহুলুল মাসজিদ/ তাহিয়্যাতুল ওযু</span>
               <div className="flex justify-center">
                  <input 
                    type="checkbox" 
                    checked={data.salah.tahiyatulWudu} 
                    onChange={() => onUpdate({ salah: { ...data.salah, tahiyatulWudu: !data.salah.tahiyatulWudu } })}
                    className="w-6 h-6 rounded border-2 border-gray-400 text-[#1a8a3d] bg-white focus:ring-[#1a8a3d] cursor-pointer"
                  />
                </div>
                <div className="flex justify-center"></div>
            </div>
          </div>
        </div>

        {/* Quran Tracker */}
        <div className="border-2 border-gray-200 rounded-2xl p-5 bg-white shadow-md flex flex-col items-center">
          <h4 className="font-black flex items-center gap-3 mb-6 text-[#1a8a3d] w-full text-lg uppercase">
            <span className="p-2 bg-[#1a8a3d] text-white rounded-lg text-sm shadow-sm">📔</span> কুরআন ট্র্যাকার
          </h4>
          <div className="w-28 h-36 bg-gray-50 border-4 border-[#1a8a3d] rounded-xl relative mb-8 shadow-inner flex items-center justify-center">
             <span className="text-5xl">📖</span>
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex-1">
              <label className="text-xs text-gray-700 block text-center font-black mb-1">আয়াত</label>
              <input value={data.quran.ayat} onChange={e => updateQuran('ayat', e.target.value)} className="w-full border-b-2 border-gray-300 text-center focus:outline-none focus:border-[#1a8a3d] font-bold text-lg p-1 bg-white text-gray-900" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-700 block text-center font-black mb-1">পৃষ্ঠা</label>
              <input value={data.quran.page} onChange={e => updateQuran('page', e.target.value)} className="w-full border-b-2 border-gray-300 text-center focus:outline-none focus:border-[#1a8a3d] font-bold text-lg p-1 bg-white text-gray-900" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-700 block text-center font-black mb-1">পারা</label>
              <input value={data.quran.para} onChange={e => updateQuran('para', e.target.value)} className="w-full border-b-2 border-gray-300 text-center focus:outline-none focus:border-[#1a8a3d] font-bold text-lg p-1 bg-white text-gray-900" />
            </div>
          </div>
          
          <div className="mt-10 bg-[#f5fbf6] p-5 rounded-2xl border-2 border-[#c6e9d2] w-full shadow-sm">
            <h3 className="text-[#1a8a3d] font-black text-center mb-3 text-base">দিনের কাজ</h3>
            <div className="bg-white p-4 rounded-xl border-2 border-[#c6e9d2] text-base font-bold text-gray-800 text-center min-h-[70px] flex items-center justify-center leading-snug">
              {content.dailyTask}
            </div>
          </div>
        </div>

        {/* Daily Checklist */}
        <div className="border-2 border-gray-200 rounded-2xl p-5 bg-white shadow-md">
          <h4 className="font-black flex items-center gap-3 mb-6 text-[#1a8a3d] text-lg uppercase">
            <span className="p-2 bg-[#1a8a3d] text-white rounded-lg text-sm shadow-sm">✅</span> দৈনিক চেকলিস্ট
          </h4>
          <div className="space-y-3">
            {CHECKLIST_ITEMS.map((item, idx) => (
              <label key={idx} className="flex items-center gap-4 cursor-pointer group py-1">
                <input 
                  type="checkbox" 
                  checked={data.checklist[idx]} 
                  onChange={() => toggleChecklist(idx)}
                  className="w-5 h-5 rounded border-2 border-gray-400 text-[#1a8a3d] bg-white focus:ring-[#1a8a3d] cursor-pointer"
                />
                <span className={`text-base font-bold leading-snug ${data.checklist[idx] ? 'text-gray-400 line-through' : 'text-gray-900'} group-hover:text-[#1a8a3d] transition-colors`}>
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer: Allah Names */}
      <div className="mt-16 border-t-2 border-gray-100 pt-10 pb-6">
        <h4 className="text-center font-black text-[#1a8a3d] mb-8 text-2xl uppercase tracking-widest">আল্লাহর নাম</h4>
        <div className="flex flex-wrap justify-center gap-6">
          {content.allahNames.map((n, i) => (
            <div key={i} className="bg-white border-2 border-[#1a8a3d] rounded-3xl p-5 min-w-[140px] text-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
               <div className="text-3xl font-arabic text-[#1a8a3d] mb-2 font-black" dir="rtl">{n.nameAr}</div>
               <div className="font-black text-gray-900 text-lg mb-1">{n.nameBn}</div>
               <div className="text-xs text-gray-600 leading-tight font-bold mt-2 border-t pt-2 border-gray-50">{n.meaningBn}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyPage;
