import style from "./layoutResources.module.css";
import NavResources from "./navResources/navResources";
import Line from "../line/line";

const LayoutResources = ({ children }) => {
  return (
    <div className={style.resources}>
      <NavResources />
      <Line margin={0} />
      {children}
    </div>
  );
};

export default LayoutResources;
