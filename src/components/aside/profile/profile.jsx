import { useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../spinner/spinner";
import { useLazyGetUserByIdQuery } from "../../../features/api/usersApi";
import style from "./profile.module.css";
import Link from "next/link";
import { convertToShortDate } from "../../../utils/convertDate";

const Profile = () => {
  const sesion = useSelector((store) => store.sesion);

  const [getUserById, { data, isLoading }] = useLazyGetUserByIdQuery();

  useEffect(() => {
    if (sesion) {
      getUserById();
    } // eslint-disable-next-line
  }, [sesion]);
  // return component profile with personal information if user have sesion
  return data ? (
    <div className={style.profile}>
      {isLoading ? (
        <Spinner size={8} marginTop={30} />
      ) : (
        <>
          <div className={style.profileHead}>
            <div className={style.avatar}>{data.userName[0]}</div>
            <div className={style.personalInformation}>
              <div className={style.userName}>{data.userName}</div>
              <div className={style.name}>{data.name}</div>
            </div>
          </div>
          <div className={style.information}>
            <div className={style.contributions}>
              <img
                src="/img/contribution-icon.svg"
                alt="icono representativo de contribucion"
              />
              Contribuciones:
              {data.contributions}
            </div>
            <div className={style.contributions}>
              <img
                src="/img/member-icon.svg"
                alt="icono representativo de contribucion"
              />
              Miembro desde el:
              {convertToShortDate(data.createdAt)}
            </div>
          </div>
        </>
      )}
    </div>
  ) : (
    <div className={style.profile}>
      <div className={style.profileHead}>
        <div className={style.avatar}>S</div>
        <div className={style.personalInformation}>
          <div className={style.userName}>Sin sesión</div>
        </div>
      </div>
      <div className={style.information}>
        <div className={style.informationNoSesion}>
          Inicia sesion para crear recursos y acceder a más funcionalidades
        </div>
        <div className={style.varible}>
          <Link href="/singin" className={style.btnSingIn}>
            Sing In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
