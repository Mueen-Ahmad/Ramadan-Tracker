
import React from 'react';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const DoDontPage: React.FC<Props> = ({ onNext, onBack }) => {
  const dos = [
    "আল্লাহ তা'আলার উপর আস্থা রাখুন।", "সালাত সুন্দর করে ধীরস্থিরভাবে আদায় করুন।", "কুরআন পড়ুন।", "প্রত্যেক ভালো কাজ আল্লাহর নামে আরম্ভ করুন।", 
    "আপনার সম্পদের হিসেবে করে যাকাত প্রদান করুন।", "গোপনে দান করুন।", "নিকট আত্মীয়দের জন্য ব্যয় করুন।", "অভাবীদের জন্য ব্যয় করুন।", 
    "আপনার সিয়ামকে অর্থবহ করুন।", "চোখের পর্দা করুন।", "অন্যকে সৎকর্মের দিকে উৎসাহিত এবং পরিচালিত করুন।"
  ];
  
  const donts = [
    "অযথা বা অর্থহীন কাজ পরিহার করুন।", "টিভি সিরিয়াল, মুভি, নাটক, সিনেমা দেখা পরিহার করুন।", "হারাম উপার্জন বন্ধ করুন।", 
    "ঝগড়া পরিহার করুন।", "মিথ্যা কথা ও কাজ পরিহার করুন।", "যে কোনো পাপকাজ পরিহার করুন।", "কারো ব্যাপারে সন্দেহ বা কুধারণা করবেন না।", 
    "কারো পেছনে সমালোচনা করবেন না।", "কারো প্রতি রূঢ় আচরণ করবেন না।", "কারো প্রতি হিংসা বা শত্রুতা লালন করবেন না।"
  ];

  return (
    <div className="p-8 pb-20 bg-white min-h-[800px]">
       <div className="text-center mb-8">
          <h2 className="text-[#1a8a3d] text-3xl font-bold mb-2">কতিপয় করণীয়-বর্জনীয়</h2>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-2 border-[#1a8a3d] rounded-2xl overflow-hidden shadow-sm">
             <div className="bg-[#1a8a3d] text-white p-4 text-center text-xl font-bold">করণীয়</div>
             <div className="p-6 space-y-3">
                {dos.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-start text-sm font-medium">
                     <span className="text-[#1a8a3d]">*</span>
                     <span>{item}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="border-2 border-red-500 rounded-2xl overflow-hidden shadow-sm">
             <div className="bg-red-500 text-white p-4 text-center text-xl font-bold">বর্জনীয়</div>
             <div className="p-6 space-y-3">
                {donts.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-start text-sm font-medium">
                     <span className="text-red-500">*</span>
                     <span>{item}</span>
                  </div>
                ))}
             </div>
          </div>
       </div>

       <div className="flex justify-between mt-12 no-print">
          <button onClick={onBack} className="bg-gray-200 text-gray-700 px-8 py-2 rounded-full font-bold hover:bg-gray-300 transition-colors">পিছনে যান</button>
          <button onClick={onNext} className="bg-[#1a8a3d] text-white px-8 py-2 rounded-full font-bold hover:bg-[#157131] transition-colors shadow-md">শুরু করি</button>
       </div>
    </div>
  );
};

export default DoDontPage;
