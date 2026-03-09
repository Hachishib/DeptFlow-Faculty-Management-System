import Field from "../ui/Field";
import SectionHeader from "../ui/SectionHeader";
import type { Personal } from "../../types/personal";

type PersonalTabProps = {
  personal: Personal;
  setPersonal: (value: Personal) => void;
  editing: boolean;
};

export default function PersonalTab({
  personal,
  setPersonal,
  editing,
}: PersonalTabProps) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Basic Information" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field
          label="First Name"
          value={personal.firstName}
          editing={editing}
          onChange={(v) => setPersonal({ ...personal, firstName: v })}
        />

        <Field
          label="Last Name"
          value={personal.lastName}
          editing={editing}
          onChange={(v) => setPersonal({ ...personal, lastName: v })}
        />

        <Field
          label="Email"
          value={personal.email}
          editing={editing}
          onChange={(v) => setPersonal({ ...personal, email: v })}
          type="email"
        />

        <Field
          label="Phone"
          value={personal.phone}
          editing={editing}
          onChange={(v) => setPersonal({ ...personal, phone: v })}
          type="tel"
        />
      </div>

      <SectionHeader title="Employment Details" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Employee ID"
          value={personal.employeeId}
          editing={editing}
          onChange={(v) => setPersonal({ ...personal, employeeId: v })}
        />

        <Field
          label="Designation"
          value={personal.designation}
          editing={editing}
          onChange={(v) => setPersonal({ ...personal, designation: v })}
        />

        <Field
          label="Employment Type"
          value={personal.employmentType}
          editing={editing}
          onChange={(v) => setPersonal({ ...personal, employmentType: v })}
        />

        <Field
          label="Date Hired"
          value={personal.dateHired}
          editing={editing}
          onChange={(v) => setPersonal({ ...personal, dateHired: v })}
          type="date"
        />
      </div>
    </div>
  );
}
