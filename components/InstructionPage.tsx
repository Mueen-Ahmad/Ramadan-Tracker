
import React from 'react';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const InstructionPage: React.FC<Props> = ({ onNext, onBack }) => {
  const instructions = [
    "রমজানকে ফলপ্রসূ করার জন্য রমজান প্ল্যানার তৈরি করা হয়েছে। এটি কুরআন-সুন্নাহ দ্বারা নির্ধারিত কোনো ফর্মুলা নয়। যে কেউ রমজানকে সার্থক করতে যে কোনোভাবে প্ল্যান করে রমজানের আমল করতে পারেন।",
    "প্ল্যানারটিতে বেশ কয়েকটি অংশ রয়েছে। যথা- দিনের আয়াত, দিনের হাদীস, দিনের দু'আ, দৈনিক চেকলিস্ট। এছাড়াও রয়েছে আল্লাহর গুণবাচক নাম ও প্রতিদিনের কাজ।",
    "প্রতিদিন একটি করে কুরআনের আয়াত, একটি হাদীস ও একটি দিনের দু'আ মুখস্থ করার জন্য দেওয়া হয়েছে। মুখস্থ করতে না পারলে কুরআন-হাদীসের উদ্ধৃতি পাঠ করে ইলম হাসিল ও অন্যের সঙ্গে শেয়ার করতে পারেন। আর অর্থসহ দু'আ পাঠ করে আল্লাহর নিকট প্রার্থনা করুন।",
    "কোন কাজটি কখন করবেন তা আপনার সময়ানুযায়ী ভাগ করে নিন। কখন আয়াত মুখস্থ করবেন, কখন হাদীস মুখস্থ করবেন, কখন দু'আ মুখস্থ করবেন তার জন্য আপনার সুবিধামতো সময় নির্ধারণ করে নিন। মুখস্থ করার পরিকল্পনার অংশ হিসেবে যা মুখস্থ করবেন তা অন্যের সাথে শেয়ার করুন।",
    "সালাত ট্র্যাকারে প্রতিটি বৃত্ত থাকবে। একটি ফরয সালাতের জন্য আর একটি সুন্নাত সালাতের জন্য। "
  ];

  return (
    <div className="p-8 pb-20 bg-white min-h-[800px] flex flex-col">
       <div className="bg-[#1a8a3d] text-white py-4 px-12 rounded-lg self-center mb-8 shadow-lg">
          <h2 className="text-2xl font-bold">রমজান প্ল্যানার নির্দেশিকা</h2>
       </div>

       <div className="space-y-4 flex-1">
          {instructions.map((text, idx) => (
            <div key={idx} className="flex gap-4 items-start">
               <span className="text-[#1a8a3d] text-xl font-bold mt-1">*</span>
               <p className="text-gray-700 leading-relaxed text-lg">{text}</p>
            </div>
          ))}
       </div>

       <div className="flex justify-between mt-12 no-print">
          <button onClick={onBack} className="bg-gray-200 text-gray-700 px-8 py-2 rounded-full font-bold hover:bg-gray-300 transition-colors">পিছনে যান</button>
          <button onClick={onNext} className="bg-[#1a8a3d] text-white px-8 py-2 rounded-full font-bold shadow-md hover:bg-[#157131] transition-colors">পরবর্তী পাতা</button>
       </div>
    </div>
  );
};

export default InstructionPage;
