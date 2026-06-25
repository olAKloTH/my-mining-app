'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DiggingCanvas from "../../mining/DiggingCanvas";
import EnergyBar from "./EnergyBar"; 

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

  // [A] State สำหรับเก็บค่าปุ่มเรททองที่กำลังกดอยู่
  const [activeRate, setActiveRate] = useState('Live');

  // [B] State สำหรับเก็บเวลานับถอยหลังคลังเต็ม (สมมติว่าเหลือ 3 ชั่วโมง 6 นาที 15 วินาที = 11175 วินาที)
  const [timeUntilFull, setTimeUntilFull] = useState(11175);
  
  // จัดการระบบเวลา (รูปภาพพื้นหลัง & นับถอยหลังคลังเต็ม)
  useEffect(() => {
    // 1. ระบบเปลี่ยนรูปพื้นหลัง
    const backgrounds = ["mine-bg1.webp", "mine-bg2.webp", "mine-bg3.webp", "mine-bg4.webp", "mine-bg5.webp"];
    backgrounds.forEach((img) => {
      const newImage = new Image();
      newImage.src = `/${img}`;
    });
    const delayTime = 60 * 1000; 
    let currentIndex = 0;
    const bgInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % backgrounds.length;
      setBgImage(backgrounds[currentIndex]);
    }, delayTime); 

    // 2. ระบบนับถอยหลังคลังเต็ม (ลดลงทีละ 1 วินาที)
    const timerInterval = setInterval(() => {
      setTimeUntilFull((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(bgInterval);
      clearInterval(timerInterval);
    };
  }, []);

  // ฟังก์ชันเมื่อกดปุ่ม COLLECT จะสั่งเคลียร์เวลาในนี้ และส่งคำสั่งไปโตขึ้นข้างบน
  const handleCollectClick = () => {
    if (output <= 0 || isCollecting) return;
    onCollect();
    setTimeUntilFull(11175); // รีเซ็ตเวลากลับไปเต็ม Max ใหม่คอยนับถอยหลังรอบถัดไป
  };

  // ฟังก์ชันแปลงวินาทีให้เป็นรูปแบบ HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5">
      
      {/* 1. ส่วนรูปเหมืองพร้อมเอฟเฟกต์เปลี่ยนรูป */}
      <div className="relative w-full h-64 overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div 
            key={bgImage}
            initial={{ opacity: 0 }}   
            animate={{ opacity: 1 }}   
            exit={{ opacity: 0.05 }}   
            transition={{ duration: 3.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/${bgImage}')` }}
          />
        </AnimatePresence>
        
        <DiggingCanvas onDig={onDig} />

        <div className="absolute bottom-4 right-4 z-20 flex gap-4">
          <div className="flex flex-col items-end">
            <p className="text-[7px] text-white/70 uppercase font-bold mb-1 tracking-[0.2em] text-right">YOUR EQUIPMENT</p>
            <div className="flex gap-1.5">
              {equipmentSlots.map((count, index) => (
                <div key={`eq-${index}`} className="relative">
                  <div className="absolute -top-3 left-0 right-0 text-center z-10">
                    <span className="bg-yellow-500 text-black text-[7px] font-black px-0.5 rounded-sm shadow-lg">{count}</span>
                  </div>
                  <div className="w-8 h-8 bg-black/60 border border-yellow-500/30 rounded flex items-center justify-center backdrop-blur-sm">
                    <span className="text-[7px] text-white/40 font-bold">P{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-[7px] text-yellow-400/80 uppercase font-bold mb-1 tracking-[0.2em] text-right">Item Buff</p>
            <div className="flex gap-1.5">
              {buffSlots.map((count, index) => (
                <div key={`buff-${index}`} className="relative">
                  <div className="absolute -top-3 left-0 right-0 text-center z-10">
                    <span className="bg-blue-500 text-white text-[7px] font-black px-0.5 rounded-sm shadow-lg">{count}</span>
                  </div>
                  <div className="w-8 h-8 bg-black/60 border border-blue-500/30 rounded flex items-center justify-center backdrop-blur-sm">
                    <span className="text-[7px] text-white/40 font-bold">B{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 2. ส่วนควบคุม (แผงหน้าปัดด้านล่าง) */}
      <div className="p-6"> 
        <div className="flex justify-between items-end mb-6">
          <div>
            
            {/* [A] ส่วนหัว: ชื่อกล่อง + ปุ่มสลับเรททอง */}
            <div className="flex items-center gap-4 mb-2">
              <p className="text-[10px] text-stone-500 uppercase font-bold tracking-wider">MINING OUTPUT</p>
              
              <div className="flex bg-[#121212] rounded-lg border border-white/10 p-0.5 shadow-inner">
                {['Live', '/ min', '/ hour', '/ day'].map((rate) => (
                  <button 
                    key={rate}
                    onClick={() => setActiveRate(rate)}
                    className={`px-3 py-1 text-[9px] font-bold rounded-md transition-all ${
                      activeRate === rate 
                        ? 'bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.4)]' 
                        : 'text-stone-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {rate}
                  </button>
                ))}
              </div>
            </div>

            {/* โชว์ยอดทอง (ปรับขนาดรูปทอง Live ให้ใหญ่ขึ้น 1 เท่าตัวแล้ว) */}
            <div className="flex items-center gap-3">
              <div className="text-3xl font-black text-yellow-500 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                
                {/* 🌟 จุดที่แก้ไข: ขยายขนาดเป็น w-16 h-16 ตามบรีฟครับ */}
                <img 
                  src="/images/Nugget-1.png" 
                  alt="Live Gold" 
                  className="w-16 h-16 object-contain animate-pulse drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* อิโมจิสำรอง (ซ่อนไว้ก่อน) */}
                <span className="text-2xl hidden">🪙</span>

                <span>{output ? Number(output.toFixed(4)).toLocaleString() : 0}</span>
              </div>
              
              {/* โชว์ตัวเลขบวกเพิ่มด้านหลัง เมื่อไม่ได้กดปุ่ม Live */}
              {activeRate !== 'Live' && (
                <motion.span 
                  key={activeRate}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-bold text-yellow-500/70 ml-1"
                >
                  {activeRate === '/ min' ? '+1.25' : activeRate === '/ hour' ? '+75.00' : '+1,800'}
                </motion.span>
              )}
            </div>

          </div>

          {/* ปุ่ม Collect */}
          <button 
            disabled={isCollecting || output <= 0}
            onClick={handleCollectClick}
            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all border 
            ${isCollecting || output <= 0
              ? 'bg-stone-900 text-stone-600 border-stone-800 cursor-not-allowed shadow-none' 
              : 'bg-gradient-to-b from-yellow-400 to-yellow-600 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] hover:scale-105 active:scale-95 cursor-pointer'
            }`}
          >
            {isCollecting ? "COLLECTING..." : "COLLECT"}
          </button>
        </div>

        {/* [B] Storage Bar + เวลานับถอยหลัง */}
        <div className="mt-4">
          <div className="flex justify-between text-[10px] text-stone-400 font-bold mb-2 uppercase tracking-wider items-center">
            
            <div className="flex items-center gap-2">
              <span>Storage Status</span>
              <span className="text-stone-600">•</span>
              <span className="text-yellow-400 font-mono tracking-widest bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                {storagePercentage >= 100 ? "STORAGE FULL" : `FULL IN ${formatTime(timeUntilFull)}`}
              </span>
            </div>

            <span className="text-yellow-500 font-black">{storagePercentage.toFixed(1)}% Full</span>
          </div>

          <div className="w-full h-6 bg-black rounded-lg border border-white/10 p-1 overflow-hidden shadow-inner relative">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${Math.min(storagePercentage, 100)}%` }} 
              transition={{ type: "spring", stiffness: 50 }}
              className="h-full bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 rounded-md shadow-[0_0_10px_rgba(234,179,8,0.5)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20" />
            </motion.div>
          </div>
        </div>

        {/* Energy Bar */}
        <div className="mt-6">
          <EnergyBar energyTimeLeft={18.5} maxEnergyTime={24} />
        </div>

      </div>
    </section>
  );
}