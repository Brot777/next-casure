import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEditResourceMutation } from "../../features/api/resourcesApi";
import { editResourceSchema } from "../../schemas/editResourse";
import style from "./formEditResource.module.css";

const FormEditResource = ({ closeModal }) => {
  const [available, setAvailable] = useState(false);
  const [editResource] = useEditResourceMutation();
  const contribution = useSelector((store) => store.editResource);
  const submitForm = async (
    { title, categorie, link, description },
    { resetForm }
  ) => {
    await editResource({
      resource: { title, categorie, link, description },
      resourceId: contribution._id,
    }).unwrap();
    resetForm();
    closeModal();
  };

  const { values, handleSubmit, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        title: contribution.title,
        categorie: contribution.categorie,
        link: contribution.link,
        description: contribution.description,
      },
      onSubmit: submitForm,
      validationSchema: editResourceSchema,
    });

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.formMain}>
        <div className={style.formControl}>
          <label htmlFor="titleEdit">Titulo</label>
          <input
            type="text"
            id="titleEdit"
            name="title"
            onChange={handleChange}
            value={values.title}
            onBlur={handleBlur}
          />
          {errors.title && touched.title && (
            <p className={style.errorMessage}>{errors.title}</p>
          )}
        </div>
        <div className={style.formControl}>
          <label htmlFor="categorieEdit">Categoria</label>
          <select
            id="categorieEdit"
            name="categorie"
            onChange={handleChange}
            value={values.categorie}
            onBlur={handleBlur}
          >
            <option value="Basico">Basico</option>
            <option value="Especifico">Especifico</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.categorie && touched.categorie && (
            <p className={style.errorMessage}>{errors.categorie}</p>
          )}
        </div>
        <div className={style.formControl}>
          <label htmlFor="linkEdit">Link</label>
          <input
            type="text"
            id="linkEdit"
            name="link"
            onChange={handleChange}
            value={values.link}
            onBlur={handleBlur}
          />
          {errors.link && touched.link && (
            <p className={style.errorMessage}>{errors.link}</p>
          )}
        </div>
        <div className={style.formControl}>
          <label htmlFor="descriptionEdit">Descripccion</label>
          <textarea
            id="descriptionEdit"
            name="description"
            rows="4"
            onChange={handleChange}
            value={values.description}
            onBlur={handleBlur}
          />
          {errors.description && touched.description && (
            <p className={style.errorMessage}>{errors.description}</p>
          )}
        </div>
        <div className={style.formControl}>
          <button type="button">Cancelar</button>
        </div>
        <div className={style.formControl}>
          <button
            type="submit"
            className={`${style.submit} ${available && style.avalible}`}
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
};
export default FormEditResource;
