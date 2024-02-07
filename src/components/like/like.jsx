import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import style from "./like.module.css";

const Like = ({ feacture, fuctionLiked, action }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const sesion = useSelector((store) => store.sesion);
  let feactureLikes = feacture.likes || {};
  const likesMap = new Map(Object.entries(feactureLikes));
  const isLiked = sesion ? feactureLikes[sesion._id] : undefined;

  const updateLike = () => {
    let updatedLikes;
    if (isLiked) {
      likesMap.delete(sesion._id);
      updatedLikes = Object.fromEntries(likesMap);
    } else {
      likesMap.set(sesion._id, true);
      updatedLikes = Object.fromEntries(likesMap);
    }
    dispatch(action({ idFeacture: feacture._id, updatedLikes }));
  };

  const likedFeacture = () => {
    if (sesion) {
      fuctionLiked(feacture._id);
      updateLike();
    } else {
      router.push("/singin");
    }
  };

  return (
    <div className={style.like} onClick={likedFeacture}>
      {isLiked ? (
        <img src="/img/liked-icon.svg" alt="icono representativo de me gusta" />
      ) : (
        <img src="/img/like-icon.svg" alt="icono representativo de me gusta" />
      )}
      {likesMap.size}
    </div>
  );
};

export default Like;
