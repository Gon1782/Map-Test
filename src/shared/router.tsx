/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import App from "../App";
import Detail from "../components/Detail";
import useMyLocation from "../hooks/useMyLocation";
import { useAppDispatch } from "../hooks/useRedux";
import { addMyLocation } from "../redux/modules/locationSlice";

const { kakao } = window;

const Router = () => {
  const dispatch = useAppDispatch();
  const [myLocation, setMyLocation] = useState(new kakao.maps.LatLng(37.49810223154336, 127.0327612337389));
  const [zcode, zscode, setLocation] = useMyLocation();

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

  useEffect(() => {
    setLocation(myLocation);
  }, [myLocation]);

  useEffect(() => {
    dispatch(addMyLocation({ zcode, zscode }));
  }, [setLocation]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App myLocation={myLocation} setMyLocation={setMyLocation} setLocation={setLocation} />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
