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
              ${
                isMobile
                  ? "block py-2 px-4 font-medium text-sm max-[300px]:py-1 max-[300px]:px-2 max-[300px]:text-xs"
                  : "flex items-center h-full px-4 py-2 font-medium text-sm max-[300px]:px-2 max-[300px]:text-xs"
              }
              ${depth > 0 ? "pl-6 max-[300px]:pl-3" : ""}
              ${
                isActive
                  ? "text-primary bg-primary/10 hover:bg-primary/20"
                  : "text-primary hover:text-primary/80"
              }
              transition-colors duration-200
              ${
                depth === 1 && hasChildren && !isMobile ? "justify-between" : ""
              }
            `}
          >
            <span className="flex items-center truncate max-[300px]:text-xs">
              {item.label}
            </span>
            {/* 2단계 메뉴가 있는 경우 화살표 표시 */}
            {depth === 1 && hasChildren && !isMobile && (
              <span className="ml-2 text-xs max-[300px]:ml-1 max-[300px]:text-[10px]">
                →
              </span>
            )}
          </Linker>
        ) : (
          <span
            className={`
              ${
                isMobile
                  ? "block py-2 px-4 text-sm font-medium max-[300px]:py-1 max-[300px]:px-2 max-[300px]:text-xs"
                  : "flex items-center h-full px-4 py-2 whitespace-nowrap text-sm font-medium max-[300px]:px-2 max-[300px]:text-xs"
              }
              ${depth > 0 ? "pl-6 max-[300px]:pl-3" : ""}
              ${hasChildren ? "cursor-default text-gray-800" : "text-gray-500"}
              ${
                depth === 1 && hasChildren && !isMobile ? "justify-between" : ""
              }
            `}
          >
            <span className="flex items-center truncate max-[300px]:text-xs">
              {item.label}
            </span>
            {/* 한 depth가 더 있는 경우 화살표 표시 */}
            {depth === 1 && hasChildren && !isMobile && (
              <span className="ml-2 text-xs max-[300px]:ml-1 max-[300px]:text-[10px]">
                →
              </span>
            )}
          </span>
        )}

        {/* 하위 메뉴가 있는 경우 */}
        {hasChildren && (
          <ul
            className={`
              ${
                isMobile
                  ? "ml-4 mt-2 space-y-1 border-l border-gray-200 pl-4 max-[300px]:ml-2 max-[300px]:pl-2 max-[300px]:space-y-0"
                  : depth === 0
                  ? "absolute top-full left-0 bg-white shadow-lg border border-gray-200 py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 max-[300px]:min-w-32 max-[300px]:py-1"
                  : "absolute top-0 left-full bg-white shadow-lg border border-gray-200 py-2 min-w-48 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 ml-1 max-[300px]:min-w-32 max-[300px]:py-1"
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
    <nav className={`${isMobile ? "max-[300px]:px-1" : "h-full"}`}>
      <ul
        className={`${
          isMobile
            ? "flex flex-col gap-1 max-h-[80vh] overflow-y-auto py-2 max-[300px]:gap-0 max-[300px]:py-1"
            : "h-full flex items-center gap-4 max-[300px]:gap-2"
        }`}
      >
        {menuItems.map((item) => renderMenuItem(item))}
      </ul>
    </nav>
  );
}
