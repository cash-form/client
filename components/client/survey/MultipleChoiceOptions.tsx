import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

interface MultipleChoiceOptionsProps {
  options: string[];
  multipleCount: number;
  onChange: (updates: { options?: string[]; multipleCount?: number }) => void;
}

export default function MultipleChoiceOptions({
  options,
  multipleCount,
  onChange,
}: MultipleChoiceOptionsProps) {
  const handleOptionChange = (index: number, value: string) => {
    if (value.length > 8) {
      Swal.fire({
        title: "항목은 8자를 초과할 수 없습니다.",
        icon: "error",
      });
      return;
    }

    const newOptions = [...options];
    newOptions[index] = value;
    onChange({ options: newOptions });
  };

  const addOption = () => {
    if (options.length >= 6) {
      Swal.fire({
        title: "최대 6개까지만 추가할 수 있습니다.",
        icon: "error",
      });
      return;
    }
    onChange({ options: [...options, ""] });
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) {
      Swal.fire({
        title: "최소 2개의 항목이 필요합니다.",
        icon: "error",
      });
      return;
    }
    const newOptions = options.filter((_: string, i: number) => i !== index);
    onChange({ options: newOptions });
  };

  // 선택 가능한 개수 옵션 생성
  const renderSelectionOptions = () => {
    const selectionOptions = [];
    // options 배열의 길이만큼 선택 옵션 생성 (1부터 시작)
    for (let count = 1; count <= options.length; count++) {
      selectionOptions.push(
        <option key={count} value={count}>
          {count}개 선택
        </option>
      );
    }
    return selectionOptions;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 mb-2">
        <label className="text-sm font-medium">복수 선택</label>
        <select
          value={multipleCount}
          onChange={(e) => onChange({ multipleCount: Number(e.target.value) })}
          className="border rounded-lg p-2"
        >
          {renderSelectionOptions()}
        </select>
      </div>

      {/* 옵션 입력 필드 목록 */}
      <div className="space-y-2">
        {options.map((option: string, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`항목 ${index + 1}`}
              className="flex-1 p-2 border rounded-lg"
              maxLength={8}
            />
            <button
              onClick={() => removeOption(index)}
              className="text-warning hover:text-warning/80 p-2"
              type="button"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        ))}
      </div>

      {/* 옵션 추가 버튼 */}
      {options.length < 6 && (
        <button
          onClick={addOption}
          className="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1"
          type="button"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>항목 추가</span>
        </button>
      )}
    </div>
  );
}
