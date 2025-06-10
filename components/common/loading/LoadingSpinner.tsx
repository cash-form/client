interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-4",
  lg: "w-10 h-10 border-4",
};

export default function Spinner({
  size = "md",
  color = "text-primary",
  className = "",
}: SpinnerProps) {
  const sizeClass = sizeMap[size];

  return (
    <div
      role="status"
      aria-label="로딩 중"
      className={`inline-block ${sizeClass} ${color} border-t-transparent rounded-full animate-spin ${className}`}
    />
  );
}
