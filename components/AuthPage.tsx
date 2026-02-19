
import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase';

interface Props {
  onSuccess: () => void;
}

const AuthPage: React.FC<Props> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getInternalId = (id: string) => {
    // Cleanup ID and format as a fake email for Firebase Auth
    const cleanId = id.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${cleanId}@ramadan.app.local`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const cleanUserId = userId.trim();
    if (cleanUserId.length < 3) {
      setError('ইউজার আইডি কমপক্ষে ৩ অক্ষরের হতে হবে।');
      return;
    }

    if (password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
      return;
    }

    setLoading(true);

    try {
      const internalEmail = getInternalId(cleanUserId);
      if (isLogin) {
        await signInWithEmailAndPassword(auth, internalEmail, password);
      } else {
        await createUserWithEmailAndPassword(auth, internalEmail, password);
      }
      onSuccess();
    } catch (err: any) {
      console.error("Firebase Auth Error:", err.code, err.message);
      
      if (err.code === 'auth/invalid-credential') {
        setError(isLogin 
          ? 'ভুল আইডি অথবা পাসওয়ার্ড। আপনি কি আগে অ্যাকাউন্ট খুলেছেন? না খুললে নিচে "অ্যাকাউন্ট তৈরি করুন" বাটনে ক্লিক করুন।' 
          : 'এই আইডিটি বর্তমানে ব্যবহার করা যাচ্ছে না। অন্য কোনো আইডি ট্রাই করুন।');
      } else if (err.code === 'auth/user-not-found') {
        setError('এই আইডিটি দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি। প্রথমে "অ্যাকাউন্ট তৈরি করুন" এ গিয়ে আইডি তৈরি করুন।');
      } else if (err.code === 'auth/wrong-password') {
        setError('পাসওয়ার্ডটি সঠিক নয়। আবার চেষ্টা করুন।');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('এই আইডিটি অন্য কেউ ইতিমধ্যে ব্যবহার করছে। নতুন কোনো আইডি বেছে নিন।');
      } else if (err.code === 'auth/network-request-failed') {
        setError('ইন্টারনেট সংযোগে সমস্যা হচ্ছে। আপনার ডাটা কানেকশন চেক করুন।');
      } else if (err.code === 'auth/too-many-requests') {
        setError('অতিরিক্ত চেষ্টার কারণে আপনার অ্যাকাউন্ট সাময়িকভাবে ব্লক করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।');
      } else {
        setError(`একটি ত্রুটি হয়েছে (${err.code})। দয়া করে আবার চেষ্টা করুন।`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdf8f4] p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-[#1a8a3d] p-10 text-center text-white relative">
          <div className="absolute top-4 right-6 text-2xl opacity-20">🌙</div>
          <h1 className="text-4xl font-black mb-2">রমজান ট্র্যাকার</h1>
          <p className="text-lg opacity-80 font-medium">
            {isLogin ? 'আপনার অ্যাকাউন্টে লগইন করুন' : 'নতুন আইডি তৈরি করুন'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-8">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm font-bold border-2 border-red-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <span className="text-xl shrink-0">⚠️</span>
              <span className="leading-tight">{error}</span>
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest ml-1">আপনার ইউজার আইডি (ID)</label>
            <input 
              type="text" 
              required
              placeholder="যেমন: rakib123"
              autoComplete="username"
              className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#1a8a3d] focus:bg-white outline-none transition-all font-bold text-xl text-gray-900 placeholder-gray-300"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest ml-1">গোপন পাসওয়ার্ড</label>
            <input 
              type="password" 
              required
              placeholder="কমপক্ষে ৬টি ক্যারেক্টার"
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#1a8a3d] focus:bg-white outline-none transition-all font-bold text-xl text-gray-900 placeholder-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1a8a3d] text-white py-5 rounded-3xl font-black text-2xl shadow-[0_15px_30px_rgba(26,138,61,0.3)] hover:shadow-[0_20px_40px_rgba(26,138,61,0.4)] hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:translate-y-0"
          >
            {loading ? 'প্রসেসিং হচ্ছে...' : (isLogin ? 'লগইন করুন' : 'অ্যাকাউন্ট তৈরি করুন')}
          </button>

          <div className="text-center pt-2">
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-[#1a8a3d] font-black text-lg hover:underline transition-all"
            >
              {isLogin ? 'নতুন আইডি খুলতে চান? এখানে ক্লিক করুন' : 'আগের আইডি আছে? লগইন করুন'}
            </button>
          </div>
          
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
             <p className="text-[10px] text-center text-blue-800 font-bold uppercase tracking-wider leading-relaxed">
              অনলাইনে ডাটা সেভ রাখলে আপনি যেকোনো ডিভাইস থেকে আপনার রমজান প্ল্যানার অ্যাক্সেস করতে পারবেন।
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
