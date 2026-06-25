"use client";
import { useState, useEffect } from "react"; // 1. เพิ่ม Import สำหรับ State
import Image from 'next/image';
import { motion } from 'framer-motion'; // 2. เพิ่ม Import สำหรับ Framer Motion (เม็ดทอง)

export default function TosPage() {
  // 3. สร้าง State mounted เพื่อให้เม็ดทองทำงานตอนโหลดหน้าเสร็จ (แก้จอแดง)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white p-6 md:p-12 overflow-hidden flex flex-col items-center justify-center">
      
      {/* 1. ส่วนพื้นหลัง (รวม Background, Overlay และเม็ดทองระยิบระยับไว้ด้วยกัน) */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/bg-game3.webp"
          alt="Futuristic Mining Cavern"
          fill // ใช้ fill ตามมาตรฐานใหม่ของ Next.js
          className="object-cover object-center opacity-70 z-0"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/70 z-10" /> 
        
        {/* เม็ดทองระยิบระยับลอยไปมา */}
        <div className="absolute inset-0 z-20">
          {mounted && [...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              initial={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [0, -50] }}
              transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
              style={{ filter: "blur(0.5px) drop-shadow(0 0 5px #eab308)" }}
            />
          ))}
        </div>
      </div>

      {/* 2. Container หลัก (เพิ่ม backdrop-blur เพื่อความสวยงาม) */}
      <div className="relative z-10 w-full max-w-3xl mx-auto bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
        <h1 className="text-3xl font-bold text-yellow-500 mb-6 text-center md:text-left">ข้อตกลงการใช้งาน (Terms of Service)</h1>
        
        <div className="space-y-6 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-2">1. สถานะบริการและแต้มสะสม</h2>
            <p>กิจกรรมใน 3G Miner เป็นเพียง "กิจกรรมส่งเสริมการขาย" เพื่อความบันเทิงเท่านั้น แต้มสะสมหรือทองในเกมเป็นเพียงแต้มสมนาคุณ (Loyalty Points) ไม่มีมูลค่าเงินสด ไม่สามารถแลกเปลี่ยนเป็นเงินจริงได้ทุกกรณี</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">2. กฎการขุดและสถานะบัญชี</h2>
            <p>ผู้เล่นมีสิทธิ์ได้รับพลังงานจากการชมโฆษณาเพื่อเปิดใช้งานเหมือง 24 ชม. ระบบจะหยุดขุดหากคลังเต็มและผู้เล่นไม่ได้ทำการกด Collect ภายในเวลาที่กำหนด</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">3. นโยบายการตรวจสอบการทุจริต</h2>
            <p className="text-red-400 font-semibold">บริษัทขอสงวนสิทธิ์ในการระงับบัญชี (Ban) ถาวร โดยไม่คืนเงินหรือชดเชยใดๆ หากตรวจพบ:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>การใช้โปรแกรมช่วยเล่น (Bot/Macro/Script)</li>
              <li>การสร้างบัญชีซ้ำซ้อนเพื่อปั่นผลประโยชน์</li>
              <li>พฤติกรรมมุ่งเน้นการเก็งกำไรและปั่นราคา</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">4. สิทธิ์ในการสื่อสารและการโฆษณา</h2>
            <p>ผู้เล่นยินยอมให้บริษัทนำชื่อบัญชีหรือสื่อที่เกิดขึ้นในเกมไปใช้เพื่อการประชาสัมพันธ์ โดยไม่มีการเรียกร้องค่าตอบแทนเพิ่มเติม</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">5. การจำกัดความรับผิดชอบ</h2>
            <p>เนื่องจากอยู่ในช่วง Close Beta (CBT) ระบบอาจมีการปรับปรุงหรือแก้ไขเงื่อนไขของรางวัลได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า</p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <button 
            onClick={() => window.history.back()}
            className="bg-yellow-500 text-black font-bold px-10 py-4 rounded-full hover:bg-yellow-400 transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.5)]"
          >
            เข้าใจและตกลง
          </button>
        </div>
      </div>
    </div>
  );
}