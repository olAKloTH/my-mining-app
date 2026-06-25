'use client';
import React from 'react';

interface Tool {
  id: number;
  name: string;
  desc: string;
  rate: number;
  price: number;
  resell: number;
  icon: string;
}

interface MarketplaceProps {
  toolsData: Tool[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Marketplace({ toolsData, activeTab, setActiveTab }: MarketplaceProps) {
  
  const calculateROI = (price: number, rate: number) => {
    const dailyEarnings = rate * 86400;
    const days = Math.ceil(price / dailyEarnings);
    return days > 45 ? "ระดับคุ้มค่าสูง" : `${days} วัน`;
  };

  return (
    <section className="p-6 mt-4 font-sans">
      <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
        {['Novice', 'Pro', 'Legendary'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-[0.15em] ${
              activeTab === tab 
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]' 
                : 'bg-[#121212] border border-white/5 text-stone-500 hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            [ {tab} ]
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {toolsData.map((tool) => (
          <div key={tool.id} className="bg-[#121212] p-4 rounded-xl border border-white/5 flex flex-col md:flex-row gap-4 transition-all items-center group cursor-pointer hover:border-yellow-500 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            
            {/* กรอบรูปเรืองแสง */}
            <div className="relative w-24 h-24 bg-[#0a0a0a] rounded-lg border border-white/5 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-yellow-500/50 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]">
              <img 
                src={`/images/tools/${tool.icon}`} 
                alt={tool.name} 
                className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            
            <div className="flex-1">
              <h3 className="font-black text-sm text-white mb-1 tracking-wider group-hover:text-yellow-500 transition-colors">{tool.name}</h3>
              <p className="text-[11px] text-stone-500 leading-relaxed font-mono">{tool.desc}</p>
              <div className="flex flex-wrap items-center gap-x-4 text-[10px] uppercase font-bold tracking-widest font-mono mt-3">
                <span className="text-stone-500">Rate: <span className="text-yellow-400">{tool.rate.toFixed(5)}/s</span></span>
                <span className="text-green-500">ROI: {calculateROI(tool.price, tool.rate)}</span>
              </div>
            </div>

            <button className="bg-white/5 group-hover:bg-yellow-500 group-hover:text-black text-white px-6 py-2 rounded-lg font-black text-xs uppercase transition-all">
              ซื้อ 💰 {tool.price.toLocaleString()}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}