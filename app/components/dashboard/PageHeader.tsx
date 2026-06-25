'use client';
import React from 'react';

interface PageHeaderProps {
  title: string;
  balance: number;
}

export default function PageHeader({ title, balance }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center bg-[#121212] border border-white/5 rounded-2xl p-6 mb-6 relative overflow-hidden shadow-lg">
      {/* เอฟเฟกต์แสงเงาจางๆ ด้านหลัง */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl -translate-x-10 -translate-y-10"></div>
      
      {/* ชื่อหน้า */}
      <div className="relative z-10">
        <h1 className="text-2xl font-black text-white tracking-wider uppercase">{title}</h1>
      </div>

      {/* ยอดเงิน + ปุ่มลัด */}
      <div className="relative z-10 flex items-center gap-4 bg-black/40 px-5 py-2.5 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <img src="/images/gold.png" className="w-6 h-6 object-contain" alt="gold" />
          <span className="font-black text-yellow-500 text-lg font-mono">
            {balance.toLocaleString()}
          </span>
        </div>
        
        {/* เส้นคั่น */}
        <div className="w-px h-6 bg-white/10"></div>
        
        {/* ปุ่มเมนูลัด */}
        <div className="flex gap-2">
          <button className="text-stone-400 hover:text-white transition-colors">🏆</button>
          <button className="text-stone-400 hover:text-white transition-colors">☰</button>
        </div>
      </div>
    </div>
  );
}