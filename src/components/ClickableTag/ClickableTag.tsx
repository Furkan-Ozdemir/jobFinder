import { useState } from "react";
import "./index.scss";

interface ClickableTagProps {
  label: string;
  value: string;
  onClick: (value: string) => void;
}

export default function ClickableTag({
  label,
  value,
  onClick,
}: ClickableTagProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick(value);
  };

  return (
    <div
      className={`clickable-tag ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {label}
    </div>
  );
}
