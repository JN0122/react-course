import NavLink from "./nav-link";

import { NavigationLink } from "@/types/navigation";
import classes from "./Navigation.module.css";

type Props = {
  links: NavigationLink[];
};

const Navigation = ({ links }: Props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        {links.map((link, i) => (
          <li key={`${i}_${link.name}`}>
            <NavLink link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
