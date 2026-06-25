'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

export default function Announcement({ 
  isOpen, 
  message, 
  onClose 
}: { 
  isOpen: boolean, 
  message: string, 
  onClose: () => void 
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -100 }}   // เริ่มต้นซ่อนอยู่ข้างบน
          animate={{ y: 0 }}      // เลื่อนลงมา
          exit={{ y: -100 }}      // เลื่อนกลับขึ้นไปตอนปิด
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 pointer-events-none"
        >
          <div className="pointer-events-auto bg-yellow-500 text-black px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-yellow-400">
            <Bell size={20} className="animate-pulse" />
            <p className="font-bold text-sm uppercase">{message}</p>
            <button 
              onClick={onClose} 
              className="ml-4 font-black hover:opacity-70 transition-opacity"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}