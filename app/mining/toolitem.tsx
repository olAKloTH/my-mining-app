// app/mining/components/ToolItem.tsx
"use client";
export default function ToolItem({ tool }: { tool: any }) {
  return (
    <div className="bg-stone-900 border border-stone-700 p-4 rounded-xl flex items-center gap-4 text-white">
      <div className="w-16 h-16 bg-stone-800 rounded-lg flex items-center justify-center font-bold">Icon</div>
      <div className="flex-1">
        <h3 className="font-bold text-lg">{tool.name}</h3>
        <p className="text-sm text-stone-400">{tool.desc}</p>
        <p className="text-yellow-500 font-mono mt-1">Rate: {tool.rate}/sec</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2 bg-black p-1 rounded">
          <button className="bg-stone-700 px-3 py-1 rounded">-</button>
          <span className="w-8 text-center">0</span>
          <button className="bg-stone-700 px-3 py-1 rounded">+</button>
        </div>
        <button className="bg-yellow-600 px-6 py-2 rounded font-bold">Buy {tool.price} G</button>
      </div>
    </div>
  );
}