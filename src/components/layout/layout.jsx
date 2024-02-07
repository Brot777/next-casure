import style from "./layout.module.css";
import Aside from "../aside/aside";
import Navigation from "../navigation/navigation";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navigation></Navigation>
      </header>
      <main>
        <div className={`container ${style.mainLayout}`}>
          <Aside />
          <div className={style.main}>{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
