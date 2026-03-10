import { X, Pin, Users } from "lucide-react";
import type { Announcement } from "../../types/announcement";
import {
  TAG_STYLES,
  formatDateLong,
} from "../../utils/announcementHelper";

type Props = {
  item: Announcement;
  onClose: () => void;
};

export default function AnnouncementViewModal({ item, onClose }: Props) {
  const { badge, icon } = TAG_STYLES[item.tag];

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {item.pinned && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Pin size={9} fill="currentColor" /> Pinned
                  </span>
                )}
                <span
                  className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${badge}`}
                >
                  {icon} {item.tag}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  <Users size={9} /> {item.audience}
                </span>
              </div>

              <h2 className="text-base font-bold text-gray-800 leading-snug">
                {item.title}
              </h2>
              <p className="text-xs text-gray-400 mt-1.5">
                Posted by{" "}
                <span className="font-semibold text-gray-600">
                  {item.author}
                </span>
                {" · "}
                {formatDateLong(item.date)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer shrink-0 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {item.body}
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
