export default function FeatureItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground/50">{label}</div>
        <div className="text-sm text-foreground/80 break-words">{value}</div>
      </div>
    </div>
  );
}
