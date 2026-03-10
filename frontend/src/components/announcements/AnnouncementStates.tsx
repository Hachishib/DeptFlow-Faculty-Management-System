import { Megaphone } from "lucide-react";

export function AnnouncementSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
      <div className="flex gap-4">
        <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0" />
        <div className="flex-1 space-y-2.5">
          <div className="h-2.5 bg-gray-100 rounded w-1/4" />
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-2/3" />
          <div className="h-2.5 bg-gray-100 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}

export function AnnouncementSkeletonList({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <AnnouncementSkeleton key={i} />
      ))}
    </div>
  );
}

type EmptyStateProps = {
  hasFilters: boolean;
};

export function AnnouncementEmptyState({ hasFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100">
      <div className="bg-gray-50 p-4 rounded-full mb-4">
        <Megaphone size={28} className="text-gray-300" />
      </div>
      <p className="text-sm font-semibold text-gray-500">
        No announcements found
      </p>
      <p className="text-xs text-gray-400 mt-1">
        {hasFilters
          ? "Try adjusting your search or filters"
          : "Post the first announcement using the button above"}
      </p>
    </div>
  );
}
