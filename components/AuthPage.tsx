
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
    // Basic cleanup: remove spaces and special chars, use as a fake email
    const cleanId = id.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${cleanId}@ramadan.app.local`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const cleanUserId = userId.trim();
    if (cleanUserId.length < 3) {
      setError('আইডি কমপক্ষে ৩ অক্ষরের হতে হবে।');
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
      console.error("Auth Error Code:", err.code);
      
      if (err.code === 'auth/invalid-credential') {
        setError(isLogin 
          ? 'ভুল আইডি অথবা পাসওয়ার্ড। যদি আপনার কোনো আইডি না থাকে তবে নিচে "অ্যাকাউন্ট খুলুন" এ ক্লিক করুন।' 
          : 'এই আইডি বা পাসওয়ার্ডটি ব্যবহার করা সম্ভব হচ্ছে না। অন্য কিছু চেষ্টা করুন।');
      } else if (err.code === 'auth/user-not-found') {
        setError('এই আইডিটি খুঁজে পাওয়া যায়নি। প্রথমে অ্যাকাউন্ট তৈরি করুন।');
      } else if (err.code === 'auth/wrong-password') {
        setError('ভুল পাসওয়ার্ড দিয়েছেন।');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('এই আইডিটি ইতিপূর্বে অন্য কেউ ব্যবহার করেছে। অন্য একটি আইডি ট্রাই করুন।');
      } else if (err.code === 'auth/network-request-failed') {
        setError('ইন্টারনেট সংযোগ নেই। দয়া করে ইন্টারনেট কানেকশন চেক করুন।');
      } else {
        setError(`একটি সমস্যা হয়েছে (${err.code})। আবার চেষ্টা করুন।`);
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
            {isLogin ? 'আপনার আইডিতে প্রবেশ করুন' : 'নতুন আইডি তৈরি করুন'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm font-bold border-2 border-red-100 flex items-start gap-3 animate-pulse">
              <span className="text-xl">⚠️</span>
              <span className="leading-tight">{error}</span>
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest ml-1">আপনার ইউজার আইডি (ID)</label>
            <input 
              type="text" 
              required
              placeholder="যেমন: rakib123"
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
              className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#1a8a3d] focus:bg-white outline-none transition-all font-bold text-xl text-gray-900 placeholder-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1a8a3d] text-white py-5 rounded-3xl font-black text-2xl shadow-[0_15px_30px_rgba(26,138,61,0.3)] hover:shadow-[0_20px_40px_rgba(26,138,61,0.4)] hover:-translate-y-1 transition-all disabled:opacity-50"
          >
            {loading ? 'অপেক্ষা করুন...' : (isLogin ? 'লগইন করুন' : 'অ্যাকাউন্ট তৈরি করুন')}
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
              {isLogin ? 'নতুন আইডি খুলতে চান? অ্যাকাউন্ট তৈরি করুন' : 'আগের আইডি আছে? লগইন করুন'}
            </button>
          </div>
          
          <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
            ডাটা সুরক্ষিত রাখতে এবং অন্য ডিভাইস থেকে দেখতে সিঙ্ক করুন
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
