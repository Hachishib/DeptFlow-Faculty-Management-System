type QuickActionType = {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
};

export default function QuickActionCard({
  action,
}: {
  action: QuickActionType;
}) {
  return (
    <button className="bg-white rounded-xl p-3 sm:p-5 text-center border border-gray-100 shadow-sm hover:border-primary hover:border-t-[3px] hover:-translate-y-0.5 transition-all duration-150 cursor-pointer group w-full">
      <div className="flex justify-center mb-2 sm:mb-3">
        <div className="bg-[#FFF3F3] p-2 sm:p-3 rounded-full group-hover:bg-[#FEF2F2] transition-colors">
          <span className="text-primary flex items-center justify-center">
            {action.icon}
          </span>
        </div>
      </div>

      <p className="text-xs sm:text-sm font-semibold text-gray-800">
        {action.label}
      </p>

      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
        {action.sublabel}
      </p>
    </button>
  );
}
