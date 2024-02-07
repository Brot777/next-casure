import Layout from "@/components/layout/layout";
import ContainerContributions from "@/components/containerContributions/containerContributions";
import LRUCache from "lru-cache";

const options = {
  max: 500,
  ttl: 1000 * 10,
  updateAgeOnGet: true,
};

const cache = new LRUCache(options);

const Contubutions = ({ results }) => {
  console.log(results);
  return <ContainerContributions data={results} />;
};

Contubutions.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps(context) {
  const cacheKey = context.req.url;

  // Check if the response is in the cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`Respondiendo ${cacheKey} desde la caché`);
    return { props: { results: cachedData } };
  }

  const response = await fetch("http://localhost:4000/resources/contributions");
  const results = await response.json();

  //add the response in the cache
  cache.set(cacheKey, results);
  console.log(`Respondiendo ${cacheKey} desde la API`);
  return {
    props: { results },
  };
}

export default Contubutions;
