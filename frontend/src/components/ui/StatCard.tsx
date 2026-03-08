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
      className={`bg-white rounded-xl p-5 shadow-sm border-t-[3px] ${card.borderColor}`}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-semibold uppercase tracking-widest">
          {card.label}
        </p>
        <div
          className={`${card.iconBg} p-2 rounded-full w-15 h-15 flex justify-center items-center`}
        >
          <span className="text-primary">{card.icon}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className={`text-4xl font-bold ${card.valueColor}`}>{card.value}</p>
        {card.hasAlert && (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
        )}
      </div>
      <p className="text-sm text-gray-400 mt-1">{card.description}</p>
    </div>
  );
}
