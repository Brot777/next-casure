import style from "@/styles/404.module.css";
import Head from "next/head";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>404-Not Found</title>
      </Head>
      <div className={style.site}>
        <h1 className={style.title}>404</h1>
        <p className={style.text}>Not Found</p>
        <p className={style.description}>
          Es posible que el enlace esté roto o que se haya eliminado. Comprueba
          que el enlace que deseas abrir es correcto.
        </p>
        <Link href="/" className={style.btnBackToHome}>
          Volver a Inicio
        </Link>
      </div>
    </>
  );
};

export default NotFound;
