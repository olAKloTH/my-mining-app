'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient'; // 1. นำเข้า supabase

const thaiProvinces = [
  "กรุงเทพมหานคร", "กระบี่", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร", "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี", "ชัยนาท", "ชัยภูมิ", "ชุมพร", "เชียงราย", "เชียงใหม่", "ตรัง", "ตราด", "ตาก", "นครนายก", "นครปฐม", "นครพนม", "นครราชสีมา", "นครศรีธรรมราช", "นครสวรรค์", "นนทบุรี", "นราธิวาส", "น่าน", "บึงกาฬ", "บุรีรัมย์", "ปทุมธานี", "ประจวบคีรีขันธ์", "ปราจีนบุรี", "ปัตตานี", "พระนครศรีอยุธยา", "พะเยา", "พังงา", "พัทลุง", "พิจิตร", "พิษณุโลก", "เพชรบุรี", "เพชรบูรณ์", "แพร่", "ภูเก็ต", "มหาสารคาม", "มุกดาหาร", "แม่ฮ่องสอน", "ยโสธร", "ยะลา", "ร้อยเอ็ด", "ระนอง", "ระยอง", "ราชบุรี", "ลพบุรี", "ลำปาง", "ลำพูน", "เลย", "ศรีสะเกษ", "สกลนคร", "สงขลา", "สตูล", "สมุทรปราการ", "สมุทรสงคราม", "สมุทรสาคร", "สระแก้ว", "สระบุรี", "สิงห์บุรี", "สุโขทัย", "สุพรรณบุรี", "สุราษฎร์ธานี", "สุรินทร์", "หนองคาย", "หนองบัวลำภู", "อ่างทอง", "อำนาจเจริญ", "อุดรธานี", "อุตรดิตถ์", "อุทัยธานี", "อุบลราชธานี"
];

export default function SignupPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', province: '', zip: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setMounted(true), []);

  // 2. ฟังก์ชันส่งข้อมูลเข้า Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase
      .from('users') // ชื่อตารางใน Supabase ของพี่
      .insert([formData]);

    if (error) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    } else {
      alert("ลงทะเบียนสำเร็จ!");
      window.location.href = '/login';
    }
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background... (โค้ดส่วนเดิมของพี่) */}
      <div className="fixed inset-0 z-0">
        <Image src="/bgsingup2.webp" alt="Futuristic" layout="fill" objectFit="cover" className="opacity-70" />
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
        <Link href="/" className="absolute top-6 right-6 text-slate-500 hover:text-yellow-500"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></Link>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="ชื่อ" className="w-full bg-slate-950 border p-3 rounded-xl" onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
            <input type="text" placeholder="นามสกุล" className="w-full bg-slate-950 border p-3 rounded-xl" onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
          </div>
          <input type="email" placeholder="อีเมล" className="w-full bg-slate-950 border p-3 rounded-xl" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="tel" placeholder="เบอร์โทรศัพท์" className="w-full bg-slate-950 border p-3 rounded-xl" onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
          <input type="text" placeholder="ที่อยู่" className="w-full bg-slate-950 border p-3 rounded-xl" onChange={(e) => setFormData({...formData, address: e.target.value})} required />
          
          <div className="grid grid-cols-2 gap-4">
            <select className="w-full bg-slate-950 border p-3 rounded-xl" onChange={(e) => setFormData({...formData, province: e.target.value})} required>
              <option value="">เลือกจังหวัด</option>
              {thaiProvinces.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <input type="text" placeholder="รหัสไปรษณีย์" className="w-full bg-slate-950 border p-3 rounded-xl" onChange={(e) => setFormData({...formData, zip: e.target.value})} required />
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl mt-6 hover:bg-yellow-400">
            {isLoading ? "กำลังบันทึก..." : "ลงทะเบียน"}
          </button>
        </form>
      </div>
    </div>
  );
}