export default function AiConflictAlert() {
  return (
    <div className="bg-[#F5F3FF] border-l-4 border-l-[#7C3AED] rounded-xl px-5 py-4 flex items-center justify-between">
      <div className="flex items-start gap-3">
        <span className="text-[#7C3AED] text-lg mt-0.5">✦</span>
        <div>
          <p className="text-lg font-bold text-[#7C3AED]">
            DeptBot Detected 2 Schedule Conflicts
          </p>
          <p className="text-sm text-gray-500 mt-0.5">
            Prof. Santos has a time overlap on MWF 8–9AM and Lab 3 is
            double-booked. Resolve before finalizing.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-6 shrink-0">
        <button className="bg-[#7C3AED] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#6D28D9] transition-colors cursor-pointer">
          Resolve Now
        </button>
        <button className="border border-gray-200 bg-white text-gray-500 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          Dismiss
        </button>
      </div>
    </div>
  );
}
