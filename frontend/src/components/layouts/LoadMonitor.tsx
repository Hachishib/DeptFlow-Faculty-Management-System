import FacultyLoadItem from "../ui/FacultyLoadItem";
import loadItemsData from "../../mock/facultyLoad.json";
import type { LoadItem } from "../../types/load";

const loadItems: LoadItem[] = (loadItemsData as any[]).map((item) => ({
  id: item.id,
  name: item.name,
  type: item.type,
  current: item.units.current,
  max: item.units.max,
}));

export default function TeachingLoadMonitor() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border-t-[3px] border-t-primary">
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-bold text-gray-800">Teaching Load Monitor</p>
        <span className="text-sm text-gray-400">1st Semester AY 2025-2026</span>
      </div>

      <div className="flex flex-col gap-3">
        {loadItems.map((item) => (
          <FacultyLoadItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
