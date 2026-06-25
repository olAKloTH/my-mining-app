'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from "@/lib/supabaseClient"; // นำเข้าการเชื่อมต่อ Supabase

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [minerData, setMinerData] = useState<any>(null); // สำหรับเก็บข้อมูลเหมือง

  useEffect(() => {
    setMounted(true);
    
    // ดึงข้อมูลจาก Supabase
    async function fetchData() {
      const { data, error } = await supabase
        .from('miners') // ชื่อตารางของพี่
        .select('*')
        .limit(1)
        .single();
        
      if (!error && data) {
        setMinerData(data);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-50 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[url('/bg-game3.webp')] bg-cover bg-center" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center pt-16 px-6">
        
        <div className="text-center mb-6">
          <div className="w-48 h-48 md:w-64 md:h-64 relative mx-auto mb-4">
            <Image src="/logocenter.webp" alt="Logo" fill className="object-contain" priority />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-yellow-400 [text-shadow:_3px_3px_0_rgb(0,0,0),_5px_5px_10px_rgba(0,0,0,0.5)]">
            Goal Gold Glow Miner
          </h1>
          
          {/* ส่วนแสดงข้อมูลจาก DB */}
          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-white">
            <p className="text-xs uppercase tracking-widest text-yellow-400">สถานะเหมืองปัจจุบัน</p>
            <p className="text-xl font-bold">
              {minerData ? `Energy: ${minerData.energy} | Status: ${minerData.status}` : "กำลังโหลดข้อมูล..."}
            </p>
          </div>

          <p className="text-white font-bold text-sm tracking-[0.2em] uppercase mt-2 [text-shadow:_1px_1px_0_rgb(0,0,0)]">
            Welcome To Close Beta
          </p>
        </div>

        {/* ส่วนที่เหลือของพี่เหมือนเดิม */}
        {/* ... (วางโค้ดส่วนปุ่มและ section เดิมของพี่ต่อจากนี้ได้เลยครับ) */}
        
      </div>
    </div>
  );
}