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
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold ">Good Day, {name}</h1>
        <p className="text-sm text-gray-400 mt-1">
          {role} · {department} · {semester}
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm ">{dateTime.date}</p>
        <p className="text-xl font-bold text-primary">{dateTime.time}</p>
      </div>
    </div>
  );
}
