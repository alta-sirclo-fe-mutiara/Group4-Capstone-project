import axios from "axios";
import { useEffect, useState } from "react";

interface Statistik {
  maintenance: number;
  total_asset: number;
  use: number;
  available: number;
}
export default function Statistik() {
  const [data, setData] = useState<Statistik>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`/assets/summary`)
      .then((res) => {
        setData(res.data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row h-100 justify-content-between">
      <div className="col-6">
        <div className="shadow bg-white boRad text-left p-4 mt-2 mb-1">
          <p className="p-0 m-0">Total Aset</p>
          <p className="p-0 m-0 stat">{data?.total_asset}</p>
        </div>
      </div>
      <div className="col-6">
        <div className="shadow bg-white boRad text-left p-4 mt-2 mb-1">
          <p className="p-0 m-0">Pemeliharaan</p>
          <p className="p-0 m-0 stat">{data?.maintenance}</p>
        </div>
      </div>
      <div className="col-6">
        <div className="shadow bg-white boRad text-left p-4 mb-2 mt-1">
          <p className="p-0 m-0">Digunakan</p>
          <p className="p-0 m-0 stat">{data?.use}</p>
        </div>
      </div>
      <div className="col-6">
        <div className="shadow bg-white boRad text-left p-4 mb-2 mt-1">
          <p className="p-0 m-0">Tersedia</p>
          <p className="p-0 m-0 stat">{data?.available}</p>
        </div>
      </div>
    </div>
  );
}