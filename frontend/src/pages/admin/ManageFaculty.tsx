import { useState } from "react";
import { Users, Plus, Search, X, Filter } from "lucide-react";

import FacultyRow, { FacultyRowSkeleton } from "../../components/faculty/FacultyRow";
import AddFacultyModal from "../../components/faculty/AddFacultyModal";
import FacultyProfileModal from "../../components/faculty/FacultyProfileModal";

import FacultyMock from "../../mock/faculty.json";

import type {
  FacultyMember,
  AddFacultyDTO,
  EmploymentType,
} from "../../types/faculty";

// ── Props ─────────────────────────────────────────────────
type Props = {
  faculty?: FacultyMember[];
  isLoading?: boolean;
  onAdd?: (dto: AddFacultyDTO) => Promise<void> | void;
  onDelete?: (id: string) => Promise<void> | void;
  onUpdateEmployment?: (id: string, t: EmploymentType) => Promise<void> | void;
};

type TypeFilter = "All" | EmploymentType;

// ── MOCK DATA ─────────────────────────────────────────────
const MOCK: FacultyMember[] = FacultyMock as FacultyMember[];

// ── COMPONENT ─────────────────────────────────────────────
export default function ManageFacultyPage({
  faculty: propData,
  isLoading = false,
  onAdd,
  onDelete,
  onUpdateEmployment,
}: Props) {
  const [local, setLocal] = useState<FacultyMember[]>(MOCK);
  const data = propData ?? local;

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [showAdd, setShowAdd] = useState(false);
  const [viewing, setViewing] = useState<FacultyMember | null>(null);

  // ── Handlers ───────────────────────────────────────────
  async function handleAdd(dto: AddFacultyDTO) {
    if (onAdd) {
      await onAdd(dto);
      return;
    }
    setLocal((p) => [
      {
        id: Date.now().toString(),
        personal: { ...dto, phone: "", status: "Active" },
        education: [],
        credentials: [],
        research: [],
        schedule: [],
      },
      ...p,
    ]);
  }

  async function handleDelete(id: string) {
    if (onDelete) {
      await onDelete(id);
    } else {
      setLocal((p) => p.filter((f) => f.id !== id));
    }
    setViewing(null);
  }

  async function handleChangeEmployment(id: string, type: EmploymentType) {
    if (onUpdateEmployment) {
      await onUpdateEmployment(id, type);
    } else {
      setLocal((p) =>
        p.map((f) =>
          f.id === id
            ? { ...f, personal: { ...f.personal, employmentType: type } }
            : f,
        ),
      );
    }
    setViewing((v) =>
      v?.id === id
        ? { ...v, personal: { ...v.personal, employmentType: type } }
        : v,
    );
  }

  // ── Filter + sort ──────────────────────────────────────
  const filtered = data
    .filter(
      (f) => typeFilter === "All" || f.personal.employmentType === typeFilter,
    )
    .filter((f) => {
      const q = search.toLowerCase();
      return (
        `${f.personal.firstName} ${f.personal.lastName}`
          .toLowerCase()
          .includes(q) ||
        f.personal.email.toLowerCase().includes(q) ||
        f.personal.employeeId.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => a.personal.lastName.localeCompare(b.personal.lastName));

  // ── Stats ──────────────────────────────────────────────
  const fullTimeCount = data.filter(
    (f) => f.personal.employmentType === "Full-time",
  ).length;
  const partTimeCount = data.filter(
    (f) => f.personal.employmentType === "Part-time",
  ).length;

  // ── Render ─────────────────────────────────────────────
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 font-lexend max-w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Manage Faculty
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Add accounts and view faculty profiles
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#880000] text-white text-sm font-semibold hover:bg-[#6B0000] transition-colors cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus size={15} /> Add Faculty
        </button>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total Faculty",
            value: data.length,
            color: "border-t-[#880000]",
            text: "text-[#880000]",
          },
          {
            label: "Full-time",
            value: fullTimeCount,
            color: "border-t-blue-400",
            text: "text-blue-600",
          },
          {
            label: "Part-time",
            value: partTimeCount,
            color: "border-t-amber-400",
            text: "text-amber-600",
          },
        ].map(({ label, value, color, text }) => (
          <div
            key={label}
            className={`bg-white rounded-xl shadow-sm p-4 border-t-[3px] ${color}`}
          >
            <p className={`text-2xl font-bold leading-none ${text}`}>{value}</p>
            <p className="text-[10px] text-gray-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or employee ID..."
            className="w-full pl-10 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#880000] transition-colors bg-white"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shrink-0">
          <Filter size={13} className="text-gray-400 ml-1.5 shrink-0" />
          {(["All", "Full-time", "Part-time"] as TypeFilter[]).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                typeFilter === t
                  ? "bg-[#FEF2F2] text-[#880000]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {!isLoading && (
        <p className="text-xs text-gray-400 -mt-2">
          Showing{" "}
          <span className="font-semibold text-gray-600">{filtered.length}</span>{" "}
          of <span className="font-semibold text-gray-600">{data.length}</span>{" "}
          faculty members
        </p>
      )}

      {/* List */}
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <FacultyRowSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100">
          <div className="bg-gray-50 p-4 rounded-full mb-4">
            <Users size={28} className="text-gray-300" />
          </div>
          <p className="text-sm font-semibold text-gray-500">
            No faculty found
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {search || typeFilter !== "All"
              ? "Try adjusting your filters"
              : "Add the first faculty member above"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((m) => (
            <FacultyRow
              key={m.id}
              member={m}
              onView={() => setViewing(m)}
              onDelete={() => handleDelete(m.id)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showAdd && (
        <AddFacultyModal
          onClose={() => setShowAdd(false)}
          onSubmit={handleAdd}
        />
      )}
      {viewing && (
        <FacultyProfileModal
          member={viewing}
          onClose={() => setViewing(null)}
          onDelete={() => handleDelete(viewing.id)}
          onChangeEmployment={(t) => handleChangeEmployment(viewing.id, t)}
        />
      )}
    </div>
  );
}
