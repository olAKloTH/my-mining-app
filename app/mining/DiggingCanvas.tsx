"use client";
import { useEffect, useRef } from "react";

export default function DiggingCanvas({ onDig }: { onDig?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{x: number, y: number, life: number, val: string}[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ตั้งค่าขนาดให้เต็มพื้นที่ของ Container แม่
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((p) => {
        p.y -= 0.33;
        p.x += (Math.random() - 0.3) * 0.2;
        p.life -= 0.004;
        
        ctx.fillStyle = `rgba(234, 179, 8, ${p.life})`;
        ctx.font = "bold 20px monospace";
        ctx.fillText(p.val, p.x, p.y);
      });

      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      frameId = requestAnimationFrame(animate);
    };
    
    animate();

    const autoDig = setInterval(() => {
      // ตรวจสอบว่าทองบนจอต้องน้อยกว่า 20 เม็ด ถึงจะให้เกิดใหม่
      if (particlesRef.current.length < 20) {
        const x = Math.random() * (canvas.width - 80) + 30;
        const y = canvas.height * 0.6 + (Math.random() * 50 - 25);
        
        // push แค่ในนี้ที่เดียว
        particlesRef.current.push({ x, y, life: 1, val: "+0.007" });
        
        // เรียก onDig เฉพาะตอนที่สร้างทองใหม่สำเร็จ
        if (onDig) onDig(); 
      }
    }, 2000);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(autoDig);
    };
  }, [onDig]);

  return (
    <canvas 
      ref={canvasRef} 
      // absolute ทำให้มันลอยทับ และ pointer-events-none ทำให้คลิกทะลุไปกดปุ่มด้านล่างได้
      className="absolute inset-0 w-full h-full block pointer-events-none" 
    />
  );
}