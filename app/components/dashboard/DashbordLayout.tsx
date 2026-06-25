import Sidebar from "../Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex w-full max-w-7xl gap-6 mx-auto mt-8">
      <aside className="hidden md:block w-64 shrink-0">
        <Sidebar />
      </aside>
      <main className="flex-1 bg-[#0f0f0f]/90 backdrop-blur-sm rounded-3xl border border-white/5 overflow-hidden">
        {children}
      </main>
    </div>
  );
}