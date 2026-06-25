import { Pickaxe } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-yellow-500">
      <div className="animate-spin mb-4">
        <Pickaxe size={48} />
      </div>
      <p className="font-black tracking-widest uppercase animate-pulse">
        กำลังเข้าสู่เหมือง...
      </p>
    </div>
  );
}