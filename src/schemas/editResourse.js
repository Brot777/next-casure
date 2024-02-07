import * as yup from "yup";

const linkRules = /^(http|https):\/\/([a-z0-9]+\.)?[a-z0-9]+\.[a-z]*/;
// http or https, subdomain optional, domain and anything

export const editResourceSchema = yup.object().shape({
  title: yup
    .string()
    .required("Ingresa un titulo")
    .max(70, "Solo se permite un maximo de 70 caracteres"),
  categorie: yup.string(),
  link: yup
    .string()
    .required("Ingresa un link")
    .matches(linkRules, "Ingresa un link valido"),
  description: yup
    .string()
    .required("Ingresa una descripción")
    .max(700, "Solo se permite un maximo de 700 caracteres"),
});
