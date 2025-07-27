import Image from "next/image";

interface SurveyDetailFooterProps {
  footer: {
    id: number;
    type: number;
    text: string;
    images: string[];
  };
}

export default function SurveyDetailFooter({
  footer,
}: SurveyDetailFooterProps) {
  if (!footer?.text && (!footer?.images || footer.images.length === 0)) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      {footer?.text && (
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed text-center">
            {footer.text}
          </p>
        </div>
      )}

      {footer?.images && footer.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {footer?.images?.map((imageUrl, index) => (
            <div
              key={index}
              className="relative h-48 rounded-lg overflow-hidden bg-gray-100"
            >
              <Image
                src={imageUrl}
                alt={`Footer image ${index + 1}`}
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
