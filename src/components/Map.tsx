import { useRef, useEffect } from "react";
import { Data } from "../types/interface";
const { kakao } = window;

interface Props {
  data: Data;
  myLocation: any;
}

const Map = ({ data, myLocation }: Props) => {
  const mapRef = useRef(null);

  const position = data.items.item.map((x) => {
    return new kakao.maps.LatLng(x.lat, x.lng);
  });

  useEffect(() => {
    const location = myLocation ? myLocation : position[0];

    const options = {
      center: location,
      level: 6,
    };

    const map = new kakao.maps.Map(mapRef.current, options);
    const imageSrc = require("../assets/thunder.png");
    const imageSize = new kakao.maps.Size(48, 48);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    new kakao.maps.Marker({
      map: map,
      position: location,
    });
    for (const element of position) {
      new kakao.maps.Marker({
        map: map,
        position: element,
        image: markerImage,
      });
    }
  }, [myLocation, position]);

  return <div ref={mapRef} style={{ width: 1200, height: 800 }} />;
};

export default Map;
