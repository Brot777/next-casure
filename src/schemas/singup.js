import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
// min 7 caracter, 1 upper case letter, 1 lower case letter, 1 numeric digit
export const singUpSchema = yup.object().shape({
  name: yup.string().required("Ingresa un nombre"),
  userName: yup.string().required("Ingresa un usuario"),
  password: yup
    .string()
    .min(7, "ingresa al menos 7 caracteres")
    .matches(passwordRules, {
      message: "La contraseña debe contener: números, mayúsculas y minúsculas",
    })
    .required("Ingresa una contraseña"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "la contraseña no coincide")
    .required("confirma tu contraseña"),
});
