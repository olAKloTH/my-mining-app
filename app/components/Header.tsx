export default function Header() {
  return (
    <header className="border-b border-stone-800 bg-stone-950/90 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
       {/* 1. ส่วนซ้าย: Logo + ชื่อเกม */}
<div className="flex items-center gap-3 shrink-0">
  <img 
    src="/logom.png" 
    alt="Goal Gold Glow Miner Logo" 
    className="w-20 h-20 object-contain" 
  />
  <span className="text-xl font-black text-white tracking-tight">
  {/* ใส่ทั้ง แสงทอง + ขอบขาว เฉพาะ 3 คำนี้ */}
  <span className="gold-text-glow white-outline">Goal</span> 
  <span className="gold-text-glow white-outline mx-1">Gold</span> 
  <span className="gold-text-glow white-outline">Glow</span> 
  
  {/* Miner ปล่อยไว้เฉยๆ ตามสั่งครับ */}
  <span className="ml-1">Miner</span>
</span>
</div>

        {/* 2. ส่วนกลาง: เมนูหลัก */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-stone-400">
          <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
          <a href="/surf" className="hover:text-orange-500 transition-colors">Magic Scroll</a>
          <a href="/offers" className="hover:text-orange-500 transition-colors">Expedition</a>
          <a href="/mining" className="hover:text-orange-500 transition-colors">Mining</a>
          <a href="/marchant guild" className="hover:text-orange-500 transition-colors">Merchant Guild</a>
        </nav>

        {/* 3. ส่วนขวา: ลงทะเบียน/Login */}
        <div className="flex gap-4 text-sm font-medium">
          <a href="/register" className="text-stone-300 hover:text-white transition-colors">ลงทะเบียน</a>
          <a href="/login" className="text-orange-500 hover:text-orange-400 transition-colors">Login</a>
        </div>
        
      </div>
    </header>
  );
}