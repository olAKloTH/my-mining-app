// app/mining/components/mininghud.tsx
import Image from 'next/image'; 
import Link from 'next/link';

export default function MiningHUD({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-stone-300 font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="w-full bg-[#0f0f0f] border-b border-stone-800">
        {/* ... ใส่ Navbar ตรงนี้ ... */}
      </nav>

      <div className="flex flex-1 overflow-hidden max-w-6xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-64 border-r border-stone-800 bg-[#0f0f0f] p-6">
          {/* ... ใส่ Sidebar ตรงนี้ ... */}
        </aside>

        {/* ตรงนี้คือจุดที่เนื้อหาหน้า Mining (page.tsx) จะไปแสดง */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}