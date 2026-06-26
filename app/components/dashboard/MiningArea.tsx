'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DiggingCanvas from "../../mining/DiggingCanvas";

interface MiningAreaProps {
  onCollect: () => void;
  isCollecting: boolean;
  storagePercentage: number;
  output: number;
  onDig?: () => void;
}

export default function MiningArea({ 
  onCollect, 
  isCollecting, 
  storagePercentage, 
  output,
  onDig 
}: MiningAreaProps) {
  
  const [equipmentSlots, setEquipmentSlots] = useState([50, 0, 0, 0, 0]); 
  const [buffSlots, setBuffSlots] = useState([0, 0, 0]);
  const [bgImage, setBgImage] = useState("mine-bg1.webp");
  const [activeRate, setActiveRate] = useState('Live');
  const [timeUntilFull, setTimeUntilFull] = useState(11175);
  const [coreEnergy, setCoreEnergy] = useState(64800); 

  useEffect(() => {
    const backgrounds = ["mine-bg1.webp", "mine-bg2.webp", "mine-bg3.webp", "mine-bg4.webp", "mine-bg5.webp"];
    const bgInterval = setInterval(() => {
      setBgImage(prev => backgrounds[(backgrounds.indexOf(prev) + 1) % backgrounds.length]);
    }, 60000); 
    const timerInterval = setInterval(() => {
      setTimeUntilFull((prev) => (prev > 0 ? prev - 1 : 0));
      setCoreEnergy((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => { clearInterval(bgInterval); clearInterval(timerInterval); };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5">
      {/* 1. ส่วนรูปเหมือง */}
      <div className="relative w-full h-64 overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div key={bgImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0.05 }} transition={{ duration: 3.5 }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/${bgImage}')` }} />
        </AnimatePresence>
        
        <DiggingCanvas onDig={onDig} />

        {/* แบตเตอรี่ 5 เซลล์ (มุมซ้ายล่าง) */}
        <div className="absolute bottom-4 left-4 z-30 flex items-center gap-3 bg-black/60 border border-white/10 p-2.5 rounded-xl backdrop-blur-md shadow-2xl">
          <div className="w-10 h-7 border-2 border-stone-400 rounded-md p-[2px] relative flex items-center gap-[2px]">
            <div className="absolute -right-1.5 top-1.5 h-3 w-1 bg-stone-400 rounded-r-sm" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-full w-full rounded-[1px] transition-colors duration-300 ${(coreEnergy / 115200) * 5 > i ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.7)]' : 'bg-stone-800'}`} />
            ))}
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-white/50 font-bold uppercase tracking-widest">Energy</span>
            <span className="text-xs font-black text-white font-mono tracking-tight">{formatTime(coreEnergy)}</span>
          </div>
        </div>

        {/* มุมขวาล่าง: EQUIPMENT และ BUFF */}
        <div className="absolute bottom-4 right-4 z-20 flex gap-4">
          <div className="flex flex-col items-center">
            <p className="text-[7px] text-white uppercase font-bold mb-1 tracking-[0.2em] [text-shadow:_1px_1px_2px_rgb(0_0_0_/_100%)]">EQUIPMENT</p>
            <div className="flex gap-1.5">{equipmentSlots.map((c, i) => <div key={i} className="w-8 h-8 bg-black/60 border border-yellow-500/30 rounded flex items-center justify-center text-[7px] text-white/40 font-bold">P{i+1}</div>)}</div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[7px] text-yellow-400 uppercase font-bold mb-1 tracking-[0.2em] [text-shadow:_1px_1px_2px_rgb(0_0_0_/_100%)]">ITEM BUFF</p>
            <div className="flex gap-1.5">{buffSlots.map((c, i) => <div key={i} className="w-8 h-8 bg-black/60 border border-blue-500/30 rounded flex items-center justify-center text-[7px] text-white/40 font-bold">B{i+1}</div>)}</div>
          </div>
        </div>
      </div> 
      
      {/* 2. ส่วนควบคุมด้านล่าง */}
      <div className="p-6"> 
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <p className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">MINING OUTPUT</p>
              <div className="flex bg-[#121212] rounded-lg border border-white/10 p-0.5">
                {['Live', '/ min', '/ hour', '/ day'].map((rate) => (
                  <button key={rate} onClick={() => setActiveRate(rate)} className={`px-3 py-1 text-[9px] font-bold rounded-md ${activeRate === rate ? 'bg-yellow-500 text-black' : 'text-stone-500'}`}>{rate}</button>
                ))}
              </div>
            </div>
            <div className="text-3xl font-black text-yellow-500 flex items-center gap-3">
              <img src="/images/Nugget-1.png" alt="Gold" className="w-16 h-16 object-contain animate-pulse" />
              <span>{output ? Number(output.toFixed(4)).toLocaleString() : 0}</span>
            </div>
          </div>
          <button disabled={isCollecting || output <= 0} onClick={onCollect} className={`px-8 py-3 rounded-xl font-black text-xs uppercase ${isCollecting || output <= 0 ? 'bg-stone-900' : 'bg-gradient-to-b from-yellow-400 to-yellow-600'}`}>COLLECT</button>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-[10px] text-stone-400 font-bold mb-2 uppercase">
            <span>Storage Status</span>
            <span className="text-yellow-500 font-black">{storagePercentage.toFixed(1)}% Full</span>
          </div>
          <div className="w-full h-6 bg-black rounded-lg border border-white/10 p-1 overflow-hidden">
            <motion.div animate={{ width: `${Math.min(storagePercentage, 100)}%` }} className="h-full bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}