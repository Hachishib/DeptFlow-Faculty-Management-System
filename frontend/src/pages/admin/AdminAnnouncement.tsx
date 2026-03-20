
import { useState } from "react";
import { Plus } from "lucide-react";

import type {
  Announcement,
  AnnouncementFilters,
  CreateAnnouncementDTO,
  UpdateAnnouncementDTO,
} from "../../types/announcement";

import AnnouncementFiltersBar from "../../components/announcements/AnnouncementFilterBar";
import AnnouncementRow from "../../components/announcements/AnnouncementRow";
import AnnouncementFormModal from "../../components/announcements/AnnouncementFormModal";
import AnnouncementViewModal from "../../components/announcements/AnnouncementViewModal";
import {
  AnnouncementSkeletonList,
  AnnouncementEmptyState,
} from "../../components/announcements/AnnouncementStates";

import AnnouncementMock from "../../mock/announcementData.json"

const MOCK: Announcement[] = AnnouncementMock as Announcement[];

const DEFAULT_FILTERS: AnnouncementFilters = {
  search: "",
  tag: "All",
  dateFrom: "",
  dateTo: "",
};

type Props = {
  announcements?: Announcement[];
  currentUser?: string;
  isAdmin?: boolean;
  isLoading?: boolean;
  onPost?: (dto: CreateAnnouncementDTO) => Promise<void> | void;
  onEdit?: (id: string, dto: UpdateAnnouncementDTO) => Promise<void> | void;
  onDelete?: (id: string) => Promise<void> | void;
  onPin?: (id: string, pinned: boolean) => Promise<void> | void;
};

export default function AnnouncementsPage({
  announcements: propData,
  currentUser = "Dan Bringas",
  isAdmin = true,
  isLoading = false,
  onPost,
  onEdit,
  onDelete,
  onPin,
}: Props) {

  const [local, setLocal] = useState<Announcement[]>(MOCK);
  const data = propData ?? local;

  const [filters, setFilters] = useState<AnnouncementFilters>(DEFAULT_FILTERS);
  const [showPost, setShowPost] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [viewing, setViewing] = useState<Announcement | null>(null);

  async function handlePost(dto: CreateAnnouncementDTO) {
    if (onPost) {
      await onPost(dto);
    } else {
      setLocal((prev) => [
        {
          ...dto,
          id: Date.now().toString(),
          date: new Date().toISOString().split("T")[0],
        },
        ...prev,
      ]);
    }
  }

  async function handleEdit(dto: CreateAnnouncementDTO) {
    if (!editing) return;
    if (onEdit) {
      await onEdit(editing.id, dto);
    } else {
      setLocal((prev) =>
        prev.map((a) => (a.id === editing.id ? { ...a, ...dto } : a)),
      );
    }
  }

  async function handleDelete(id: string) {
    if (onDelete) {
      await onDelete(id);
    } else {
      setLocal((prev) => prev.filter((a) => a.id !== id));
    }
  }

  async function handleTogglePin(id: string) {
    const item = data.find((a) => a.id === id);
    if (!item) return;
    if (onPin) {
      await onPin(id, !item.pinned);
    } else {
      setLocal((prev) =>
        prev.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a)),
      );
    }
  }

  const filtered = data
    .filter((a) => filters.tag === "All" || a.tag === filters.tag)
    .filter(
      (a) =>
        a.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        a.body.toLowerCase().includes(filters.search.toLowerCase()),
    )
    .filter((a) => !filters.dateFrom || a.date >= filters.dateFrom)
    .filter((a) => !filters.dateTo || a.date <= filters.dateTo)
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const hasActiveFilters =
    !!filters.search ||
    filters.tag !== "All" ||
    !!filters.dateFrom ||
    !!filters.dateTo;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 font-lexend max-w-full mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Announcements
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Post and manage department-wide announcements
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowPost(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#880000] text-white text-sm font-semibold hover:bg-[#6B0000] transition-colors cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Plus size={15} /> Post Announcement
          </button>
        )}
      </div>

      {/* Filters */}
      <AnnouncementFiltersBar
        filters={filters}
        onChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
        onClearAll={() => setFilters(DEFAULT_FILTERS)}
      />

      {/* Results count */}
      {!isLoading && (
        <p className="text-xs text-gray-400 -mt-2">
          Showing{" "}
          <span className="font-semibold text-gray-600">{filtered.length}</span>{" "}
          announcement{filtered.length !== 1 ? "s" : ""}
          {filters.tag !== "All" && (
            <>
              {" "}
              · tagged{" "}
              <span className="font-semibold text-gray-600">{filters.tag}</span>
            </>
          )}
          {filters.dateFrom && (
            <>
              {" "}
              · from{" "}
              <span className="font-semibold text-gray-600">
                {filters.dateFrom}
              </span>
            </>
          )}
          {filters.dateTo && (
            <>
              {" "}
              · to{" "}
              <span className="font-semibold text-gray-600">
                {filters.dateTo}
              </span>
            </>
          )}
        </p>
      )}

      {/* List */}
      {isLoading ? (
        <AnnouncementSkeletonList count={4} />
      ) : filtered.length === 0 ? (
        <AnnouncementEmptyState hasFilters={hasActiveFilters} />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item) => (
            <AnnouncementRow
              key={item.id}
              item={item}
              isAdmin={isAdmin}
              onView={() => setViewing(item)}
              onEdit={() => setEditing(item)}
              onDelete={() => handleDelete(item.id)}
              onTogglePin={() => handleTogglePin(item.id)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showPost && (
        <AnnouncementFormModal
          initial={{ author: currentUser }}
          onClose={() => setShowPost(false)}
          onSubmit={handlePost}
        />
      )}
      {editing && (
        <AnnouncementFormModal
          initial={editing}
          onClose={() => setEditing(null)}
          onSubmit={handleEdit}
        />
      )}
      {viewing && (
        <AnnouncementViewModal
          item={viewing}
          onClose={() => setViewing(null)}
        />
      )}
    </div>
  );
}
