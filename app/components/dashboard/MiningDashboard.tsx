'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MiningArea from './MiningArea';
import StatusBar from './StatusBar';

export default function MiningDashboard() {
  const [globalBalance, setGlobalBalance] = useState(356307);
  const [miningPower, setMiningPower] = useState(1250); 
  const [minedOutput, setMinedOutput] = useState(356.3);
  const [storagePercentage, setStoragePercentage] = useState(35.6);
  const [isCollecting, setIsCollecting] = useState(false);
  
  // 🌟 เพิ่ม State สำหรับคุมหน้าต่าง Popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastCollected, setLastCollected] = useState(0);

  const baseMiningRatePerSecond = 0.05; 
  const maxStorageGold = 1000;

  useEffect(() => {
    const miningInterval = setInterval(() => {
      setMinedOutput((prevOutput) => {
        if (storagePercentage < 100) {
          const nextOutput = prevOutput + baseMiningRatePerSecond;
          const nextPercent = (nextOutput / maxStorageGold) * 100;
          setStoragePercentage(Math.min(nextPercent, 100));
          return nextOutput;
        }
        return prevOutput;
      });
    }, 1000);
    return () => clearInterval(miningInterval);
  }, [storagePercentage]);

  const handleCollectGold = () => {
    if (minedOutput <= 0 || isCollecting) return;
    setIsCollecting(true);
    setLastCollected(minedOutput); // เก็บยอดทองที่กดเก็บไว้โชว์ใน Modal

    setTimeout(() => {
      setGlobalBalance((prev) => prev + minedOutput);
      setMinedOutput(0);
      setStoragePercentage(0);
      setIsCollecting(false);
      setIsModalOpen(true); // 🌟 เปิด Modal ทันทีที่โหลดเสร็จ
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-4 relative">
      <StatusBar balance={globalBalance} power={miningPower} isLoading={false} />
      <MiningArea 
        output={minedOutput}
        storagePercentage={storagePercentage}
        isCollecting={isCollecting}
        onCollect={handleCollectGold}
      />

      {/* 🌟 Success Modal (หน้าต่างสำเร็จแบบมืออาชีพ) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#121212] border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-xl font-black text-white mb-3">Collection Complete</h2>
              <p className="text-sm text-stone-400 mb-8">
                <span className="flex items-center justify-center gap-1.5 text-yellow-500 font-bold text-base mb-1">
                  <img src="/images/gold.png" className="w-5 h-5" />
                  {lastCollected.toFixed(2)}
                </span>
                successfully added to your account
              </p>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-green-500 hover:bg-green-400 text-black font-black py-3.5 rounded-xl uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              >
                OK
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}