import axios from 'axios';
import { useEffect, useState } from 'react';

interface Statistik{
  maintenance: number,
  total_asset: number,
  use: number,
  available:number
}
export default function Statistik() {
    const [data, setData]=useState<Statistik>()

useEffect(() => {
    fetchData()
  }, []);

        const fetchData = () => {
		let config = {
			headers:
			{"Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6Im5hcnV0b0BtYWlsLmNvbSIsImV4cCI6MTY0NjEzOTc2MywiaWQiOjUsImlkX3JvbGUiOjJ9.nvvQdWdZJ_dV54G4g96sqnX2NnVJQNFXzYYNXD9cng4`}
		}
		axios
		  .get(`/assets/summary`, config)
		  .then((res) => {
			setData(res.data.data)
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
