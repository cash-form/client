import { questionTypes } from "src/config/survey.config";

export default function SelectType() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
      <div className=" rounded-lg shadow-sm border p-4">
        <h3 className="font-semibold mb-3 font-foreground">질문 타입</h3>
        <div className="space-y-2 ">
          {questionTypes.map((type) => (
            <button
              key={type.type}
              className="w-full flex items-center gap-3 p-3 border rounded-lg hover:text-primary cursor-pointer "
              type="button"
            >
              <span className="text-lg">{type.icon}</span>
              <span className="text-sm font-medium">{type.name}</span>
              <span className="ml-auto text-gray-400">+</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
