import style from "./formSearch.module.css";
import { addResources } from "../../features/resources/resourceSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import useDebounce from "../../Hooks/useDebounce";
import Spinner from "../spinner/spinner";

const FormSearch = ({ changeLoading, useLazyQuery }) => {
  const dispach = useDispatch();
  const counterRef = useRef(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, { data, isLoading, isSuccess, isFetching }] = useLazyQuery();
  const debouncedFilter = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (counterRef.current > 2) {
      search(searchQuery);
    }
    counterRef.current = counterRef.current + 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter]);

  useEffect(() => {
    changeLoading(isLoading); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      dispach(addResources(data));
    } // eslint-disable-next-line
  }, [data, isSuccess]);

  const handelSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const searching = (e) => {
    e.preventDefault();
  };
  return (
    <form className={style.formSearch} onSubmit={(e) => searching(e)}>
      <div className={style.searchBox}>
        <input
          type="text"
          className={style.input}
          placeholder="Buscar Recurso"
          value={searchQuery}
          onChange={handelSearch}
        />
        <button className={style.button}>
          {isFetching ? (
            <Spinner size={2.5} />
          ) : (
            <img src="/img/search.svg" alt="icono buscar" />
          )}
        </button>
      </div>
    </form>
  );
};

export default FormSearch;
