import { useRef, useEffect, useState } from "react";
import { Data } from "../types/interface";
import { useNavigate } from "react-router-dom";

const { kakao } = window;

interface Props {
  data: Data;
  myLocation: any;
  setLocation: any;
  setMyLocation: any;
}

const Map = ({ data, myLocation, setLocation, setMyLocation }: Props) => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [mapA, setMap] = useState<any>("");

  useEffect(() => {
    const arrUnique = data.items.item.filter((stat: any, idx: number, arr: any) => {
      return arr.findIndex((item: any) => item.statId === stat.statId) === idx;
    });

    const options = {
      center: myLocation,
      level: 2,
    };

    const map = new kakao.maps.Map(mapRef.current, options);
    setMap(map);

    const zoomControl = new kakao.maps.ZoomControl();
    map.setDraggable(false);
    map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

    const imageSrc = require("../assets/thunder.png");
    const imageSize = new kakao.maps.Size(48, 48);
    new kakao.maps.Marker({
      map: map,
      position: myLocation,
      clickable: true,
    });
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    for (const x of arrUnique) {
      const content = `<div style="background: white; border: 1px solid black;"><span>${x.statNm}</span></div>`;
      const position = new kakao.maps.LatLng(x.lat, x.lng);
      const overlay = new kakao.maps.CustomOverlay({
        position,
        content,
        yAnchor: 3.5,
      });
      const marker = new kakao.maps.Marker({
        map: map,
        position,
        image: markerImage,
      });
      kakao.maps.event.addListener(marker, "mouseover", () => {
        overlay.setMap(map);
      });
      kakao.maps.event.addListener(marker, "mouseout", () => {
        overlay.setMap(null);
      });
      kakao.maps.event.addListener(marker, "click", () => navigate(`${x.statId}`, { state: data.items.item.filter(y => y.statId === x.statId) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [text, setText] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(text, (result: any, status: any) => {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        let marker = new kakao.maps.Marker({
          map: mapA,
          position: coords,
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        let infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:6px 0;">검색위치</div>',
        });
        infowindow.open(mapA, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        mapA.setCenter(coords);
        setLocation(coords);
        setMyLocation(coords);
      }
    });
  };

  return (
    <>
      <div ref={mapRef} style={{ width: 1200, height: 800 }} />
      <form onSubmit={onSubmit}>
        <input type="text" onChange={(e) => onChange(e)} value={text} />
        <button>확인</button>
      </form>
    </>
  );
};

export default Map;
