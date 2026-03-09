import { GraduationCap, Trash2, Plus } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import type { Education } from "../../types/education";

type EducationTabProps = {
  education: Education[];
  editing: boolean;
};

export default function EducationTab({
  education,
  editing,
}: EducationTabProps) {
  return (
    <div>
      <SectionHeader title="Educational Background" />

      <div className="flex flex-col gap-4">
        {education.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-[#880000]/20 hover:bg-[#FEF2F2]/30 transition-all"
          >
            <div className="bg-[#FFF3F3] p-2.5 rounded-full shrink-0">
              <GraduationCap size={16} className="text-[#880000]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">
                {item.degree}
              </p>
              <p className="text-xs text-gray-400">{item.school}</p>
              <p className="text-[10px] text-[#880000] font-semibold mt-1">
                Graduated {item.year}
              </p>
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
          <Plus size={14} /> Add Education
        </button>
      )}
    </div>
  );
}
