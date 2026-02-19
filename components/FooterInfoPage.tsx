
import React from 'react';

interface Props {
  onBack: () => void;
}

const FooterInfoPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="p-8 bg-white min-h-[800px] text-gray-900 flex flex-col justify-center items-center relative">
       {/* Developer Info Section */}
       <div className="text-center space-y-8">
          <div className="inline-block text-left bg-[#f8faf9] p-8 rounded-2xl border-2 border-[#1a8a3d]/10 shadow-lg">
             <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-100 pb-2">Application Development & Maintenance</p>
             <p className="text-3xl font-black text-[#1a8a3d]">Softquark Tech</p>
             <p className="text-lg font-bold text-gray-700 mt-2">Supervised by: <span className="text-[#1a8a3d]">Mueen Ahmad</span></p>
          </div>
       </div>

       {/* Navigation */}
       <div className="absolute bottom-12 left-0 right-0 flex justify-center no-print">
          <button 
            onClick={onBack} 
            className="bg-gray-100 text-gray-800 px-12 py-3 rounded-full font-black hover:bg-gray-200 transition-all shadow-sm border border-gray-200"
          >
            পিছনে যান
          </button>
       </div>
    </div>
  );
};

export default FooterInfoPage;
