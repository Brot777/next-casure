import style from "./formComment.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useAddCommentMutation } from "../../features/api/commentApi";
import { addComment } from "../../features/comments/commentSlice";

const FormComment = () => {
  const textareaRef = useRef(null);
  const [createComment] = useAddCommentMutation();
  const dispatch = useDispatch();
  const sesion = useSelector((store) => store.sesion);
  const resource = useSelector((store) => store.resourceDetails);

  const [submitVisible, setSubmitVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState(false);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!available) {
      return;
    }
    const response = await createComment({
      description,
      authorId: sesion._id,
      resourceId: resource._id,
    }).unwrap();
    dispatch(
      addComment({
        _id: response._id,
        description: response.description,
        authorId: {
          _id: sesion._id,
          userName: sesion.userName,
        },
        resourceId: response.resourceId,
        createdAt: response.createdAt,
        likes: response.likes,
      })
    );
    setDescription("");
    setSubmitVisible(false);
    setAvailable(false);
    textareaRef.current.style.height = "33px";
  };

  const handleFocus = () => setSubmitVisible(true);

  const handleChange = (e) => {
    setDescription(e.target.value);
    if (e.target.value == "") {
      setAvailable(false);
    } else {
      setAvailable(true);
    }
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  const handleCancel = () => {
    setDescription("");
    setSubmitVisible(false);
    setAvailable(false);
    textareaRef.current.style.height = "33px";
  };

  useEffect(() => {
    if (sesion) {
      setUser(sesion);
    } else {
      setUser(null);
    }
  }, [sesion]);

  return user ? (
    <form className={style.formComment} onSubmit={handleSubmit}>
      <div className={style.avatar}>
        <div>{user.userName[0]}</div>
      </div>
      <div className={style.formControl}>
        <textarea
          id="comment"
          rows="1"
          placeholder="Escribe un comentario..."
          ref={textareaRef}
          onFocus={handleFocus}
          value={description}
          onChange={handleChange}
        />
        <div
          className={`${submitVisible && style.visible} ${
            style.containerButtons
          } `}
        >
          <button type="button" className={style.cancel} onClick={handleCancel}>
            Canselar
          </button>
          <button
            className={`${style.submit}  ${available && style.available}`}
            type="submit"
          >
            Enviar
          </button>
        </div>
      </div>
    </form>
  ) : null;
};

export default FormComment;
