import { useState, useEffect } from "react";
import { getFormattedDateTime } from "../../utils/dateTime";

type DashboardHeaderProps = {
  name: string;
  role: string;
  department: string;
  semester: string;
};

export default function DashboardHeader({
  name,
  role,
  department,
  semester,
}: DashboardHeaderProps) {
  const [dateTime, setDateTime] = useState(getFormattedDateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
          Good Day, {name}
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-snug">
          <span className="block sm:inline">{role}</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline">{department}</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline">{semester}</span>
        </p>
      </div>

      <div className="text-left sm:text-right shrink-0">
        <p className="text-xs sm:text-sm text-gray-500">{dateTime.date}</p>
        <p className="text-lg sm:text-xl font-bold text-primary">
          {dateTime.time}
        </p>
      </div>
    </div>
  );
}
