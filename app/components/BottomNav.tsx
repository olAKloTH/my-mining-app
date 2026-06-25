'use client';
import { Home, Pickaxe, Zap, ListTodo, Menu as MenuIcon } from 'lucide-react';

// 1. สร้าง Array กลางไว้ที่นี่ หรือย้ายไปไว้ที่ไฟล์ constants/menu.ts เพื่อใช้ร่วมกันทั้งโปรเจกต์
const menuItems = [
  { name: 'Home', icon: <Home size={20} /> },
  { name: 'Earn', icon: <Zap size={20} /> },
  { name: 'Mining', icon: <Pickaxe size={20} /> },
  { name: 'Tasks', icon: <ListTodo size={20} /> },
  { name: 'Menu', icon: <MenuIcon size={20} /> },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full bg-black border-t border-stone-800 p-4 flex justify-around items-center z-50 md:hidden">
      {menuItems.map((item) => (
        <button 
          key={item.name}
          className={`flex flex-col items-center transition-colors ${
            item.name === 'Mining' ? 'text-yellow-500' : 'text-stone-400 hover:text-yellow-500'
          }`}
        >
          {item.icon}
          <span className="text-[10px] mt-1 font-bold">{item.name}</span>
        </button>
      ))}
    </nav>
  );
}