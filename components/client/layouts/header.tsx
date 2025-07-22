"use client";

import Linker from "components/common/link/linker";
import { PageUrlConfig } from "src/config/page.config";
import ClientMenu from "components/client/layouts/menu";
import { useState, useCallback, useEffect, Suspense } from "react";
import Modal from "components/common/modal/modal";
import LoginForm from "components/client/form/loginForm";
import { useSearchParams } from "next/navigation";
import { useLoginModalStore } from "src/stores/useLoginModalStore";
import { useMe } from "src/lib/queries/user";
import { logout } from "src/lib/api/auth.utility";

export default function Header() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderContent />
    </Suspense>
  );
}

function HeaderContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const { isOpen, openModal, closeModal } = useLoginModalStore();
  const { data: user } = useMe();

  useEffect(() => {
    if (searchParams.get("login") === "1") {
      openModal();
    }
  }, [searchParams, openModal]);

  const handleToggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <header className="z-30 fixed w-full h-14 flex items-center justify-between px-4 border-b border-border bg-background">
        <div className="flex items-center justify-start gap-16 text-foreground">
          <Linker
            href={PageUrlConfig.HOME}
            className="w-fit h-fit flex gap-3 items-center hover:opacity-80 transition-opacity duration-100 ease-in-out delay-0"
          >
            <img
              src="/logos/cash_form_icon.svg"
              alt="cash form logo"
              className="w-8 h-8 object-contain "
            />
            <h1 className="text-xl font-bold min-w-28 whitespace-nowrap m-0">
              CASH FORM
            </h1>
          </Linker>
          {/* 데스크톱  메뉴 */}
          <div className="hidden md:block">
            <ClientMenu isMobile={false} />
          </div>
        </div>

        <div className="w-fit h-full flex items-center justify-end gap-4 py-3">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground/80 hidden sm:inline">
                {user.nickname}님
              </span>
              <span
                className="w-20 h-full flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-100 ease-in-out delay-0"
                tabIndex={0}
                onClick={logout}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    logout();
                  }
                }}
                role="button"
                aria-label="로그아웃"
              >
                <p className="text-lg text-primary font-bold m-0">로그아웃</p>
              </span>
            </div>
          ) : (
            <span
              className="w-20 h-full flex items-center justify-center  cursor-pointer hover:opacity-70 transition-opacity duration-100 ease-in-out delay-0"
              onClick={openModal}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openModal();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="로그인"
            >
              <p className="text-lg text-primary font-bold m-0">로그인</p>
            </span>
          )}

          {/* 모바일, 태블릿 햄버거 버튼*/}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer"
            onClick={handleToggleMobileMenu}
            aria-label="모바일 메뉴 열기"
            type="button"
          >
            <span
              className={`block h-0.5 w-6 bg-foreground transition-transform duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground mt-1 transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground mt-1 transition-transform duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed top-14 left-0 w-full bg-background border-b border-border shadow-lg z-20 overflow-y-auto"
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

      <Modal isOpen={isOpen} onClose={closeModal} size="md">
        <LoginForm onClose={closeModal} />
      </Modal>
    </>
  );
}
