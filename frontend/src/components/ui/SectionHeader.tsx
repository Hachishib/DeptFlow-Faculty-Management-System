
export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <p className="text-xs font-bold text-[#880000] uppercase tracking-widest whitespace-nowrap">
        {title}
      </p>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}