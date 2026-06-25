'use client';
import { motion, AnimatePresence } from 'framer-motion';


export default function LuckyBoxModal({ isOpen, onClose, userLevel }: any) {
  
  // Component ย่อย BoxCard พร้อมเอฟเฟกต์ที่ปรับปรุงแล้ว
  const BoxCard = ({ name, price, level }: any) => {
    const isLocked = userLevel < level;
    
    return (
      <div 
        className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer 
          ${isLocked 
            ? 'bg-slate-800/50 border-slate-700 opacity-60 grayscale cursor-not-allowed' 
            : 'bg-slate-800 border-yellow-500/30 hover:border-yellow-500 hover:scale-105 shadow-lg hover:shadow-yellow-500/20'
          }`}
      >
        <h3 className="text-white font-bold text-center">{name}</h3>
        <p className="text-yellow-400 text-sm text-center mb-2">{price}</p>
        
        {isLocked ? (
          <div className="flex flex-col items-center">
            <p className="text-[10px] text-red-400 font-bold bg-red-950/30 px-2 py-0.5 rounded">
              🔒 ต้องเวล {level}
            </p>
          </div>
        ) : (
          <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-black py-2 rounded transition-colors active:scale-95">
            เปิดเลย
          </button>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 border border-yellow-500/30 w-full max-w-2xl rounded-3xl p-8 relative shadow-2xl"
          >
            {/* ปุ่มปิด */}
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors text-2xl"
            >
              ✕
            </button>
            
            <h2 className="text-3xl font-black text-yellow-400 mb-8 uppercase text-center tracking-widest">
              Lucky Boxes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BoxCard name="Common Box" price="500 G" level={1} />
              <BoxCard name="Master Box" price="1,500 G" level={5} />
              <BoxCard name="Godly Box" price="5,000 G" level={10} />
            </div>

            <p className="text-center text-slate-500 text-xs mt-8">
              ระดับเลเวลปัจจุบันของคุณ: {userLevel}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}