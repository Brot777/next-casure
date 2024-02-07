import style from "./resource.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useFavoriteResourceMutation,
  useLikedResourceMutation,
} from "../../../features/api/resourcesApi";
import { useSelector, useDispatch } from "react-redux";
import {
  switchFavorite,
  switchLike,
} from "../../../features/resources/resourceSlice";
import Like from "../../like/like";
import { convertToDateAgo } from "../../../utils/convertDate";

const Resource = ({ resource, indexResource }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [favorite] = useFavoriteResourceMutation();
  const sesion = useSelector((store) => store.sesion);
  const [liked] = useLikedResourceMutation();

  const isFavorited = sesion ? resource.favorites[sesion._id] : undefined;

  const updateFavorite = () => {
    let updatedFavorites;
    const newMap = new Map(Object.entries(resource.favorites));
    if (isFavorited) {
      newMap.delete(sesion._id);
      updatedFavorites = Object.fromEntries(newMap);
    } else {
      newMap.set(sesion._id, true);
      updatedFavorites = Object.fromEntries(newMap);
    }
    dispatch(switchFavorite({ indexResource, updatedFavorites }));
  };

  const favoriteResource = () => {
    if (sesion) {
      favorite(resource._id);
      updateFavorite();
    } else {
      router.push("/singin");
    }
  };

  return (
    <div to={`/resources/${resource._id}`} className={style.resource}>
      <Link href={`/resources/${resource._id}`} className={style.containerImg}>
        <img
          className={style.img}
          src="/img/resource-img.svg"
          alt="imagen representativa de un recurso"
        />
      </Link>
      <div className={style.information}>
        <Link href={`/resources/${resource._id}`} className={style.tilte}>
          {resource.title}
        </Link>
        <div className={style.author}>{`${
          resource.authorId.userName
        } - ${convertToDateAgo(resource.createdAt)}`}</div>

        <div className={style.description}>{resource.description}</div>
        <div className={style.categorie}>{resource.categorie}</div>
        <div className={style.actions}>
          {isFavorited ? (
            <div className={style.favoriteSelected} onClick={favoriteResource}>
              <img
                src="/img/favorite-true-icon.svg"
                alt="icono representativo favorito"
              />
              <span>Quitar</span>
            </div>
          ) : (
            <div className={style.favorite} onClick={favoriteResource}>
              <img
                src="/img/favorite-icon.svg"
                alt="icono representativo favorito"
              />
              <span>Añadir</span>
            </div>
          )}
          <Like feacture={resource} action={switchLike} fuctionLiked={liked} />
        </div>
      </div>
    </div>
  );
};

export default Resource;
