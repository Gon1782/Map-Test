import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import Map from "./components/Map";
import { getData } from "./common/api";
import { Data } from "./types/interface";
import useLocation from "./hooks/useLocation";

const { kakao } = window;

const App = () => {
  const [myLocation, setMyLocation] = useState(new kakao.maps.LatLng(37.49810223154336, 127.0327612337389));
  const [zcode, zscode] = useLocation(myLocation);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setMyLocation(new kakao.maps.LatLng(lat, lng));
      });
    } else {
      window.alert("위치정보를 불러올 수 없습니다.");
    }
  }, []);

  const { isLoading, isError, data, error } = useQuery<Data, Error, any, [string, string]>([zcode, zscode], getData);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return <Map data={data} myLocation={myLocation} />;
};

export default App;
