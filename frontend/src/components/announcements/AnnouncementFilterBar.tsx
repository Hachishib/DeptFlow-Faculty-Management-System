import { Search, X } from "lucide-react";
import type { AnnouncementFilters, FilterTag } from "../../types/announcement";
import { FILTER_TAGS } from "../../utils/announcementHelper";

type Props = {
  filters: AnnouncementFilters;
  onChange: (updated: Partial<AnnouncementFilters>) => void;
  onClearAll: () => void;
};

export default function AnnouncementFiltersBar({
  filters,
  onChange,
  onClearAll,
}: Props) {
  const hasActiveFilters =
    filters.search ||
    filters.tag !== "All" ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="flex flex-col gap-3">

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search by title or content..."
            className="w-full pl-10 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#880000] transition-colors bg-white"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ search: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Date range */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shrink-0">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
            From
          </span>
          <input
            type="date"
            value={filters.dateFrom}
            max={filters.dateTo || undefined}
            onChange={(e) => onChange({ dateFrom: e.target.value })}
            className="text-sm text-gray-700 focus:outline-none cursor-pointer bg-transparent"
          />
          <span className="text-gray-300 mx-0.5">—</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
            To
          </span>
          <input
            type="date"
            value={filters.dateTo}
            min={filters.dateFrom || undefined}
            onChange={(e) => onChange({ dateTo: e.target.value })}
            className="text-sm text-gray-700 focus:outline-none cursor-pointer bg-transparent"
          />
          {(filters.dateFrom || filters.dateTo) && (
            <button
              onClick={() => onChange({ dateFrom: "", dateTo: "" })}
              className="ml-1 text-gray-300 hover:text-gray-500 cursor-pointer"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Tag pills and clear all */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 overflow-x-auto">
          {FILTER_TAGS.map((tag: FilterTag) => (
            <button
              key={tag}
              onClick={() => onChange({ tag })}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filters.tag === tag
                  ? "bg-[#FEF2F2] text-[#880000]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-xs text-gray-400 hover:text-[#880000] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
