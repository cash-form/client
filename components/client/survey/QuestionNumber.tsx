interface QuestionNumberProps {
  number: number;
  isDragging?: boolean;
}

export default function QuestionNumber({
  number,
  isDragging,
}: QuestionNumberProps) {
  return (
    <div
      className={`
        flex items-center justify-center
        w-8 h-8 rounded-full 
        ${isDragging ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}
        font-semibold text-sm
        transition-colors
      `}
    >
      Q{number}
    </div>
  );
}
