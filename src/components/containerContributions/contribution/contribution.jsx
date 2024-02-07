import { useDispatch } from "react-redux";
import Link from "next/link";
import { useDeleteResourceMutation } from "../../../features/api/resourcesApi";
import { addEditResource } from "../../../features/resources/editResouceSlice";
import useModal from "../../../Hooks/useModal";
import { convertToDateAgo } from "../../../utils/convertDate";
import FormEditResource from "../../formEditResource/formEditResource";
import Modal from "../../modal/modal";
import style from "./contribution.module.css";

const Contribution = ({ contribution }) => {
  const [deleteContrubution] = useDeleteResourceMutation();
  const [isVisibleEdit, showModalEdit, closeModalEdit] = useModal(false);
  const dispatch = useDispatch();

  const handleDeleteContribution = () => {
    deleteContrubution(contribution._id);
  };

  const handleEditContribution = () => {
    dispatch(addEditResource(contribution));
    showModalEdit();
  };
  return (
    <div className={style.contribution}>
      <Link href={`/resources/${contribution._id}`} className={style.tilte}>
        {contribution.title}
      </Link>
      <div className={style.date}>
        {convertToDateAgo(contribution.createdAt)}
      </div>

      <div className={style.description}>{contribution.description}</div>
      <div className={style.categorie}>{contribution.categorie}</div>
      <div className={style.actions}>
        <button
          className={style.updateResource}
          onClick={handleEditContribution}
        >
          Editar
        </button>
        <button
          className={style.deleteResource}
          onClick={handleDeleteContribution}
        >
          Eliminar
        </button>
      </div>
      <Modal
        isVisible={isVisibleEdit}
        titulo="Editar Recurso"
        fuctionCloseModal={closeModalEdit}
      >
        <FormEditResource closeModal={closeModalEdit} />
      </Modal>
    </div>
  );
};

export default Contribution;
