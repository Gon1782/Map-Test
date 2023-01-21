import { useLocation } from "react-router";

const Detail = () => {
  const { state } = useLocation();
  console.log(state);
  
  return <div>Detail</div>;
};

export default Detail;
