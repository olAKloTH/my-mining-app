'use client';
import { useState } from 'react';
import { toolsData } from "./data/miningData";
import DashboardLayout from "../components/dashboard/DashbordLayout";
import StatusBar from "../components/dashboard/StatusBar";
import MiningArea from "../components/dashboard/MiningArea";
import Marketplace from "../components/dashboard/Marketplace";

export default function MiningDashboard() {
  const [activeTab, setActiveTab] = useState('Novice');
  const [isCollecting, setIsCollecting] = useState(false);
  
  // สมมติสถานะเริ่มต้น (ต่อจากนี้ให้ดึงจาก Database/API)
  const [stats, setStats] = useState({ balance: 356307, power: 1250 });

  const getFilteredTools = () => {
    if (activeTab === 'Novice') return toolsData.filter(t => t.id <= 5);
    if (activeTab === 'Pro') return toolsData.filter(t => t.id > 5 && t.id <= 10);
    return toolsData.filter(t => t.id > 10);
  };

  const handleCollect = async () => {
    setIsCollecting(true);
    // เพิ่ม Logic เรียก API ที่นี่ เช่น await fetch('/api/collect', ...)
    console.log("Collecting resources...");
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    setIsCollecting(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-0">
        <StatusBar 
          balance={stats.balance} 
          power={stats.power} 
          isLoading={false} 
        />
        <MiningArea 
          onCollect={handleCollect} 
          isCollecting={isCollecting} 
          storagePercentage={26} 
          output={356.3} 
        />
        <Marketplace 
          toolsData={getFilteredTools()} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>
    </DashboardLayout>
  );
}