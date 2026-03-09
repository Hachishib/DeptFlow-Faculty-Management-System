type StatCardType = {
  id: string;
  label: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  valueColor: string;
  borderColor: string;
  hasAlert?: boolean;
};

export default function StatCard({ card }: { card: StatCardType }) {
  return (
    <div
      className={`bg-white rounded-xl p-3 sm:p-5 shadow-sm border-t-[3px] ${card.borderColor}`}
    >
      <div className="flex items-start sm:items-center justify-between mb-2 sm:mb-3">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest">
          {card.label}
        </p>

        <div
          className={`${card.iconBg} p-2 sm:p-3 rounded-full w-12 h-12 sm:w-18 sm:h-18 flex justify-center items-center`}
        >
          <span className="text-primary flex items-center justify-center">
            {card.icon}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <p className={`text-2xl sm:text-4xl font-bold ${card.valueColor}`}>
          {card.value}
        </p>
        {card.hasAlert && (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
        )}
      </div>

      <p className="text-xs sm:text-sm text-gray-400 mt-1">
        {card.description}
      </p>
    </div>
  );
}
