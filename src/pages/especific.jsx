import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import style from "@/styles/especific.module.css";
import FormSearch from "@/components/formSearch/formSearch";
import ContainerResources from "@/components/containerResosurces/containerResouces";
import { useLazyGetResourcesEspecificQuery } from "@/features/api/resourcesApi";
import { useDispatch } from "react-redux";
import { addResources } from "@/features/resources/resourceSlice";
import LayoutResources from "@/components/layoutResources/layoutResources";
import LRUCache from "lru-cache";

const options = {
  max: 500,
  ttl: 1000 * 10,
  updateAgeOnGet: true,
};

const cache = new LRUCache(options);

const Especific = ({ results }) => {
  const dispach = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("se ejecuto basic");
    dispach(addResources(results));
  }, [results]);
  return (
    <div className={style.basic}>
      <FormSearch
        changeLoading={setIsLoading}
        useLazyQuery={useLazyGetResourcesEspecificQuery}
      ></FormSearch>
      <ContainerResources isLoading={isLoading} />
    </div>
  );
};

Especific.getLayout = (page) => (
  <Layout>
    <LayoutResources>{page}</LayoutResources>
  </Layout>
);

export async function getServerSideProps(context) {
  const cacheKey = context.req.url;

  // Check if the response is in the cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`Respondiendo ${cacheKey} desde la caché`);
    return { props: { results: cachedData } };
  }

  const response = await fetch("http://localhost:4000/api/resources/especific");
  const results = await response.json();

  //add the response in the cache
  cache.set(cacheKey, results);
  console.log(`Respondiendo ${cacheKey} desde la API`);
  return {
    props: { results },
  };
}

export default Especific;
