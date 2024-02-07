import style from "./linkPopular.module.css";
import Link from "next/link";
const LinkPopular = ({ resource }) => {
  return (
    <Link href={`/resources/${resource._id}`} className={style.link}>
      {resource.title}
      <span className={style.like}>
        <img src="/img/like-icon.svg" alt="icono representativo de me gusta" />
        {resource.likesCount}
      </span>
    </Link>
  );
};

export default LinkPopular;
