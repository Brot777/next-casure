import Link from "next/link";
import style from "./content.module.css";
import { useRouter } from "next/router";

const navResources = () => {
  const router = useRouter();
  return (
    <nav className={style.nav}>
      <ul className={style.links}>
        <li>
          <Link
            href={"/"}
            className={
              router.asPath === "/" ? style.navLinkSelect : style.navLink
            }
          >
            Todos los recursos
          </Link>
        </li>
        <li>
          <Link
            href={"/basic"}
            className={
              router.asPath === "/basic" ? style.navLinkSelect : style.navLink
            }
          >
            Basicos
          </Link>
        </li>
        <li>
          <Link
            href={"/especific"}
            className={
              router.asPath === "/especific"
                ? style.navLinkSelect
                : style.navLink
            }
          >
            Especificos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default navResources;
