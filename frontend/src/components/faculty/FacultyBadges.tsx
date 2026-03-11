export function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
        type === "Full-time"
          ? "bg-blue-100 text-blue-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      {type}
    </span>
  );
}
