"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavigationLink } from "@/types/navigation";
import classes from "./nav-link.module.css";

type Props = { link: NavigationLink };

const NavLink = ({ link }: Props) => {
  const path = usePathname();

  return (
    <Link
      className={
        path.startsWith(link.path)
          ? `${classes["nav-link"]} ${classes.active}`
          : classes["nav-link"]
      }
      href={link.path}
    >
      {link.name}
    </Link>
  );
};

export default NavLink;
