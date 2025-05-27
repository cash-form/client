import { useEffect, useCallback, memo, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode, MouseEvent } from "react";
import { MODAL_SIZE_CLASSES } from "src/config/constants";

/**

 *
 * @param isOpen 
 * @param onClose 
 * @param title
 * @param size - 모달 크기 ('sm', 'md', 'lg', 'xl')
 * @param hasCloseButton 
 * @param isClosableByBackdrop
 * @param children 
 *
 */

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  hasCloseButton?: boolean;
  children: ReactNode;
}

function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  hasCloseButton = true,
  children,
}: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleCloseButtonClick = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  if (!isOpen || !isMounted) {
    return null;
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleBackdropClick}
    >
      <div
        className={`
          relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden
          ${MODAL_SIZE_CLASSES[size]}
          w-full mx-2 md:mx-6 xl:mx-8
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {hasCloseButton && (
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full"
            onClick={handleCloseButtonClick}
          >
            <span className="text-2xl">&times;</span>
          </button>
        )}

        {/* 모달 본문 */}
        <div className="p-3 md:p-5 xl:p-6 overflow-y-auto max-h-[calc(90vh-3rem)] md:max-h-[calc(90vh-5rem)] xl:max-h-[calc(90vh-6rem)]">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default memo(Modal);
