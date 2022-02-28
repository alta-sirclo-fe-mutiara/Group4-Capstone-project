import { useState } from "react";
import ImgModel1 from "../assets/img/peminjaman.png";
import ImgModel2 from "../assets/img/assign to employee.png";
import AddAssetModal from "../componets/AddAssetModal";
import AssignAssetModal from "../componets/AssignAssetModal";

export default function AdminBeranda() {
  const [data, setData] = useState([
    {
      date: "19:45 17 Agustus 2022",
      activity: "Peminjaman Barang",
      category: "Printer",
      item: "Canon 145D",
    },
    {
      date: "19:45 17 Agustus 2022",
      activity: "Peminjaman Barang",
      category: "Printer",
      item: "Canon 145D",
    },
    {
      date: "19:45 17 Agustus 2022",
      activity: "Peminjaman Barang",
      category: "Printer",
      item: "Canon 145D",
    },
    {
      date: "19:45 17 Agustus 2022",
      activity: "Peminjaman Barang",
      category: "Printer",
      item: "Canon 145D",
    },
    {
      date: "19:45 17 Agustus 2022",
      activity: "Peminjaman Barang",
      category: "Printer",
      item: "Canon 145D",
    },
  ]);
  const perPage = 3;
  let [recentPage, setRecentPage] = useState(1);
  const [tip, setTip] = useState(0);
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false)
  const [isAssignAssetOpen, setIsAssignAssetOpen] = useState(false)
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
          <div className="row h-100 justify-content-around">
            <div className="col-6">
              <div className="shadow bg-white boRad text-left p-4 mt-2 mb-1">
                <p className="p-0 m-0">Total Aset</p>
                <p className="p-0 m-0 stat">100</p>
              </div>
            </div>
            <div className="col-6">
              <div className="shadow bg-white boRad text-left p-4 mt-2 mb-1">
                <p className="p-0 m-0">Pemeliharaan</p>
                <p className="p-0 m-0 stat">100</p>
              </div>
            </div>
            <div className="col-6">
              <div className="shadow bg-white boRad text-left p-4 mb-2 mt-1">
                <p className="p-0 m-0">Digunakan</p>
                <p className="p-0 m-0 stat">100</p>
              </div>
            </div>
            <div className="col-6">
              <div className="shadow bg-white boRad text-left p-4 mb-2 mt-1">
                <p className="p-0 m-0">Tersedia</p>
                <p className="p-0 m-0 stat">30</p>
              </div>
            </div>
          </div>
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
                        <th>{item.date}</th>
                        <th>{item.activity}</th>
                        <th>{item.category}</th>
                        <th>{item.item}</th>
                        <th className="position-relative">
                          <p
                            onClick={() => {
                              if (tip != pageNumber) {
                                setTip(pageNumber);
                              } else {
                                setTip(0);
                              }
                            }}
                            className="curs px-3"
                          >
                            ...
                          </p>
                          <div
                            className="tiptool tip2 shadow bg-white p-2 pb-0"
                            style={
                              tip == pageNumber
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            <p onClick={() => setTip(0)} className="curs">
                              Minta Persetujuan
                            </p>
                            <p onClick={() => setTip(0)} className="curs">
                              Lihat Detail
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
            {data.map((item,index) => {
              const pageMod = data.indexOf(item) % perPage;
              const pageDiv = data.indexOf(item) / perPage + 1;
              return (
                <div key={index}>
                  <p
                    className={pageMod == 0 ? "py-2 px-3" : ""}
                    style={
                      pageDiv == recentPage
                        ? { color: "white", backgroundColor: "#2c7a75" }
                        : { color: "rgb(12,13,54)" }
                    }
                  >
                    {pageMod == 0 ? pageDiv : null}
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
          <div className="curs shadow bg-white boRad text-left m-3 p-4 d-flex justify-content-between" onClick={()=>setIsAddAssetOpen(true)}>
            <p className="w-50 m-0 p-0 font-weight-bold">Tambah Aset Baru</p>
            <img className="noSpace img" src={ImgModel1} />
          </div>
          <div className="curs shadow bg-white boRad text-left m-3 p-4 d-flex justify-content-between" onClick={()=>setIsAssignAssetOpen(true)}>
            <p className="w-50 m-0 p-0 font-weight-bold">
              Assign Aset Ke Karyawan
            </p>
            <img className="noSpace img" src={ImgModel2} />
          </div>
        </div>
      </div>
      {/*MODAL*/}
      <div>
        <AddAssetModal show={isAddAssetOpen} closeModal={()=>setIsAddAssetOpen(false)}/>
        <AssignAssetModal show={isAssignAssetOpen} closeModal={()=>setIsAssignAssetOpen(false)}/>
      </div>
    </div>
  );
}
