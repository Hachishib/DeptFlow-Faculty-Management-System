import type { AnnouncementItem } from "../../types/announcement";

type Props = {
  announcements: AnnouncementItem[];
};

export default function AnnouncementCard({ announcements }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 border-t-[3px] border-t-primary">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-800">
          Announcements
        </p>
        <button className="bg-primary text-white text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-md hover:bg-[#6B0000] transition-colors cursor-pointer">
          + Post
        </button>
      </div>

      <div className="flex flex-col">
        {announcements.map((item, index) => (
          <div
            key={item.id}
            className={`py-2.5 ${
              index !== announcements.length - 1
                ? "border-b border-gray-50"
                : ""
            }`}
          >
            <div className="flex items-center gap-1 mb-0.5">
              {item.pinned && (
                <span className="text-[#F5C400] text-xs sm:text-sm">📌</span>
              )}
              <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                {item.title}
              </p>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5">
              {item.date}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 leading-snug line-clamp-1">
              {item.preview}
            </p>
          </div>
        ))}
      </div>

      <button className="mt-3 text-xs sm:text-sm text-primary hover:underline w-full text-center cursor-pointer">
        View all announcements →
      </button>
    </div>
  );
}
