import React from "react";

interface CommonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={className}
  >
    {children}
  </button>
);

export default CommonButton;
