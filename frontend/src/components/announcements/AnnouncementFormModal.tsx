import { useState } from "react";
import { Megaphone, Pin, X, ChevronDown } from "lucide-react";
import type {
  Announcement,
  CreateAnnouncementDTO,
  AnnouncementTag,
  AnnouncementAudience,
} from "../../types/announcement";
import {
  TAG_STYLES,
  AUDIENCE_OPTIONS,
} from "../../utils/announcementHelper";

type Props = {
  initial?: Partial<Announcement>;
  onClose: () => void;
  onSubmit: (data: CreateAnnouncementDTO) => void;
};

export default function AnnouncementFormModal({
  initial,
  onClose,
  onSubmit,
}: Props) {
  const isEdit = !!initial?.id;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [audience, setAudience] = useState<AnnouncementAudience>(
    initial?.audience ?? "All Faculty",
  );
  const [tag, setTag] = useState<AnnouncementTag>(initial?.tag ?? "General");
  const [pinned, setPinned] = useState(initial?.pinned ?? false);

  const isValid = title.trim().length > 0 && body.trim().length > 0;

  function handleSubmit() {
    if (!isValid) return;
    onSubmit({
      title: title.trim(),
      body: body.trim(),
      audience,
      tag,
      pinned,
      author: initial?.author ?? "",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFF3F3] p-2 rounded-full">
              <Megaphone size={15} className="text-[#880000]" />
            </div>
            <p className="text-sm font-bold text-gray-800">
              {isEdit ? "Edit Announcement" : "New Announcement"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title..."
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#880000] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Message
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your announcement here..."
              rows={5}
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#880000] transition-colors resize-none leading-relaxed"
            />
            <p className="text-[10px] text-gray-300 text-right">
              {body.length} characters
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Audience */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Audience
              </label>
              <div className="relative">
                <select
                  value={audience}
                  onChange={(e) =>
                    setAudience(e.target.value as AnnouncementAudience)
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#880000] transition-colors appearance-none cursor-pointer bg-white"
                >
                  {AUDIENCE_OPTIONS.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Tag */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Tag
              </label>
              <div className="relative">
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value as AnnouncementTag)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#880000] transition-colors appearance-none cursor-pointer bg-white"
                >
                  {(Object.keys(TAG_STYLES) as AnnouncementTag[]).map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Pin toggle */}
          <button
            onClick={() => setPinned((p) => !p)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer w-full justify-center ${
              pinned
                ? "bg-amber-50 border-amber-300 text-amber-700"
                : "border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500"
            }`}
          >
            <Pin size={13} fill={pinned ? "currentColor" : "none"} />
            {pinned
              ? "Pinned — will appear at the top"
              : "Pin this announcement"}
          </button>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="flex-1 py-2.5 rounded-lg bg-[#880000] text-white text-sm font-semibold hover:bg-[#6B0000] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isEdit ? "Save Changes" : "Post Announcement"}
          </button>
        </div>
      </div>
    </div>
  );
}
