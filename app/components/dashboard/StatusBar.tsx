'use client';
import React from 'react';

export default function StatusBar({ 
  balance = 0, 
  power = 0, 
  isLoading = false 
}: { 
  balance?: number, 
  power?: number, 
  isLoading?: boolean 
}) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0a0a0a]">
      {isLoading ? (
        <div className="flex w-full justify-between items-center animate-pulse">
          <div className="w-32 h-10 bg-stone-800 rounded-xl"></div>
          <div className="w-32 h-10 bg-stone-800 rounded-xl"></div>
        </div>
      ) : (
        <>
          {/* ฝั่งซ้าย: ยอดเงิน Balance (ใหญ่และเด่น) */}
          <div className="flex items-center gap-4 bg-[#121212] px-5 py-2.5 rounded-2xl border border-white/5 shadow-inner">
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-yellow-500/20 bg-yellow-500/5">
              <img 
                src="/images/gold.png" 
                alt="Gold" 
                className="w-full h-full object-cover scale-125 hover:scale-150 transition-transform duration-300"
              />
            </div>
            <div>
              <p className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">Balance</p>
              <p className="text-base font-black text-white">
                {balance?.toLocaleString()} <span className="text-yellow-600 font-medium">Gold</span>
              </p>
            </div>
          </div>

          {/* ฝั่งขวา: Mining Power (สะอาดและดูเป็นทางการ) */}
          <div className="text-right bg-[#121212] px-5 py-2.5 rounded-2xl border border-white/5">
            <p className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">Mining Power</p>
            <p className="text-base font-black text-white">
              {power?.toLocaleString()} <span className="text-[10px] text-stone-600 font-normal">/sec</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}