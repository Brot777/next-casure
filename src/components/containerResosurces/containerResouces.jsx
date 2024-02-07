import style from "./containerResources.module.css";
import Resource from "./resource/resource";
import Spinner from "../spinner/spinner";
import { useSelector } from "react-redux";
const ContainerResources = ({ isLoading }) => {
  const resources = useSelector((state) => state.resource);
  let areThereResources = resources.length > 0;
  return (
    <div className={style.containerResources}>
      {isLoading ? (
        <Spinner marginTop={40} />
      ) : areThereResources ? (
        resources.map((resource, indexResource) => (
          <Resource
            resource={resource}
            key={resource._id}
            indexResource={indexResource}
          ></Resource>
        ))
      ) : (
        <div className={style.containerNoResuts}>
          <div className={style.iconNoResuts}>
            <img
              src="/img/no-results-icon.svg"
              alt="icono representativo sin resultados de busqueda"
            />
          </div>
          <div className={style.textNoResuts}>No se encontraron resutados</div>
        </div>
      )}
    </div>
  );
};

export default ContainerResources;
