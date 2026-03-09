import type { ScheduleEntry } from "../../types/schedule";
import { TIME_SLOTS, timeToIndex, getSlotSpan, isHourSlot } from "../../utils/scheduleHelper";
import { SCHEDULE_COLORS } from "../../utils/scheduleHelper";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SLOT_H = 40;

export default function TimetableView({
  schedule,
}: {
  schedule: ScheduleEntry[];
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px]">
        <div
          className="grid gap-1 mb-2"
          style={{ gridTemplateColumns: "72px repeat(6, 1fr)" }}
        >
          <div />
          {DAYS_SHORT.map((day, i) => (
            <div
              key={i}
              className="text-center text-xs font-bold text-gray-600 uppercase tracking-wide py-2.5 bg-gray-50 rounded-lg"
            >
              {day}
            </div>
          ))}
        </div>

        <div
          className="relative grid gap-px"
          style={{ gridTemplateColumns: "72px repeat(6, 1fr)" }}
        >
          <div className="flex flex-col">
            {TIME_SLOTS.map((time, i) => (
              <div
                key={i}
                style={{ height: `${SLOT_H}px` }}
                className="flex items-start pt-1 pr-3 justify-end"
              >
                {isHourSlot(time) ? (
                  <span className="text-[11px] text-gray-500 font-semibold whitespace-nowrap leading-none">
                    {time}
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-300 whitespace-nowrap leading-none">
                    {time}
                  </span>
                )}
              </div>
            ))}
          </div>

          {DAYS.map((day) => (
            <div key={day} className="relative flex flex-col">
              {TIME_SLOTS.map((time, i) => (
                <div
                  key={i}
                  style={{ height: `${SLOT_H}px` }}
                  className={`border-b ${isHourSlot(time) ? "border-gray-200 bg-gray-50/50" : "border-dashed border-gray-100 bg-white"}`}
                />
              ))}

              {schedule
                .filter((entry) => entry.days.includes(day))
                .map((entry) => {
                  const topIndex = timeToIndex(entry.startTime);
                  const span = getSlotSpan(entry.startTime, entry.endTime);
                  if (topIndex === -1 || span <= 0) return null;

                  const blockHeight = span * SLOT_H - 4;
                  const isTall = blockHeight >= 80;
                  const isMedium = blockHeight >= 50;

                  return (
                    <div
                      key={entry.id}
                      className={`absolute left-1 right-1 rounded-lg border-l-[3px] px-2 py-1.5 overflow-hidden cursor-default shadow-sm ${SCHEDULE_COLORS[entry.color] ?? "bg-gray-100 border-gray-300 text-gray-800"}`}
                      style={{
                        top: `${topIndex * SLOT_H + 2}px`,
                        height: `${blockHeight}px`,
                      }}
                    >
                      <p className="text-[11px] font-extrabold leading-none truncate opacity-60 tracking-wide">
                        {entry.subjectCode}
                      </p>
                      <p className="text-xs font-bold leading-snug truncate mt-0.5">
                        {entry.subject}
                      </p>
                      {isMedium && (
                        <p className="text-[11px] leading-snug opacity-80 truncate mt-0.5">
                          {entry.section}
                        </p>
                      )}
                      {isTall && (
                        <p className="text-[11px] leading-snug opacity-70 truncate">
                          {entry.room}
                        </p>
                      )}
                      {isTall && (
                        <p className="text-[11px] leading-snug opacity-60 mt-0.5">
                          {entry.startTime} – {entry.endTime}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}