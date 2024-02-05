"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <div className="flex space-x-6">
        {links?.map((link, index) => {
          return (
            <Link
              key={index}
              href={link.href}
              className={classNames({
                "text-zinc-800 ": link.href === currentPath,
                "text-zinc-500 ": link.href !== currentPath,
                "hover:text-red-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
