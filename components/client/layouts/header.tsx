"use client";

import Linker from "components/common/link/linker";
import { PageUrlConfig } from "src/config/page.config";
import ClientMenu from "components/client/layouts/menu";
import { useState, useCallback, useEffect, Suspense } from "react";
import Modal from "components/common/modal/modal";
import LoginForm from "components/client/layouts/loginForm";
import { useSearchParams } from "next/navigation";
import { useUserMe } from "hooks/useUserMe";
import { useAuthStore } from "src/store/authStore";

export default function Header() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderContent />
    </Suspense>
  );
}

function HeaderContent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const { user, loading } = useUserMe();

  useEffect(() => {
    if (searchParams.get("login") === "1") {
      setIsLoginModalOpen(true);
    }
  }, [searchParams]);

  const handleOpenLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const handleCloseLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  const handleToggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <header className="z-30 fixed w-full h-14 flex items-center justify-between px-4 border-b border-gray-300 bg-white">
        <div className="flex items-center justify-start gap-16">
          <Linker
            href={PageUrlConfig.HOME}
            className="w-fit h-fit flex gap-3 items-center hover:opacity-80 transition-opacity duration-100 ease-in-out delay-0"
          >
            <img
              src="/logos/cash_form_icon.svg"
              alt="cash form logo"
              className="w-8 h-8 object-contain "
            />
            <h1 className="text-xl font-bold min-w-28 whitespace-nowrap">
              CASH FORM
            </h1>
          </Linker>
          {/* 데스크톱  메뉴 */}
          <div className="hidden md:block">
            <ClientMenu isMobile={false} />
          </div>
        </div>

        <div className="w-fit h-full flex items-center justify-end gap-4 py-3">
          {loading ? null : user ? (
            <>
              {/* <span className="mr-2 font-bold text-primary">
                {user.nickname}님
              </span> */}
              <button
                className="w-20 h-full flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-100 ease-in-out delay-0 text-lg text-primary font-bold"
                onClick={() => {
                  useAuthStore.getState().clearTokens();
                  location.reload();
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <span
              className="w-20 h-full flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-100 ease-in-out delay-0"
              onClick={handleOpenLoginModal}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleOpenLoginModal();
                }
              }}
              tabIndex={0}
            >
              <p className="text-lg text-primary font-bold">로그인</p>
            </span>
          )}

          {/* 모바일, 태블릿 햄버거 버튼*/}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer"
            onClick={handleToggleMobileMenu}
          >
            <span
              className={`block h-0.5 w-6 bg-gray-700 transition-transform duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-gray-700 mt-1 transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-gray-700 mt-1 transition-transform duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed top-14 left-0 w-full bg-white border-b border-gray-300 shadow-lg z-20 overflow-y-auto"
          onClick={handleToggleMobileMenu}
        >
          <div className=" p-4 flex-col ">
            <ClientMenu isMobile={true} />
          </div>
        </div>
      )}

      {/* 모바일 메뉴 배경 오버레이 */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-10 top-14"
          onClick={handleToggleMobileMenu}
        />
      )}

      <Modal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        size="md"
      >
        <LoginForm onClose={handleCloseLoginModal} />
      </Modal>
    </>
  );
}
