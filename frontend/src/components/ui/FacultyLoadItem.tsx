import { getLoadColor, getLoadWidth } from "../../utils/loadItem";

import type { LoadItem } from "../../types/load";

type Props = {
  item: LoadItem;
};

export default function FacultyLoadItem({ item }: Props) {
  const isOver = item.current > item.max;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-gray-700">{item.name}</span>

          <span
            className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
              item.type === "Full Time"
                ? "bg-blue-100 text-blue-600"
                : "bg-purple-100 text-purple-600"
            }`}
          >
            {item.type}
          </span>
        </div>

        <span
          className={`text-sm font-normal ${
            isOver ? "text-red-500" : "text-gray-500"
          }`}
        >
          {item.current}/{item.max} units
        </span>
      </div>

      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${getLoadColor(
            item.current,
            item.max,
          )}`}
          style={{ width: getLoadWidth(item.current, item.max) }}
        />
      </div>
    </div>
  );
}
