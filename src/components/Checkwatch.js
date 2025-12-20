import { conffeti } from "../utils/functions";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

function Checkwatch({ handleCheck, index, value, className }) {
  const handleClick = (e) => {
    handleCheck(index, !value);
    if (!value) {
      conffeti(e.currentTarget);
    }
  };

  return (
    <>
      <span
        className={`checkbox-watch ${value ? "" : "not-seen"} ${className}`}
        onClick={(e) => handleClick(e)}
      >
        {value ? <EyeFilled /> : <EyeInvisibleFilled />}
      </span>
    </>
  );
}

export default Checkwatch;
