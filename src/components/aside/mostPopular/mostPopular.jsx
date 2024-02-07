import style from "./mostPopular.module.css";
import Spinner from "../../spinner/spinner";
import { useGetPopularQuery } from "../../../features/api/resourcesApi";
import LinkPopular from "./linkPopular/linkPopular";

const MostPopular = () => {
  const { data, isLoading, isSuccess } = useGetPopularQuery();

  return (
    <div className={style.mostPopular}>
      <div className={style.mostPopularTitle}>Recursos Populares</div>
      <div className={style.mostPopularLinks}>
        {isLoading ? (
          <Spinner size={8} marginTop={30} />
        ) : (
          isSuccess &&
          data.map((el) => <LinkPopular resource={el} key={el._id} />)
        )}
      </div>
    </div>
  );
};

export default MostPopular;
