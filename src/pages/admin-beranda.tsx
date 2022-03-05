import { useEffect, useState } from "react";
import { ModalPermohonanAset } from "../components/Modal/ModalPermohonan";
import { HiDotsHorizontal } from "react-icons/hi";
import ImgModel1 from "../assets/img/peminjaman.png";
import ImgModel2 from "../assets/img/assign to employee.png";
import AddAssetModal from "../components/Modal/AddAssetModal";
import AssignAssetModal from "../components/Modal/AssignAssetModal";
import Statistik from "../components/statistik";
import axios from "axios";

export default function AdminBeranda() {
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [isAssignAssetOpen, setIsAssignAssetOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`/requests?status=new`)
      .then((res) => {
        if (!res.data.data.data) {
          setData([]);
        } else {
          setData(res.data.data.data);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const perPage = 5;
  let [recentPage, setRecentPage] = useState(1);
  const [tip, setTip] = useState(0);

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
          <h2 className="text-left mb-4 primeCol">Permohonan Terbaru</h2>
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
                {data
                  ?.slice((recentPage - 1) * perPage, perPage * recentPage)
                  .map((item: any, index) => {
                    let pageNumber = perPage * (recentPage - 1) + (index + 1);
                    return (
                      <tr className="trow" key={index}>
                        <th className="text-center">{pageNumber}</th>
                        <th>{item.request_date}</th>
                        <th>Peminjaman Barang</th>
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
                              <ModalPermohonanAset
                                photo={item.photo}
                                category={item.category}
                                asset_name={item.asset_name}
                                avail={item.avail_quantity}
                                user={item.user_name}
                                request_date={item.request_date}
                                return_date={item.return_date}
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
            <button
              onClick={() => prevPage()}
              className="mx-3 curs btnNone"
              disabled={recentPage === 1}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
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
            <button
              onClick={() => nextPage()}
              className="mx-3 curs btnNone"
              disabled={Math.ceil(data.length / perPage) === recentPage}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="col-md-3 primeCol">
          <div
            className="shadow bg-white boRad text-left m-3 p-4 d-flex justify-content-between"
            onClick={() => setIsAddAssetOpen(true)}
          >
            <p className="w-50 m-0 p-0 font-weight-bold">Tambah Aset Baru</p>
            <img
              className="noSpace img"
              src={ImgModel1}
              alt="tambah aset baru"
            />
          </div>
          <div
            className="shadow bg-white boRad text-left m-3 p-4 d-flex justify-content-between"
            onClick={() => setIsAssignAssetOpen(true)}
          >
            <p className="w-50 m-0 p-0 font-weight-bold">
              Assign Aset Ke Karyawan
            </p>
            <img
              className="noSpace img"
              src={ImgModel2}
              alt="assign aset ke karyawan"
            />
          </div>
        </div>
      </div>
      <AddAssetModal
        show={isAddAssetOpen}
        closeModal={() => setIsAddAssetOpen(false)}
      />
      <AssignAssetModal
        show={isAssignAssetOpen}
        closeModal={() => setIsAssignAssetOpen(false)}
      />
    </div>
  );
}
