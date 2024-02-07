import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetCommentsByResourceIdQuery } from "../../features/api/commentApi";
import { addComments } from "../../features/comments/commentSlice";
import Comment from "./comment/comment";
import Spinner from "../spinner/spinner";
import style from "./containerComments.module.css";

const ContainerComents = () => {
  const [isVisible, setIsVisible] = useState(true);
  const comments = useSelector((store) => store.comment);
  const resource = useSelector((store) => store.resourceDetails);
  const dispatch = useDispatch();
  const areThereComents = comments.length > 0;

  const [getComments, { data, isSuccess, isLoading }] =
    useLazyGetCommentsByResourceIdQuery();

  const handleClick = () => {
    getComments(resource._id);
    setIsVisible(false);
  };
  useEffect(() => {
    dispatch(addComments([]));
  }, []);

  useEffect(() => {
    dispatch(addComments(data));
  }, [isSuccess]);

  return isLoading ? (
    <Spinner marginTop={60} />
  ) : (
    <div className={style.containerComments}>
      <div
        className={`${style.ShowComments} ${isVisible && style.visible}`}
        onClick={handleClick}
      >
        Ver Comentarios
      </div>
      {!isVisible &&
        areThereComents &&
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      {!isVisible && !areThereComents && (
        <div className={style.containerNoComments}>
          <div className={style.iconNoComments}>
            <img
              src="/img/no-comments-icon.svg"
              alt="icono representativo sin resultados de busqueda"
            />
          </div>
          <div className={style.textNoComments}>
            Todavia no hay comentarios para este recurso
          </div>
        </div>
      )}
    </div>
  );
};

export default ContainerComents;
