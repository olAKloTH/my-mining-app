// app/mining/data/miningData.ts

export interface Tool {
  id: number;
  name: string;
  desc: string;
  rate: number;    // อัตราการขุดต่อวินาที
  price: number;   // ราคาซื้อ
  resell: number;  // ราคาขายคืน
  icon: string;    // ชื่อไฟล์ไอคอน
}

export const toolsData = [
  { id: 1, name: "Novice Shovel I", desc: "พลั่วฝึกหัดรุ่นพื้นฐานสำหรับนักขุดมือใหม่", rate: 0.0001, price: 100, resell: 110, icon: "Noviceshovel.png" },
  { id: 2, name: "Novice Shovel II", desc: "พัฒนาการอีกขั้นของพลั่วฝึกหัด เพิ่มประสิทธิภาพการขุด", rate: 0.0003, price: 300, resell: 330, icon: "Novice Shovel II.png" },
  { id: 3, name: "Iron Handle Shovel", desc: "พลั่วด้ามเหล็กกล้า แข็งแรงทนทานทุกสภาพดิน", rate: 0.0005, price: 500, resell: 550, icon: "Iron Handle Shovel.png" },
  { id: 4, name: "Steel Pickaxe", desc: "จอบเหล็กกล้าคาร์บอนสูง ขุดได้ลึกและแม่นยำขึ้น", rate: 0.001, price: 1000, resell: 1100, icon: "Steel Pickaxe.png" },
  { id: 5, name: "Neon Light Pickaxe", desc: "ส่องสว่างในความมืดด้วยแสงนีออน ขุดได้ต่อเนื่องไม่มีสะดุด", rate: 0.003, price: 3000, resell: 3300, icon: "Neon Light Pickaxe.png" },
  { id: 6, name: "Cyber Pickaxe", desc: "อุปกรณ์ขุดระบบไซเบอร์ ที่มาพร้อมความเร็วระดับนวัตกรรม", rate: 0.005, price: 5000, resell: 5500, icon: "pickaxe3.png" },
  { id: 7, name: "Core Server Pickaxe", desc: "พลั่วที่ปรับแต่งด้วยชิปประมวลผลเซิร์ฟเวอร์", rate: 0.01, price: 10000, resell: 11000, icon: "pickaxe4.png" },
  { id: 8, name: "Streamer Pickaxe", desc: "พลั่วสำหรับสายคอนเทนต์ ขุดไปโชว์ไป ทองเด้งกระจาย", rate: 0.03, price: 30000, resell: 33000, icon: "pickaxe_streamer.png" },
  { id: 9, name: "Whale Hunter Pickaxe", desc: "นักล่าปลาวาฬขุดเหมือง พลังทำลายล้างชั้นหินสูง", rate: 0.05, price: 50000, resell: 55000, icon: "pickaxe_whale.png" },
  { id: 10, name: "Black Market Mafia Pickaxe", desc: "พลั่วเถื่อนจากตลาดมืด พลังขุดที่กฎหมายห้ามไว้", rate: 0.1, price: 100000, resell: 110000, icon: "pickaxe_mafia.png" },
  { id: 11, name: "Underground DiggerPickaxe", desc: "เจ้าแห่งเหมืองลึก ขุดได้ทุกที่ที่ใจสั่ง", rate: 0.15, price: 150000, resell: 165000, icon: "pickaxe_underground.png" },
  { id: 12, name: "Rapper Pickaxe", desc: "ขุดด้วยจังหวะดนตรี ทองเด้งเป็นบีทสุดมันส์", rate: 0.2, price: 200000, resell: 220000, icon: "pickaxe_rapper.png" },
  { id: 13, name: "Alpha Core Pickaxe", desc: "ต้นกำเนิดแห่งพลังขุด เทคโนโลยีระดับอัลฟ่า", rate: 0.3, price: 300000, resell: 330000, icon: "pickaxe_alpha.png" },
  { id: 14, name: "Alpha Core Hyper Pickaxe", desc: "อัปเกรดพลังอัลฟ่าให้พุ่งทะยานสู่ขีดสุด", rate: 0.5, price: 500000, resell: 550000, icon: "pickaxe_hyper.png" },
  { id: 15, name: "Alpha World Breaker Pickaxe", desc: "ทำลายล้างทุกกฎเกณฑ์แห่งเหมืองแร่ นี่คือพลั่วแห่งพระเจ้า!", rate: 1.0, price: 1000000, resell: 1100000, icon: "pickaxe_worldbreaker.png" },
];

// ฟังก์ชันคำนวณ ROI (คืนทุนในกี่วัน)
export const calculateROI = (tool: Tool) => {
  const dailyEarnings = tool.rate * 86400;
  return (tool.price / dailyEarnings).toFixed(1); 
};