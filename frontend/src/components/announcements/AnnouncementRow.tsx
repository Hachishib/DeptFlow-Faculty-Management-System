import { Pin, Eye, Pencil, Trash2, Paperclip } from "lucide-react";
import type { Announcement } from "../../types/announcement";
import { TAG_STYLES, formatDateShort } from "../../utils/announcementHelper";

type Props = {
  item: Announcement;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
  isAdmin?: boolean;
};

export default function AnnouncementRow({
  item,
  onView,
  onEdit,
  onDelete,
  onTogglePin,
  isAdmin,
}: Props) {
  const { badge, border, icon } = TAG_STYLES[item.tag];

  return (
    <div
      className={`group bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden ${
        item.pinned ? `border-l-[3px] ${border}` : ""
      }`}
    >
      <div className="flex items-start gap-4 p-5">
        {/* Tag icon bubble */}
        <div
          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5 ${badge}`}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {item.pinned && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                <Pin size={9} fill="currentColor" /> Pinned
              </span>
            )}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge}`}
            >
              {item.tag}
            </span>
            <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {item.audience}
            </span>
          </div>

          <p className="text-sm font-bold text-gray-800 leading-snug">
            {item.title}
          </p>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {item.body}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] text-gray-400 font-medium">
              {item.author}
            </span>
            <span className="text-gray-200">·</span>
            <span className="text-[11px] text-gray-400">
              {formatDateShort(item.date)}
            </span>
          </div>

          {/* Attachment */}
          {item.attachment && (
            <div className="flex items-center gap-2 mt-3 p-2.5 bg-blue-50 border border-blue-200 rounded-lg">
              <Paperclip size={13} className="text-blue-600 shrink-0" />
              <span className="text-xs font-medium text-blue-700 flex-1 truncate">
                {item.attachment.fileName}
              </span>
              <a
                href={item.attachment.url}
                download={item.attachment.fileName}
                className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium shrink-0 px-2 py-1"
              >
                Download
              </a>
            </div>
          )}
        </div>

        {/* Action buttons */}
        {isAdmin && (
          <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button
              onClick={onTogglePin}
              title={item.pinned ? "Unpin" : "Pin"}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                item.pinned
                  ? "text-amber-400 bg-amber-50 hover:bg-amber-100"
                  : "text-gray-300 hover:text-amber-400 hover:bg-amber-50"
              }`}
            >
              <Pin size={14} fill={item.pinned ? "currentColor" : "none"} />
            </button>
            <button
              onClick={onView}
              className="p-2 rounded-lg text-gray-300 hover:text-[#880000] hover:bg-[#FEF2F2] transition-colors cursor-pointer"
            >
              <Eye size={14} />
            </button>
            <button
              onClick={onEdit}
              className="p-2 rounded-lg text-gray-300 hover:text-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
        {!isAdmin && (
          <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button
              onClick={onView}
              className="p-2 rounded-lg text-gray-300 hover:text-[#880000] hover:bg-[#FEF2F2] transition-colors cursor-pointer"
            >
              <Eye size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
