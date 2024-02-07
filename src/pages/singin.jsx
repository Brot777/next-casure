import { useSingInMutation } from "../features/api/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { addSesion } from "../features/sesion/sesionSlice";
import style from "@/styles/singin.module.css";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { singInSchema } from "../schemas/singin";
import Line from "../components/line/line";
import Navigation from "@/components/navigation/navigation";

const SingIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [singin] = useSingInMutation();

  const submitForm = async (values) => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/singin", {
        method: "POST",

        body: JSON.stringify(values),

        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      /*  window.localStorage.setItem("sesion", JSON.stringify(data));
      dispatch(addSesion(data));
      router.push("/"); */
    } catch (error) {
      console.log(error);
    }
  };

  const { handleSubmit, handleChange, errors, touched, handleBlur } = useFormik(
    {
      initialValues: {
        userName: "",
        password: "",
      },
      onSubmit: submitForm,
      validationSchema: singInSchema,
    }
  );

  return (
    <>
      <Navigation />
      <div className={style.singIn}>
        <div className={style.containerForm}>
          <div className={style.title}>Inicio de Sesion</div>
          <Line />

          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.formControl}>
              <input
                type="text"
                placeholder="Usuario"
                name="userName"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.userName && touched.userName && (
                <p className={style.errorMessage}>{errors.userName}</p>
              )}
            </div>
            <div className={style.formControl}>
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <p className={style.errorMessage}>{errors.password}</p>
              )}
            </div>
            <div className={style.formControl}>
              <button type="submit">Iniciar sesion</button>
            </div>
            <Link href={"/singup"} className={style.link}>
              ¿Aun no tienes una cuenta? Registrate aqui
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SingIn;
