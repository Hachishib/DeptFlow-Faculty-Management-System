type PropsField = {
  label: string;
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
  type?: string;
};

export default function Field({
  label,
  value,
  editing,
  onChange,
  type = "text",
}: PropsField) {

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest">
        {label}
      </label>
      {editing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#880000] transition-colors"
        />
      ) : (
        <p className="text-sm font-medium text-gray-800">{value || "—"}</p>
      )}
    </div>
  );
}
