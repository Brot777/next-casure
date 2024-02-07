import Link from "next/link";
import { useRouter } from "next/router";
import style from "./navigation.module.css";
import { useEffect, useState } from "react";
import { removeSesion } from "../../features/sesion/sesionSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/spinner";

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(null);
  const sesion = useSelector((store) => store.sesion);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    window.localStorage.removeItem("sesion");
    dispatch(removeSesion());
    router.push("/singin");
  };

  const btnOnclick = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  const linkOnClick = () => {
    if (isVisible) {
      setIsVisible((isVisible) => !isVisible);
    }
  };

  useEffect(() => {
    if (sesion) {
      setUser(sesion);
    } else {
      setUser({});
    }
  }, [sesion]);

  return (
    <nav className={`${style.navigation} container`}>
      <Link href="/" className={style.navBrand}>
        <div className={style.logo}>
          <img src="/brand.svg" alt="logo representativo del sitio" />
        </div>
        <div className={style.brandText}>casure</div>
      </Link>
      <ul className={`${style.links} ${isVisible && style.visible}`}>
        <li>
          <Link href="/" className={style.link} onClick={linkOnClick}>
            Inicio
          </Link>
        </li>
        <li>
          <Link
            href="/contributions"
            className={style.link}
            onClick={linkOnClick}
          >
            Contribuciones
          </Link>
        </li>
        <li>
          <Link href="/favorites" className={style.link} onClick={linkOnClick}>
            Favoritos
          </Link>
        </li>
        <li>
          {!user && <Spinner size={4} />}
          {user && user._id && (
            <div className={style.containerLogOut}>
              <div className={style.avatar}>
                <div>{user.userName[0]}</div>
              </div>
              <button onClick={handleLogOut} className={style.btnLogOut}>
                Log out
              </button>
            </div>
          )}
          {user && !user._id && (
            <div className={style.varible}>
              <Link href="/singin" className={style.btnSingIn}>
                Sing In
              </Link>
              <Link href="/singup" className={style.btnSingUp}>
                Sing Up
              </Link>
            </div>
          )}
        </li>
      </ul>

      <div
        className={`${style.btnNav} ${isVisible && style.visible}`}
        onClick={btnOnclick}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navigation;
