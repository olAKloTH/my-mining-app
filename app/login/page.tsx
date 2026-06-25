'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient'; // 1. นำเข้า supabase จากไฟล์ที่สร้างไว้

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // 2. เพิ่ม state เก็บข้อมูลฟอร์ม
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => setMounted(true), []);

  // 3. ฟังก์ชัน Login จริง
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message); // โชว์ Error ถ้าล็อกอินไม่ได้
    } else {
      window.location.href = '/'; // ล็อกอินสำเร็จ กลับหน้าหลัก
    }
    setIsLoading(false);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950 p-4 overflow-hidden">
      {/* ... (ส่วน Background คงเดิม) ... */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/bg-game3.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative p-[2px] rounded-[2.5rem] overflow-hidden z-10 shadow-[0_0_50px_rgba(234,179,8,0.2)]"
      >
        <div className="absolute inset-[-100%] z-0" style={{ background: "conic-gradient(from 0deg, transparent 0deg, transparent 150deg, #eab308 180deg, transparent 210deg, transparent 360deg)", animation: "spin 4s linear infinite" }} />
        <div className="relative w-full max-w-md bg-slate-900/95 backdrop-blur-3xl p-8 rounded-[2.45rem] z-10 border border-white/5">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-yellow-500 uppercase tracking-tighter">Gold Miner Portal</h2>
            <p className="text-slate-400 mt-2 text-sm font-medium">ยืนยันตัวตนเพื่อเข้าถึงขุมทรัพย์</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* โชว์ Error ถ้ามี */}
            {errorMsg && <p className="text-red-500 text-xs text-center">{errorMsg}</p>}
            
            <div>
              <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1.5 p-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white focus:border-yellow-500/50 outline-none transition-all" 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1.5 p-4 rounded-2xl bg-slate-950/50 border border-white/10 text-white focus:border-yellow-500/50 outline-none transition-all" 
              />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 text-slate-950 font-black py-4 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest text-sm">
              {isLoading ? "กำลังเชื่อมต่อเหมือง..." : "เข้าสู่ระบบเดี๋ยวนี้"}
            </button>
          </form>

          {/* ... (ส่วน ลิงก์ Register และ Footer คงเดิม) ... */}
        </div>
      </motion.div>
    </main>
  );
}