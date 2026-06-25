"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

const thaiProvinces = [
  "กรุงเทพมหานคร", "กระบี่", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร", "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี", "ชัยนาท", "ชัยภูมิ", "ชุมพร", "เชียงราย", "เชียงใหม่", "ตรัง", "ตราด", "ตาก", "นครนายก", "นครปฐม", "นครพนม", "นครราชสีมา", "นครศรีธรรมราช", "นครสวรรค์", "นนทบุรี", "นราธิวาส", "น่าน", "บึงกาฬ", "บุรีรัมย์", "ปทุมธานี", "ประจวบคีรีขันธ์", "ปราจีนบุรี", "ปัตตานี", "พระนครศรีอยุธยา", "พะเยา", "พังงา", "พัทลุง", "พิจิตร", "พิษณุโลก", "เพชรบุรี", "เพชรบูรณ์", "แพร่", "ภูเก็ต", "มหาสารคาม", "มุกดาหาร", "แม่ฮ่องสอน", "ยโสธร", "ยะลา", "ร้อยเอ็ด", "ระนอง", "ระยอง", "ราชบุรี", "ลพบุรี", "ลำปาง", "ลำพูน", "เลย", "ศรีสะเกษ", "สกลนคร", "สงขลา", "สตูล", "สมุทรปราการ", "สมุทรสงคราม", "สมุทรสาคร", "สระแก้ว", "สระบุรี", "สิงห์บุรี", "สุโขทัย", "สุพรรณบุรี", "สุราษฎร์ธานี", "สุรินทร์", "หนองคาย", "หนองบัวลำภู", "อ่างทอง", "อำนาจเจริญ", "อุดรธานี", "อุตรดิตถ์", "อุทัยธานี", "อุบลราชธานี"
];

export default function SignupPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ 
    firstName: '', lastName: '', email: '', password: '', phone: '', address: '', province: '', zip: '' 
  });

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('users').insert([{
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      province: formData.province,
      zip: formData.zip
    }]);
    alert(error ? "ผิดพลาด: " + error.message : "ลงทะเบียนเรียบร้อยแล้ว");
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Image src="/bgsingup2.webp" alt="Futuristic Mining Cavern" layout="fill" objectFit="cover" objectPosition="center" priority className="opacity-70" />
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/bg-game3.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/70" />
        {mounted && [...Array(15)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 bg-yellow-400 rounded-full" initial={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: 0 }} animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [0, -50] }} transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }} style={{ filter: "blur(0.5px) drop-shadow(0 0 5px #eab308)" }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
        <Link href="/" className="absolute top-6 right-6 text-slate-500 hover:text-yellow-500 transition-all hover:scale-110 active:scale-95" title="กลับหน้าหลัก">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-500 mb-2">สมัครสมาชิก</h1>
          <p className="text-slate-400">เริ่มต้นขุดทองไปกับ 3G Miner</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="ชื่อ" required onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
            <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="นามสกุล" required onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
          </div>
          <input type="email" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="name@email.com" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="********" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <input type="tel" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="08x-xxx-xxxx" required onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="บ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ" required onChange={(e) => setFormData({...formData, address: e.target.value})} />
          
          <div className="grid grid-cols-2 gap-4">
            <select defaultValue="" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-yellow-500 outline-none" required onChange={(e) => setFormData({...formData, province: e.target.value})}>
              <option value="" disabled>เลือกจังหวัด</option>
              {thaiProvinces.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <input type="text" maxLength={5} className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="10xxx" required onChange={(e) => setFormData({...formData, zip: e.target.value})} />
          </div>

          <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl mt-6 hover:bg-yellow-400 transition-all transform hover:scale-[1.02]">
            ลงทะเบียนรับสิทธิ์ CBT & รางวัล OBT
          </button>
        </form>
      </div>
    </div>
  );
}