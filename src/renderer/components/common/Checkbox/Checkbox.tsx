// libraries
import React from "react";

const Checkbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <label
      style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13 }}
    >
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

export default Checkbox;
