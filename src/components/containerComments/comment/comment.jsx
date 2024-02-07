import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteCommentMutation,
  useLikedCommentMutation,
} from "../../../features/api/commentApi";
import {
  deleteCommentOfState,
  switchLikeComment,
} from "../../../features/comments/commentSlice";
import { convertToDateAgo } from "../../../utils/convertDate";
import Like from "../../like/like";
import style from "./comment.module.css";

const Comment = ({ comment }) => {
  const [liked] = useLikedCommentMutation();
  const dispatch = useDispatch();
  const sesion = useSelector((store) => store.sesion);
  let isAuthor = sesion ? sesion._id == comment.authorId._id : undefined;
  const [fuctionDeleteComment] = useDeleteCommentMutation();

  const deleteComment = () => {
    fuctionDeleteComment(comment._id);
    dispatch(deleteCommentOfState({ commentId: comment._id }));
  };
  return (
    <div className={style.comment}>
      <div className={style.user}>
        <div className={style.avatar}>
          <div>{comment.authorId?.userName[0]}</div>
        </div>
        <div className={style.userName}>{comment.authorId?.userName}</div>
      </div>
      <div className={style.description}>{comment.description}</div>
      <div className={style.actions}>
        <div className={style.dateAgo}>
          {convertToDateAgo(comment.createdAt)}
        </div>
        {isAuthor ? (
          <button
            className={style.btnDelete}
            type="button"
            onClick={deleteComment}
          >
            eliminar
          </button>
        ) : null}
        <Like
          feacture={comment}
          action={switchLikeComment}
          fuctionLiked={liked}
        />
      </div>
    </div>
  );
};

export default Comment;
