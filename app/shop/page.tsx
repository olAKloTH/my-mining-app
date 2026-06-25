'use client';
import { useState } from 'react';
// แก้ไข Path ให้ตรงกับที่คุณวางไฟล์จริงๆ นะครับ
// ถ้าไฟล์อยู่ที่ app/components/shop/LuckyBoxModal.tsx ต้องใช้:
import LuckyBoxModal from '../components/shop/LuckyBoxModal'; 

export default function ShopPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userLevel = 5; 

  return (
    <div className="p-8">
      <h1 className="text-white text-3xl mb-8">ร้านค้า</h1>
      
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all shadow-[0_3px_0_rgba(107,33,168,1)] active:shadow-none active:translate-y-0.5"
        >
          SHOP / LUCKY BOXES
        </button>
      </div>

      <LuckyBoxModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        userLevel={userLevel} 
      />
    </div>
  );
}