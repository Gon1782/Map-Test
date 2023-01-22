import { useLocation, useNavigate } from "react-router";

const Detail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

  return (
    <>
      <div>{state[0].statNm}</div>;
      <button onClick={() => navigate("/")}>홈으로가기</button>
    </>
  );
};

export default Detail;
