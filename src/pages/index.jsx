import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import style from "@/styles/index.module.css";
import FormSearch from "@/components/formSearch/formSearch";
import ContainerResources from "@/components/containerResosurces/containerResouces";
import { useLazyGetResourcesQuery } from "@/features/api/resourcesApi";
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

const Home = ({ results }) => {
  const dispach = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("se ejecuto");
    dispach(addResources(results));
  }, [results]);
  return (
    <div className={style.all}>
      <FormSearch
        changeLoading={setIsLoading}
        useLazyQuery={useLazyGetResourcesQuery}
      ></FormSearch>
      <ContainerResources isLoading={isLoading} />
    </div>
  );
};

Home.getLayout = (page) => (
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
  const response = await fetch("http://localhost:4000/api/resources");
  const results = await response.json();

  //add the response in the cache
  cache.set(cacheKey, results);
  console.log(`Respondiendo ${cacheKey} desde la API`);
  return {
    props: { results },
  };
}

export default Home;
