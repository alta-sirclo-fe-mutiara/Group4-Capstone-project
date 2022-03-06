import { useEffect, useState } from "react";
import axios from "axios";
import { HiDotsHorizontal } from "react-icons/hi";
import ImgModel1 from "../assets/img/peminjaman.png";
import ImgModel2 from "../assets/img/request-aset.png";
import Statistik from "../components/statistik";
import ModalDetailPenggunaan from "../components/Modal/ModalDetailPenggunaan";
import { ModalPermohonanEmployee } from "../components/Modal/ModalPermohonan";
import RequestAssetModal from "../components/Modal/RequestAssetModal";

export default function EmployeeBeranda() {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [activityData, setActivityData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    fetchHistoryData();
  }, []);

  useEffect(() => {
    fetchActivityData();
  }, []);

  const fetchActivityData = () => {
    axios
      .get(`/employee/activity`)
      .then((res) => {
        if (!res.data.data.data) {
          setActivityData([]);
        } else {
          setActivityData(res.data.data.data);
        }
        console.log(activityData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchHistoryData = () => {
    axios
      .get(`/employee/history`)
      .then((res) => {
        if (!res.data.data.data) {
          setHistoryData([]);
        } else {
          setHistoryData(res.data.data.data);
        }
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const perPage = 5;
  let [recentPage, setRecentPage] = useState(1);
  const [tip, setTip] = useState(0);
  const [activTip, setActivTip] = useState(0);
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
          <h2 className="text-left primeCol">Aktivitasmu</h2>
          <div className="scrPar mb-5">
            {activityData?.map((item: any, index) => {
              let pageNumber = perPage * (recentPage - 1) + (index + 1);
              return (
                <div
                  className="shadow bg-white rounded text-left m-3 scrChi d-flex flex-column justify-content-between"
                  key={index}
                >
                  <div className="row p-3">
                    <img
                      src={item.photo}
                      className="col-5"
                      alt={item.asset_name}
                    />
                    <div className="col-7">
                      <p className="actDate noSpace">{item.request_date}</p>
                      <p className="font-weight-bold noSpace">
                        {item.asset_name}
                      </p>
                      <p className="noSpace">{item.description}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between px-3 pt-2 noSpace bGray position-relative">
                    <p className="text-capitalize">{item.status}</p>
                    <p
                      onClick={() => {
                        if (tip !== pageNumber) {
                          setActivTip(pageNumber);
                        } else {
                          setActivTip(0);
                        }
                      }}
                      className="curs px-3"
                    >
                      <HiDotsHorizontal />
                    </p>
                    <div
                      className="tiptool activTip border border-1 shadow rounded-3 bg-white px-3 py-2"
                      style={
                        activTip === pageNumber
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <p onClick={() => setActivTip(0)} className="curs mb-0">
                        <ModalPermohonanEmployee
                          photo={item.photo}
                          category={item.category}
                          asset_name={item.asset_name}
                          avail={item.avail_quantity}
                          request_date={item.request_date}
                          return_date={item.return_date}
                          status={item.status}
                          request_description={item.description}
                          id_status={item.id_status}
                          id={item.id}
                          id_asset={item.id_asset}
                          fetch={fetchActivityData}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <h2 className="text-left mb-4 primeCol">History Penggunaan Aset</h2>
          <div className="scrTabl">
            <table className="text-left tabl">
              <thead>
                <tr className="trow tCol">
                  <th className="text-center">No</th>
                  <th>Tanggal</th>
                  <th>Jenis Aktivitas</th>
                  <th>Kategori Aset</th>
                  <th>Barang</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {historyData?.map((item: any, index) => {
                  let pageNumber = perPage * (recentPage - 1) + (index + 1);
                  return (
                    <tr className="trow" key={index}>
                      <th className="text-center">
                        {perPage * (recentPage - 1) + (index + 1)}
                      </th>
                      <th>{item.request_date}</th>
                      <th>Peminjaman Barang </th>
                      <th>{item.category}</th>
                      <th>{item.asset_name}</th>
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
                            <ModalDetailPenggunaan
                              photo={item.photo}
                              category={item.category}
                              status={item.status}
                              item={item.asset_name}
                              date={item.request_date}
                              date_return={item.return_date}
                              request_description={item.description}
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
            <button
              onClick={() => prevPage()}
              className="mx-3 curs btnNone"
              disabled={recentPage === 1}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            {historyData.map((item, index) => {
              const pageMod = historyData.indexOf(item) % perPage;
              const pageDiv = historyData.indexOf(item) / perPage + 1;
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
            <button
              onClick={() => nextPage()}
              className="mx-3 curs btnNone"
              disabled={Math.ceil(historyData.length / perPage) === recentPage}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="col-md-3 primeCol">
          <div
            className=" curs shadow bg-white boRad text-left m-3 p-4 d-flex justify-content-between"
            onClick={() => setIsRequestOpen(true)}
          >
            <p className="w-50 m-0 p-0 font-weight-bold curs">
              Peminjaman Aset
            </p>
            <img
              className="noSpace img"
              src={ImgModel1}
              alt="peminjaman aset"
            />
          </div>
          <div className=" blur shadow bg-white boRad text-left m-3 p-4 d-flex justify-content-between">
            <p className="w-50 m-0 p-0 font-weight-bold">Pengajuan Aset Baru</p>
            <img
              className="noSpace img"
              src={ImgModel2}
              alt="pengajuan aset baru"
            />
          </div>
        </div>
      </div>
      <RequestAssetModal
        show={isRequestOpen}
        closeModal={() => setIsRequestOpen(false)}
        fetch={fetchActivityData}
      />
    </div>
  );
}
