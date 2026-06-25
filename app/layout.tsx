import Header from "./components/Header";
import Footer from "./components/Footer"; 
import { NotificationProvider } from './components/context/NotificationContext'; // นำเข้า Provider
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans">
        
        {/* ครอบด้วย Provider เพื่อใช้งานแจ้งเตือนได้ทุกหน้า */}
        <NotificationProvider>
          
          {/* พื้นหลังคงที่ */}
          <div className="fixed inset-0 -z-10 bg-[#0a0a0a]">
            <div className="absolute inset-0 bg-[url('/bg-game3.webp')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          
          {/* Header */}
          <header className="relative z-50 shrink-0">
            <Header />
          </header>
          
          {/* เนื้อหาหลัก - ยืดหยุ่นตามความยาวเนื้อหา */}
          <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
            {children}
          </main>
          
          {/* Footer แบบสะอาดตา */}
          <footer className="relative z-40 shrink-0 bg-[#0a0a0a]/90 border-t border-white/5 py-8">
            <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
              <Footer /> 
            </div>
          </footer>
          
        </NotificationProvider>
      </body>
    </html>
  );
}