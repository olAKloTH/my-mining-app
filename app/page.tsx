'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import LuckyBoxModal from './components/shop/LuckyBoxModal';

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      
      {/* Background Layer */}
      <div className="fixed inset-0 -z-50 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[url('/bg-game3.webp')] bg-cover bg-center" />
      </div>

      <div className="fixed inset-0 -z-40 pointer-events-none overflow-hidden">
        {mounted && [...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            initial={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [0, -80] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
            style={{ filter: "blur(0.5px)" }}
          />
        ))}
      </div>

      {/* Main Content (ลด pt และ gap ของส่วนหลักลง 10-15%) */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center pt-16 px-6">
        
        <div className="text-center mb-6">
          <div className="w-48 h-48 md:w-64 md:h-64 relative mx-auto mb-4">
            <Image src="/logocenter.webp" alt="Logo" fill className="object-contain" priority />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-yellow-400 [text-shadow:_3px_3px_0_rgb(0,0,0),_5px_5px_10px_rgba(0,0,0,0.5)]">
              Goal Gold Glow Miner
          </h1>
             <p className="text-white font-bold text-sm tracking-[0.2em] uppercase mt-2 [text-shadow:_1px_1px_0_rgb(0,0,0)]">
              Welcome To Close Beta
             </p>

          <div className="w-full max-w-2xl bg-yellow-400 py-2 rounded-full shadow-md overflow-hidden mt-6">
            <motion.div 
              className="whitespace-nowrap font-black text-slate-950 text-xs uppercase tracking-widest"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              • ยินดีต้อนรับสู่ CBT 3G MINER • ระบบเปิดให้ใช้งานแล้ววันนี้! •
            </motion.div>
          </div>
        </div>

        {/* Legendary Equipment */}
        <section className="w-full max-w-4xl mx-auto my-6 p-6 bg-slate-900/40 backdrop-blur-sm rounded-[1.5rem] border border-yellow-500/10">
          <h2 className="text-yellow-400 font-black text-xl mb-6 uppercase tracking-widest text-center">Legendary Equipment</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Neon Flame", src: "/pickaxe1.png" },
              { name: "Cyber Core", src: "/pickaxe2.png" },
              { name: "Mafia Dark", src: "/pickaxe3.png" },
              { name: "God Legends", src: "/pickaxe4.png" }
            ].map((axe, i) => (
              <div key={i} className="group bg-slate-800/50 p-3 rounded-xl border border-yellow-500/10 hover:border-yellow-500/50 transition-all cursor-pointer">
                <div className="relative w-full aspect-square mb-2">
                  <Image src={axe.src} alt={axe.name} fill className="object-contain group-hover:scale-105 transition-transform" />
                </div>
                <p className="text-white font-bold text-xs text-center">{axe.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {[
            { name: "เข้าสู่ระบบ", path: "/login" },
            { name: "ลงทะเบียน", path: "/register" },
            { name: "ตลาดซื้อ-ขาย", path: "/market" },
            { name: "กระดานผู้นำ", path: "/leaderboard" },
            { name: "กิจกรรม", path: "/events" },
          ].map((item) => (
            <Link key={item.name} href={item.path}>
              <button className="bg-orange-400 hover:bg-orange-500 text-slate-950 font-bold text-sm px-6 py-2.5 rounded-full transition-all shadow-[0_3px_0_rgba(180,83,9,1)] active:shadow-none active:translate-y-0.5">
                {item.name}
              </button>
            </Link>
          ))}
        </div>

        {/* Why Join & Features (ลดขนาดลง) */}
        <section className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-md p-6 rounded-[1.5rem] border border-yellow-500/10 text-center mt-10">
          <h2 className="text-yellow-400 font-black text-lg mb-2 uppercase tracking-widest">Why Alpha Core Miner?</h2>
          <p className="text-slate-200 text-sm leading-relaxed">
            ขุดเจาะความมั่งคั่งในโลกไซเบอร์ที่ทุกการคลิกคือมูลค่าจริง! Goal Gold Glow Miner เปลี่ยนเวลาว่างให้เป็นของรางวัลระดับพรีเมียม
          </p>
        </section>

        <section className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 py-12">
          {[
            { title: "ระบบ KYC", desc: "ยืนยันตัวตนปลอดภัย", src: "/kyc.png" },
            { title: "Price Control", desc: "ป้องกันปั่นราคา", src: "/price.png" },
            { title: "Gold Sink", desc: "ระบบเผาเหรียญ", src: "/gold.png" }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/70 backdrop-blur-md p-6 rounded-[1.5rem] border border-white/5 text-center transition-all hover:border-yellow-500/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/5 rounded-full flex items-center justify-center">
                <Image src={item.src} alt={item.title} width={40} height={40} />
              </div>
              <h2 className="font-black text-lg mb-1 text-white">{item.title}</h2>
              <p className="text-slate-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}