import Link from "next/link";
import Image from "next/image";

import logoImage from "@/assets/logo.png";
import classes from "./MainHeader.module.css";
import MainHeaderBackground from "./MainHeaderBackground";

const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />{" "}
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logoImage} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href="/meals">Browse Meals</Link>
            </li>
            <li>
              <Link href="/community">Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
