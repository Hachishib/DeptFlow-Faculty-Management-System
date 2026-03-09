import { BookOpen, Trash2, Plus } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import type { Research } from "../../types/research";

type ResearchTabProps = {
  research: Research[];
  editing: boolean;
};

export default function ResearchTab({ research, editing }: ResearchTabProps) {
  return (
    <div>
      <SectionHeader title="Research & Publications" />

      <div className="flex flex-col gap-3">
        {research.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-[#880000]/20 transition-all"
          >
            <div className="bg-[#FFF3F3] p-2.5 rounded-full shrink-0">
              <BookOpen size={16} className="text-[#880000]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">
                {item.title}
              </p>

              {item.journal && (
                <p className="text-xs text-gray-400">{item.journal}</p>
              )}

              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.type === "Publication"
                      ? "bg-blue-100 text-blue-600"
                      : item.type === "Research"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.type}
                </span>

                <span className="text-[10px] text-gray-400">{item.year}</span>
              </div>
            </div>

            {editing && (
              <button className="text-gray-300 hover:text-red-400">
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-[#880000]/30 rounded-lg text-xs text-[#880000] font-medium hover:bg-[#FEF2F2]">
          <Plus size={14} /> Add Research
        </button>
      )}
    </div>
  );
}
