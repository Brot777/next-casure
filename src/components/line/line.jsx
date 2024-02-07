import style from "./line.module.css";

const Line = ({ margin = 10, border = 0.5 }) => {
  return (
    <div
      className={style.line}
      style={{ margin: `${margin}px 0`, height: `${border}px` }}
    ></div>
  );
};
export default Line;
