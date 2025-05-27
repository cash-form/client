import React from "react";

interface CommonCheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  label?: React.ReactNode;
  className?: string;
}

const CommonCheckbox: React.FC<CommonCheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  className = "",
}) => (
  <div className="flex items-center">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={className}
    />
    {label && (
      <label
        htmlFor={id}
        className="ml-2 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
    )}
  </div>
);

export default CommonCheckbox;
