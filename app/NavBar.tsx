"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { Skeleton } from "@/app/components";
const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3 ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStaus />
        </Flex>
      </Container>
    </nav>
  );
};
const AuthStaus = () => {
  const { status, data: session } = useSession();
  if (status === "loading")
    return (
      <Skeleton width={"3rem"} baseColor="gray" className="rounded-full" />
    );
  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Log in
      </Link>
    );
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback={<FallBackUi />}
            size={"3"}
            radius="full"
            className="cursor-pointer "
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={"2"}>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout" className="w-full">
              Log out
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <ul className="flex space-x-6">
      {links?.map((link, index) => {
        return (
          <li key={index}>
            <Link
              href={link.href}
              className={classNames({
                "nav-link": true,
                "!text-zinc-800 ": link.href === currentPath,
              })}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default NavBar;

const FallBackUi = () => {
  return (
    <Link href="/api/auth/signin" color="ruby">
      <Button color="ruby">Sign in again</Button>
    </Link>
  );
};
