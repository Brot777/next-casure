import * as yup from "yup";

export const singInSchema = yup.object().shape({
  userName: yup.string().required("Ingresa tu usuario"),
  password: yup.string().required("Ingresa tu contraseña"),
});
