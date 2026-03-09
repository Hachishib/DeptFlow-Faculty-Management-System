


export default function TeachingLoadCard(){
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border-t-[3px] border-t-[#880000]">
      <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-widest">
        Teaching Load
      </p>
      <div className="flex items-end justify-between mb-1.5">
        <span className="text-2xl font-bold text-[#880000]">19</span>
        <span className="text-xs text-gray-400">/ 21 units max</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full"
          style={{ width: "90%" }}
        />
      </div>
      <p className="text-[10px] text-amber-500 mt-1.5 font-medium">
        Near maximum load
      </p>
    </div>
  );
}