"use client";

import Linker from "components/common/link/linker";
import { usePathname } from "next/navigation";
import { PageUrlConfig } from "src/config/page.config";

export default function ClientMenu() {
  const pathname = usePathname();
  const menuList = [
    { name: "공지사항", path: PageUrlConfig.NOTICE },
    { name: "설문", path: PageUrlConfig.SURVEYS },
    { name: "고객지원", path: PageUrlConfig.SUPPORT },
  ];

  return (
    <ul className="h-full flex items-center gap-6 font-semibold">
      {menuList.map((menu) => {
        const isActive = pathname === menu.path;

        return (
          <li
            key={`menu_${menu.name}`}
            className="h-full hover:opacity-70 transition-opacity duration-100 ease-in-out relative will-change-auto delay-0"
          >
            <Linker
              href={menu.path}
              className="h-full flex items-center justify-center"
            >
              <p
                className={`text-lg font-semibold transition-all duration-200 ease-in-out relative will-change-auto ${
                  isActive ? "border-b-2 border-primary text-primary" : ""
                }`}
              >
                {menu.name}
              </p>
            </Linker>
          </li>
        );
      })}
    </ul>
  );
}
