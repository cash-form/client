"use client";

import Linker from "components/common/link/linker";
import { usePathname } from "next/navigation";
import { MENU_TREE } from "src/config/constants";

interface ClientMenuProps {
  isMobile?: boolean;
  menuType?: "user" | "business"; // 메뉴 타입
}

export default function ClientMenu({
  isMobile = false,
  menuType = "business",
}: ClientMenuProps) {
  const pathname = usePathname();

  const isActivePath = (path?: string) => {
    if (!path) return false;
    return pathname === path || pathname.startsWith(path);
  };
  const renderMenuItem = (item: any, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = isActivePath(item.path);

    return (
      <li
        key={item.key}
        className={
          depth === 0 && hasChildren
            ? "relative group "
            : depth === 1 && hasChildren
            ? "relative group/submenu "
            : ""
        }
      >
        {item.path ? (
          <Linker
            href={item.path}
            className={`
              ${isMobile ? "block py-2 " : "flex items-center h-full px-4"}
              ${depth > 0 ? "pl-4" : ""}
              ${
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:text-blue-600"
              }
              transition-colors duration-200
              ${
                depth === 1 && hasChildren && !isMobile ? "justify-between" : ""
              }
              
            `}
          >
            {item.label}
            {/* 2단계 메뉴가 있는 경우 화살표 표시 */}
            {depth === 1 && hasChildren && !isMobile && (
              <span className="ml-2">▶</span>
            )}
          </Linker>
        ) : (
          <span
            className={`
              ${
                isMobile
                  ? "block py-2"
                  : "flex items-center h-full px-4 whitespace-nowrap"
              }
              ${depth > 0 ? "pl-4" : ""}
              ${hasChildren ? "cursor-default" : "text-gray-500"}
              ${
                depth === 1 && hasChildren && !isMobile ? "justify-between" : ""
              }
            `}
          >
            {item.label}
            {/* 한 depth가 더 있는 경우 화살표 표시 */}
            {depth === 1 && hasChildren && !isMobile && (
              <span className="ml-2">▶</span>
            )}
          </span>
        )}

        {/* 하위 메뉴가 있는 경우 */}
        {hasChildren && (
          <ul
            className={`
              ${
                isMobile
                  ? "ml-4 mt-2 space-y-2"
                  : depth === 0
                  ? "absolute top-full left-0 bg-white shadow-lg border rounded-md py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                  : "absolute top-0 left-full bg-white shadow-lg border rounded-md py-2 min-w-48 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 ml-1"
              }
            `}
          >
            {item.children.map((child: any) =>
              renderMenuItem(child, depth + 1)
            )}
          </ul>
        )}
      </li>
    );
  };

  const menuItems = MENU_TREE(menuType);

  return (
    <ul
      className={`font-semibold ${
        isMobile
          ? "flex flex-col gap-4  max-h-[80vh] overflow-y-auto"
          : "h-full flex items-center gap-6"
      }`}
    >
      {menuItems.map((item) => renderMenuItem(item))}
    </ul>
  );
}
