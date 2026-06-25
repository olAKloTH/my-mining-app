'use client';
import { Home, LayoutDashboard, Pickaxe, Zap, Award, User, Settings, ShoppingBag } from 'lucide-react';
import Link from 'next/link'; // อย่าลืม import Link นะครับ

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#111] border-r border-white/10 h-screen p-6 flex flex-col">
      {/* ส่วนข้อมูลผู้เล่น */}
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center">
          <span className="text-yellow-500 font-bold">G</span>
        </div>
        <div>
          <p className="text-[10px] text-stone-500 uppercase">Player</p>
          <p className="text-sm font-bold text-white">Guest_Miner</p>
        </div>
      </div>

      {/* กลุ่มเมนูหลัก (MENU) */}
      <div className="mb-8">
        <p className="text-[10px] text-stone-600 font-bold uppercase mb-4 px-2">Menu</p>
        <nav className="space-y-1">
          <SidebarItem icon={<Home size={18} />} label="Home" path="/" />
          <SidebarItem icon={<Pickaxe size={18} />} label="Mining" path="/mining" />
          {/* เพิ่มเมนู Shop ตรงนี้ครับ */}
          <SidebarItem icon={<ShoppingBag size={18} />} label="Shop" path="/shop" />
          <SidebarItem icon={<Zap size={18} />} label="Quests" path="/quests" />
          <SidebarItem icon={<Zap size={18} />} label="Surf Ads (Magic Scroll)" path="/surf-ads" />
          <SidebarItem icon={<Zap size={18} />} label="Expedition" path="/offerall" />
          <SidebarItem icon={<Award size={18} />} label="Claim Rewards" path="/rewards" />
        </nav>
      </div>

      {/* กลุ่มระบบ (SYSTEM) */}
      <div>
        <p className="text-[10px] text-stone-600 font-bold uppercase mb-4 px-2">System</p>
        <nav className="space-y-1">
          <SidebarItem icon={<User size={18} />} label="Account" path="/account" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" path="/settings" />
        </nav>
      </div>
    </div>
  );
}

// ปรับปรุง SidebarItem ให้รองรับ Link
function SidebarItem({ icon, label, active, path }: { icon: React.ReactNode, label: string, active?: boolean, path: string }) {
  return (
    <Link href={path}>
      <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
        active 
          ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' 
          : 'text-stone-400 hover:bg-white/5 hover:text-white'
      }`}>
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </button>
    </Link>
  );
}