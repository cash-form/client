import Image from "next/image";

interface SurveyDetailHeaderProps {
  title: string;
  credit: number;
  participantCount: number;
  startDate: string;
  endDate: string;
  header: {
    id: number;
    type: number;
    text: string;
    images: string[];
  };
}

export default function SurveyDetailHeader({
  title,
  credit,
  participantCount,
  startDate,
  endDate,
  header,
}: SurveyDetailHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            💰 리워드: {credit}원
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
            👥 참여자: {participantCount}명
          </span>
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
            📅 {formatDate(startDate)} ~ {formatDate(endDate)}
          </span>
        </div>
      </div>

      {header?.text && (
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">{header.text}</p>
        </div>
      )}

      {header?.images && header.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {header?.images?.map((imageUrl, index) => (
            <div
              key={index}
              className="relative h-48 rounded-lg overflow-hidden bg-gray-100"
            >
              <Image
                src={imageUrl}
                alt={`Header image ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
