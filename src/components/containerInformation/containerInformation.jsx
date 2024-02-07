import style from "./containerInformation.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetResourceByIdQuery,
  useLikedResourceMutation,
} from "../../features/api/resourcesApi";
import {
  addResourceDetails,
  switchLikeDetails,
} from "../../features/resources/resourceDetailsSlice";
import { convertToShortDate } from "../../utils/convertDate";
import Like from "../like/like";
import Spinner from "../spinner/spinner";
import { useRouter } from "next/router";

const ContainerInformation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { resourceId } = router.query;
  let resource = useSelector((store) => store.resourceDetails);
  const [liked] = useLikedResourceMutation();

  const { data, isLoading, isSuccess } = useGetResourceByIdQuery(resourceId);

  useEffect(() => {
    if (isSuccess) {
      dispatch(addResourceDetails(data));
    }
  }, [isSuccess]);

  return isLoading ? (
    <Spinner marginTop={60} />
  ) : (
    <div className={style.containerInformation}>
      <img
        className={style.imgDetails}
        src="/img/resource-img.svg"
        alt="imagen representativa de un recurso"
      />
      <div className={style.information}>
        <div className={style.tilte}>{resource.title}</div>
        <div className={style.author}>{resource.authorId?.userName}</div>
        <div className={style.description}>{resource.description}</div>
        <div className={style.createdAt}>
          <strong>Creado el:</strong> {convertToShortDate(resource.createdAt)}
        </div>
        <div className={style.containerActions}>
          <a href={resource.link} className={style.linkResource}>
            Ir al recurso
          </a>
          <Like
            feacture={resource}
            action={switchLikeDetails}
            fuctionLiked={liked}
          />
        </div>
      </div>
    </div>
  );
};

export default ContainerInformation;
