import { useState, useEffect } from "react";
import ImgModel from "../assets/img/peminjaman.png";
import { HiDotsHorizontal } from "react-icons/hi";
import { ModalPermohonanManager } from "../componets/Modal/ModalPermohonan";
import Statistik from "../componets/statistik";
import axios from "axios";

export default function ManagerBeranda() {
  const [data, setData] = useState([]);
  const perPage = 5;
  let [recentPage, setRecentPage] = useState(1);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`/requests`)
      .then((res) => {
        setData(res.data.data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nextPage = () => {
    setRecentPage((recentPage += 1));
  };
  const prevPage = () => {
    setRecentPage((recentPage -= 1));
  };

  return (
    <div className="container">
      <div className="row mt-3 primeCol">
        <div className="imageHolder col-md-8 d-flex ban justify-content-center align-items-center text-left imgHold">
          <h1 className="banner">
            Welcome to <br /> E-Assets
          </h1>
        </div>
        <div className="col-md-4 stats">
          <Statistik />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-9">
          <h2 className="text-left mb-4 primeCol">Permohonan Persetujuan</h2>
          <div className="scrTabl">
            <table className="text-left tabl">
              <thead>
                <tr className="trow tCol">
                  <th className="text-center">No</th>
                  <th>Tanggal</th>
                  <th>Pemohon</th>
                  <th>Kategori Aset</th>
                  <th>Barang</th>
                  <th>status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data
                  ?.slice((recentPage - 1) * perPage, perPage * recentPage)
                  .map((item: any, index) => {
                    let pageNumber = perPage * (recentPage - 1) + (index + 1);
                    return (
                      <tr className="trow" key={index}>
                        <th className="text-center">
                          {perPage * (recentPage - 1) + (index + 1)}
                        </th>
                        <th>{item.request_date}</th>
                        <th>{item.user_name}</th>
                        <th>{item.category}</th>
                        <th>{item.asset_name}</th>
                        <th>{item.status}</th>
                        <th className="position-relative">
                        <p
                            onClick={() => {
                              if (tip !== pageNumber) {
                                setTip(pageNumber);
                              } else {
                                setTip(0);
                              }
                            }}
                            className="curs px-3"
                          >
                            <HiDotsHorizontal />
                          </p>
                          <div
                            className="tiptool tip1 border border-1 shadow rounded-3 bg-white px-3 py-2"
                            style={
                              tip === pageNumber
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            <p onClick={() => setTip(0)} className="curs mb-0">
                              <ModalPermohonanManager
                                photo={item.photo}
                                category={item.category}
                                item={item.asset_name}
                                avail={item.avail_quantity}
                                user={item.user_name}
                                date={item.request_date}
                                status={item.status}
                                divisi={"tech"}
                                request_description={item.description}
                                manager={"Ultramen"}
                                id_status={item.id_status}
							                	id={item.id}
                                fetch={fetchData}
                              />
                            </p>
                          </div>
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="my-5 d-flex justify-content-center align-items-center">
            <p onClick={() => prevPage()} className="mx-3 curs">
              <i className="bi bi-chevron-left"></i>
            </p>
            {data.map((item, index) => {
              const pageMod = data.indexOf(item) % perPage;
              const pageDiv = data.indexOf(item) / perPage + 1;
              return (
                <div key={index}>
                  <p
                    className={pageMod === 0 ? "py-2 px-3" : ""}
                    style={
                      pageDiv === recentPage
                        ? { color: "white", backgroundColor: "#2c7a75" }
                        : { color: "rgb(12,13,54)" }
                    }
                  >
                    {pageMod === 0 ? pageDiv : null}
                  </p>
                </div>
              );
            })}
            <p onClick={() => nextPage()} className="mx-3 curs">
              <i className="bi bi-chevron-right"></i>
            </p>
          </div>
        </div>
        <div className="col-md-3 primeCol">
          <div className="blur shadow bg-white boRad text-left m-3 p-4 d-flex justify-content-between">
            <p className="w-50 noSpace font-weight-bold">Peminjaman Aset</p>
            <img className="noSpace img" src={ImgModel} alt="Peminjaman Aset" />
          </div>
        </div>
      </div>
    </div>
  );
}
