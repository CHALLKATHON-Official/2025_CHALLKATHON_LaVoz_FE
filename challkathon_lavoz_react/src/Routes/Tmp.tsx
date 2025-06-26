import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Tmp = () => {
  const nav = useNavigate();

  useEffect(() => {
    nav(-1);
  }, []);
  return <div></div>;
};

export default Tmp;
