import style from "./aside.module.css";
import Form from "./form/form";
import MostPopular from "./mostPopular/mostPopular";
import Profile from "./profile/profile";

const Aside = () => {
  return (
    <div className={style.aside}>
      <Profile />
      <Form />
      <MostPopular />
    </div>
  );
};

export default Aside;
