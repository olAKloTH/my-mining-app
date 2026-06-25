"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Logic ที่พี่ต้องการเชื่อม Supabase
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("เข้าสู่ระบบไม่สำเร็จ: " + error.message);
    } else {
      window.location.href = '/';
    }
    setIsLoading(false);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950 p-4 overflow-hidden">
      {/* 1. Background & Gold Sparkles */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/bg-game3.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/70" />
        
        {mounted && [...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            initial={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [0, -50] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
            style={{ filter: "blur(0.5px) drop-shadow(0 0 5px #eab308)" }}
          />
        ))}
      </div>

      {/* 2. Login Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative p-[2px] rounded-[2.5rem] overflow-hidden z-10 shadow-[0_0_50px_rgba(234,179,8,0.2)]"
      >
        <div 
          className="absolute inset-[-100%] z-0"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, transparent 150deg, #eab308 180deg, transparent 210deg, transparent 360deg)",
            animation: "spin 4s linear infinite" 
          }}
        />
        <div className="relative w-full max-w-md bg-slate-900/95 backdrop-blur-3xl p-8 rounded-[2.45rem] z-10 border border-white/5">
          
          <Link href="/" className="absolute top-6 right-6 text-slate-500 hover:text-yellow-500 transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </Link>

          <div className="text-center mb-8">
            <div className="w-40 h-40 mx-auto relative mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
              <Image src="/logom.png" alt="Logo" width={240} height={240} className="object-contain w-full h-full" />
            </div>
            <h2 className="text-3xl font-black text-yellow-500 uppercase tracking-tighter">Gold Miner Portal</h2>
            <p className="text-slate-400 mt-2 text-sm font-medium">ยืนยันตัวตนเพื่อเข้าถึงขุมทรัพย์</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && <p className="text-red-500 text-xs text-center">{errorMsg}</p>}
            <div>
              <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">Email Address</label>
              <input type="email" required onChange={(e) => setEmail(e.target.value)} className="w-full mt-1.5 p-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white focus:border-yellow-500/50 outline-none transition-all" placeholder="miner@goldglow.com" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">Password</label>
              <input type="password" required onChange={(e) => setPassword(e.target.value)} className="w-full mt-1.5 p-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white focus:border-yellow-500/50 outline-none transition-all" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 text-slate-950 font-black py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest text-sm">
              {isLoading ? "กำลังเชื่อมต่อเหมือง..." : "เข้าสู่ระบบเดี๋ยวนี้"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            {/* แก้ไขตรงนี้ให้ตรงกับโฟลเดอร์ register ของพี่ครับ */}
            <Link href="/register" className="group text-sm font-bold text-slate-400 hover:text-yellow-500 transition-colors">
              ยังไม่มีบัญชีขุดทอง? <span className="text-yellow-500">ลงทะเบียนที่นี่</span>
            </Link>
          </div>

          <Link href="/" className="mt-8 relative group w-full flex items-center justify-center gap-3 py-5 rounded-2xl border border-yellow-500/30 bg-slate-950/40 hover:bg-yellow-500/10 hover:border-yellow-500 transition-all duration-300">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 group-hover:-translate-x-1 transition-transform">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span className="font-black text-sm uppercase tracking-[0.2em] text-yellow-500">กลับสู่หน้าหลัก</span>
          </Link>
        </div>
      </motion.div>

      <footer className="mt-8 z-10 text-slate-600 text-xs font-medium uppercase tracking-widest">
        © 2026 Gold Miner Portal. All rights reserved.
      </footer>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}