import style from "@/styles/resourceDetails.module.css";
import Line from "../../components/line/line";
import ContainerInformation from "@/components/containerInformation/containerInformation";
import FormComment from "../../components/formComment/formComment";
import ContainerComents from "../../components/containerComments/containerComments";
import Layout from "@/components/layout/layout";

const ResourceDetails = () => {
  return (
    <div className={style.details}>
      <ContainerInformation />
      <div className={style.comments}>
        <Line margin={20} border={2} />
        <div className={style.tilteComments}>Comentarios</div>
        <FormComment />
        <ContainerComents />
      </div>
    </div>
  );
};

ResourceDetails.getLayout = (page) => <Layout>{page}</Layout>;

export default ResourceDetails;
