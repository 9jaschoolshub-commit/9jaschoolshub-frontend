import { UserButton } from "@clerk/clerk-react";

const AdminHeader = ({ actionType, setActionType, resetForm }) => {
  const actionTypes = [
    { option: "add", label: "Add University" },
    { option: "update", label: "Update University" },
    { option: "delete", label: "Delete University" },
  ];

  return (
    <div className="flex justify-around items-center mb-6">
      <div className="flex items-center gap-1 md:gap-4">
        <h1 className="text-xl md:text-3xl font-bold capitalize">{actionType} University</h1>
        <select
          name="actionType"
          id="actionType"
          value={actionType}
          onChange={(e) => {
            setActionType(e.target.value);
            resetForm(); // Reset form when action type changes
          }}
          className="mt-1 px-1 py-1 md:px-3 md:py-2 border border-gray-300 rounded-lg cursor-pointer capitalize"
        >
          {actionTypes.map((act) => (
            <option key={act.option} value={act.option}>
              {act.label}
            </option>
          ))}
        </select>
      </div>
      <UserButton />
    </div>
  );
};

export default AdminHeader;
