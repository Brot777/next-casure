import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCrateResourceMutation } from "../../../features/api/resourcesApi";
import { createResourceSchema } from "../../../schemas/createResoruce";
import style from "./form.module.css";

const Form = () => {
  const sesion = useSelector((store) => store.sesion);
  const [user, setUser] = useState(null);
  const [createResoruce] = useCrateResourceMutation();
  const submitForm = async (
    { title, categorie, link, description },
    { resetForm }
  ) => {
    if (sesion) {
      await createResoruce({
        title,
        categorie,
        link,
        description,
        authorId: sesion._id,
      }).unwrap();
      resetForm();
    }
  };

  const { values, handleSubmit, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        title: "",
        categorie: "Basico",
        link: "",
        description: "",
      },
      onSubmit: submitForm,
      validationSchema: createResourceSchema,
    });

  useEffect(() => {
    if (sesion) {
      setUser(sesion);
    } else {
      setUser(null);
    }
  }, [sesion]);

  return user ? (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.title}>Crear Recurso</div>
      <div className={style.formMain}>
        <div className={style.formControl}>
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            id="title"
            placeholder="Titulo del recurso"
            onChange={handleChange}
            value={values.title}
            onBlur={handleBlur}
          />
          {errors.title && touched.title && (
            <p className={style.errorMessage}>{errors.title}</p>
          )}
        </div>
        <div className={style.formControl}>
          <label htmlFor="categorie">Categoria</label>
          <select
            id="categorie"
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
          <label htmlFor="link">Link</label>
          <input
            type="text"
            id="link"
            placeholder="https://recurso.com"
            onChange={handleChange}
            value={values.link}
            onBlur={handleBlur}
          />
          {errors.link && touched.link && (
            <p className={style.errorMessage}>{errors.link}</p>
          )}
        </div>
        <div className={style.formControl}>
          <label htmlFor="description">Descripccion</label>
          <textarea
            id="description"
            rows="3"
            placeholder="Descripcion del recurso"
            onChange={handleChange}
            value={values.description}
            onBlur={handleBlur}
          />
          {errors.description && touched.description && (
            <p className={style.errorMessage}>{errors.description}</p>
          )}
        </div>
        <div className={style.formControl}>
          <button type="submit">Crear Recurso</button>
        </div>
      </div>
    </form>
  ) : null;
};

export default Form;
