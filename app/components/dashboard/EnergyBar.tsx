'use client';
import React from 'react';

// 1. สร้าง Interface กำหนด Type ให้ Props ป้องกัน Error ใน TypeScript
interface EnergyBarProps {
  energyTimeLeft: number;
  maxEnergyTime: number;
}

export default function EnergyBar({ energyTimeLeft, maxEnergyTime }: EnergyBarProps) {
  // คำนวณ % เพื่อวาดหลอด (ป้องกันไม่ให้เกิน 100%)
  const percentage = Math.min((energyTimeLeft / maxEnergyTime) * 100, 100);

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 p-4 bg-[#1A1C23] rounded-xl border border-cyan-900/50 shadow-inner">
      <div className="flex justify-between items-center mb-3">
        
        {/* ป้ายชื่อและเวลาถอยหลัง */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd"></path>
            </svg>
            CORE ENERGY
          </span>
          <span className="text-xs font-mono text-gray-300 bg-gray-800 px-2 py-0.5 rounded">
            {/* โชว์เวลาที่เหลือ (ตัวเลขจำลองไปก่อน) */}
            18h : 30m Left
          </span>
        </div>

        {/* ปุ่มดู Ads */}
        <button 
          onClick={() => alert("ระบบกำลังเชื่อมต่อโฆษณา Lootably...")}
          className="text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-400 hover:text-black transition-all px-4 py-1.5 rounded-lg flex items-center gap-1 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
        >
          ▶ CHARGE (+1h)
        </button>
      </div>
      
      {/* หลอดพลังงานสีฟ้า */}
      <div className="w-full bg-gray-900 rounded-full h-2.5 shadow-inner">
        <div 
          className="bg-cyan-400 h-2.5 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-500" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}