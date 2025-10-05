import Link from "next/link";
import Image from "next/image";

import MainHeaderBackground from "./main-header-background";
import Navigation from "../navigation";

import logoImage from "@/assets/logo.png";
import { NavigationLink } from "@/types/navigation";
import classes from "./main-header.module.css";

const links: NavigationLink[] = [
  { name: "Browse Meals", path: "/meals" },
  { name: "Foodies Community", path: "/community" },
];

const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logoImage} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>
        <Navigation links={links} />
      </header>
    </>
  );
};

export default MainHeader;
