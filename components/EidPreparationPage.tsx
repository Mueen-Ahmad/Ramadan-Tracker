
import React from 'react';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

const EidPreparationPage: React.FC<Props> = ({ onBack, onNext }) => {
  const tips = [
    "মুসলিমদের বাৎসরিক জাতীয় উৎসব দুইটি। ঈদুল ফিতর ও ঈদুল আযহা।",
    "সুন্নাহসম্মত উপায়ে ঈদ উদযাপন করুন।",
    "ঈদের সালাতের পূর্বেই ফিতরা আদায় করুন।",
    "হাসিখুশি থাকার চেষ্টা করুন।",
    "ঈদের জন্য নতুন জামা-কাপড় কেনা জরুরি নয়।",
    "অপচয় করবেন না।",
    "গরিব আত্মীয়-স্বজন, প্রতিবেশীদের শিশুদেরকে ঈদের পোশাক ও উপহার দিন।",
    "ঈদ উপলক্ষে গান-বাদ্য, অশ্লীলতা, হারাম নাটক, সিনেমা না দেখার প্রতিজ্ঞা করুন।",
    "সুন্নাহসম্মত পদ্ধতিতে ঈদের শুভেচ্ছা বিনিময় করুন। যথা: তাক্বাব্বালাল্লাহু মিন্না ওয়া মিনকুম। অর্থাৎ আল্লাহ আপনার ও আমার (রামাযানে কৃত) সকল ভালো কাজ কবুল করুন।"
  ];

  const sunnahs = [
    "অন্যদিনের তুলনায় সকালে ঘুম থেকে জাগ্রত হওয়া।",
    "মিসওয়াক করা।",
    "গোসল করা।",
    "শরীয়তসম্মত সাজসজ্জা করা।",
    "সামর্থ্য অনুপাতে উত্তম পোশাক পরিধান করা।",
    "সুগন্ধি ব্যবহার করা।",
    "ঈদুল ফিতরে ঈদগাহে যাওয়ার আগে মিষ্টি জাতীয় যেমন খেজুর ইত্যাদি খাওয়া। তবে ঈদুল আযহাতে কিছু না খেয়ে ঈদের সালাতের পর নিজের কুরবানীর গোশত আহার করা উত্তম।",
    "সকাল সকাল ঈদগাহে যাওয়া।",
    "ঈদের সালাত ঈদগাহে আদায় করা, বিনা অপারগতায় মসজিদে আদায় না করা।",
    "যে রাস্তায় ঈদগাহে যাবে, সম্ভব হলে ফেরার সময় অন্য রাস্তা দিয়ে ফেরা।",
    "পায়ে হেঁটে যাওয়া।",
    "ঈদুল ফিতরে ঈদগাহে যাওয়ার সময় নীরবে এই তাকবীর পড়তে থাকা:",
  ];

  return (
    <div className="relative p-6 sm:p-12 pb-32 bg-[#fffdfa] min-h-[900px] overflow-hidden">
      {/* Decorative floral background (simplified CSS representation) */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none rotate-12">🍃</div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-10 pointer-events-none -rotate-12">🌿</div>

      {/* Main Container with Border */}
      <div className="relative border-[1px] border-[#e0c9a6] rounded-sm p-4 h-full min-h-[800px]">
        
        {/* Banner Header */}
        <div className="flex justify-center mb-12 relative mt-4">
           <div className="relative bg-[#d67b5e] text-white px-12 py-3 rounded-md shadow-md z-10">
              <h2 className="text-3xl font-bold tracking-wide">ঈদের প্রস্তুতি</h2>
              {/* Banner flags */}
              <div className="absolute top-1/2 -left-8 -translate-y-1/2 w-10 h-6 bg-[#6a754e] -z-10 [clip-path:polygon(100%_0,0_50%,100%_100%)]"></div>
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-10 h-6 bg-[#6a754e] -z-10 [clip-path:polygon(0_0,100%_50%,0_100%)]"></div>
           </div>
           {/* Top Ornament */}
           <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30">
              <div className="h-[1px] w-12 bg-[#6a754e]"></div>
              <span className="text-xs">✦</span>
              <div className="h-[1px] w-12 bg-[#6a754e]"></div>
           </div>
        </div>

        {/* Tips Section */}
        <div className="mb-10">
           <h3 className="text-2xl font-black text-gray-800 mb-4 border-b-2 border-transparent relative inline-block">টিপস</h3>
           <div className="space-y-2 mt-2">
              {tips.map((tip, idx) => (
                <div key={idx} className="flex gap-2 items-start text-sm sm:text-base font-medium text-gray-700 leading-relaxed">
                   <span className="text-[#1a8a3d] font-bold shrink-0">*</span>
                   <p>{tip}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Sunnahs Section */}
        <div className="mb-8">
           <h3 className="text-2xl font-black text-gray-800 mb-4 inline-block">ঈদের সুন্নাহসমূহ</h3>
           <div className="space-y-2 mt-2">
              {sunnahs.map((sunnah, idx) => (
                <div key={idx} className="flex gap-2 items-start text-sm sm:text-base font-medium text-gray-700 leading-relaxed">
                   <span className="text-[#1a8a3d] font-bold shrink-0">*</span>
                   <p>{sunnah}</p>
                </div>
              ))}
           </div>
           
           {/* Arabic Takbir */}
           <div className="mt-6 text-center bg-white/50 p-4 rounded-xl border border-dashed border-[#e0c9a6]">
              <p className="text-3xl font-arabic font-bold text-gray-900 leading-[2.2]" dir="rtl">
                اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ
              </p>
              <p className="text-sm mt-3 text-gray-600 italic">তবে ঈদুল আযহায় যাওয়ার সময় পথে এ তাকবীর সরবে করে পড়তে থাকবেন।</p>
           </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12 no-print">
          <button onClick={onBack} className="bg-gray-100 text-gray-700 px-8 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors">পিছনে যান</button>
          <button onClick={onNext} className="bg-[#1a8a3d] text-white px-8 py-2 rounded-full font-bold shadow-md hover:bg-[#157131] transition-colors">পরবর্তী পাতা</button>
        </div>
      </div>

      {/* Watermark/Logo like in PDF */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none text-center">
         <h1 className="text-9xl font-black">AS-SUNNAH</h1>
         <p className="text-4xl font-bold tracking-[1em]">FOUNDATION</p>
      </div>
    </div>
  );
};

export default EidPreparationPage;
