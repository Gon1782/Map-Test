import { useQuery } from "react-query";
import Map from "./components/Map";
import { getData } from "./common/api";
import { Data } from "./types/interface";
import { useAppSelector } from "./hooks/useRedux";

interface Props {
  myLocation: any;
  setLocation: any
  setMyLocation: any;
}

const App = ({ myLocation, setLocation, setMyLocation }: Props) => {
  const zc = useAppSelector((state) => state.location.zcode);
  const zsc = useAppSelector((state) => state.location.zscode);

  const { isLoading, isError, data, error } = useQuery<Data, Error, any, [string, string]>([zc, zsc], getData);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return <Map data={data} myLocation={myLocation} setLocation={setLocation} setMyLocation={setMyLocation} />;
};

export default App;
