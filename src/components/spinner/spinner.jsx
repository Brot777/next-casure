import style from "./spinner.module.css";

const Spinner = ({ size = 10, marginTop = 0 }) => (
  <div
    className={style.loader}
    style={{
      fontSize: `${size}px`,
      marginTop: `${marginTop}px`,
    }}
  ></div>
);

export default Spinner;
