import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";

interface IProps {
  id?: string;
  href?: string;
  children: ReactNode | ReactNode[];
  className?: any;
  guestViewable?: boolean;
  onClick?: MouseEventHandler | undefined;
}

export default function Linker({
  id,
  href = "/",
  children,
  className = "",
  guestViewable = false,
  onClick = undefined,
}: IProps) {
  if (onClick)
    return (
      <a
        id={id}
        onClick={onClick}
        data-guestviewable={guestViewable}
        className={className}
      >
        {children}
      </a>
    );

  return (
    <Link
      id={id}
      href={href}
      data-guestviewable={guestViewable}
      className={className}
    >
      {children}
    </Link>
  );
}
