import { useSingUpMutation } from "../features/api/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { addSesion } from "../features/sesion/sesionSlice";
import style from "@/styles/singup.module.css";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { singUpSchema } from "../schemas/singup";
import Line from "../components/line/line";
import Navigation from "@/components/navigation/navigation";

const SingUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [singup] = useSingUpMutation();

  const submitForm = async (values) => {
    try {
      const data = await singup(values).unwrap();
      window.localStorage.setItem("sesion", JSON.stringify(data));
      dispatch(addSesion(data));
      router.push("/");
    } catch (error) {
      console.log(error.data.msj);
    }
  };

  const { handleSubmit, handleChange, errors, touched, handleBlur } = useFormik(
    {
      initialValues: {
        name: "",
        userName: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit: submitForm,
      validationSchema: singUpSchema,
    }
  );

  return (
    <>
      <Navigation />
      <div className={style.singUp}>
        <div className={style.containerForm}>
          <div className={style.title}>Registro</div>
          <Line />

          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.splitColum}>
              <div className={style.formControl}>
                <input
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                  <p className={style.errorMessage}>{errors.name}</p>
                )}
              </div>
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
              <input
                type="password"
                placeholder="Confirmar contraseña"
                name="confirmPassword"
                onChange={handleChange}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className={style.errorMessage}>{errors.confirmPassword}</p>
              )}
            </div>
            <div className={style.formControl}>
              <button type="submit">Registrarse</button>
            </div>
            <Link href={"/singin"} className={style.link}>
              ¿Ya tienes una cuenta? Inicia sesion aqui
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SingUp;
