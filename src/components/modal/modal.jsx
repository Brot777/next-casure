import Line from "../line/line";
import style from "./modal.module.css";

const Modal = ({ children, isVisible, fuctionCloseModal, titulo = "" }) => {
  return isVisible ? (
    <div className={style.overlay}>
      <div className={style.containerModal}>
        <div className={style.headModal}>
          <p className={style.modalTitle}>{titulo}</p>
          <button onClick={fuctionCloseModal} className={style.closeButton}>
            X
          </button>
        </div>
        <Line />
        <div className={style.mainMmodal}>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
