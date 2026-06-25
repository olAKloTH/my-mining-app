export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a]/95 border-t border-yellow-500/20 p-6 text-stone-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* ส่วนลิขสิทธิ์ */}
        <div className="text-[10px] uppercase font-bold tracking-widest text-stone-600">
          © 2026 Goal Gold Glow Miner – Core System Ver 2.0
        </div>

        {/* ส่วนนำทาง (Navigation) */}
        <div className="flex gap-8 text-[11px] font-bold uppercase text-stone-400">
          <a href="#" className="hover:text-yellow-500 transition-colors">How to</a>
          <a href="#" className="hover:text-yellow-500 transition-colors">Roadmap</a>
          <a href="#" className="hover:text-yellow-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-yellow-500 transition-colors">Support</a>
        </div>

        {/* ปุ่มลัด (Quick Action) */}
        <div className="flex gap-4">
           <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20 cursor-pointer">
             ?
           </div>
        </div>
      </div>
    </footer>
  );
}