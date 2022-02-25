import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";

export default function PenggunaAset (){
    const [data, setData] = useState([
        {
          date: "19:45 17 Agustus 2022",
          activity: "Peminjaman Barang",
          category: "Printer",
          item: "Canon 145D",
          user: "Alex Madagascar",
          time: "35 days",
          status: "Digunakan"
        },
        {
          date: "19:45 17 Agustus 2022",
          activity: "Peminjaman Barang",
          category: "Printer",
          item: "Canon 145D",
          user: "Alex Madagascar",
          time: "35 days",
          status: "Ditolak"
        },
        {
          date: "19:45 17 Agustus 2022",
          activity: "Peminjaman Barang",
          category: "Printer",
          item: "Canon 145D",
          user: "Alex Madagascar",
          time: "35 days",
          status: "Menunggu Persetujuan"
        },
        {
          date: "19:45 17 Agustus 2022",
          activity: "Peminjaman Barang",
          category: "Printer",
          item: "Canon 145D",
          user: "Alex Madagascar",
          time: "35 days",
          status: "Dikembalikan"
        },
        {
          date: "19:45 17 Agustus 2022",
          activity: "Peminjaman Barang",
          category: "Printer",
          item: "Canon 145D",user: "Alex Madagascar",
          time: "35 days",
          status: "Permohonan Baru"
        },
        {
          date: "19:45 17 Agustus 2022",
          activity: "Peminjaman Barang",
          category: "Printer",
          item: "Canon 145D",
          user: "Alex Madagascar",
          time: "35 days",
          status: "Minta Dikembalikan"
        },
        {
          date: "19:45 17 Agustus 2022",
          activity: "Peminjaman Barang",
          category: "Printer",
          item: "Canon 145D",
          user: "Alex Madagascar",
          time: "35 days",
          status: "Minta Persetujuan"
        },
        {
          date: "19:45 17 Agustus 2022",
          activity: "Peminjaman Barang",
          category: "Printer",
          item: "Canon 145D",
          user: "Alex Madagascar",
          time: "35 days",
          status: "Digunakan"
        },
        {
          date: "19:45 17 Agustus 2022",
          activity: "Peminjaman Barang",
          category: "Printer",
          item: "Canon 145D",
          user: "Alex Madagascar",
          time: "35 days",
          status: "Ditolak"
        },
        {
          date: "19:45 17 Agustus 2022",
          activity: "Peminjaman Barang",
          category: "Printer",
          item: "Canon 145D",user: "Alex Madagascar",
          time: "35 days",
          status: "Menunggu Persetujuan"
        }
      ]);
      const perPage = 4;
      let [recentPage, setRecentPage] = useState(1);
      const [tip, setTip] = useState(0);
      const nextPage = () => {
        setRecentPage((recentPage += 1));
      };
      const prevPage = () => {
        setRecentPage((recentPage -= 1));
      };

    return(
        <div className="container">
            <div className="d-flex flex-column align-items-center w-screen text-center">
                <h2 className="primeCol">Pengguna Aset</h2>
                <p>Berikut merupakan daftar pengajuan peminjaman aset karyawan</p>
                <div className="my-4 statusFilter">
                    <ul className="d-flex">
                        <li>Semua</li>
                        <li>Butuh Persetujuan</li>
                        <li>Disetujui</li>
                        <li>Ditolak</li>
                        <li>Dikembalikan</li>
                    </ul>
                </div>
                <div className="statusFilterDrop">
                <select className="form-select" name="category" aria-label="Default select example">
                                    <option value="default">Semua</option>
                                    <option value="default">Butuh Persetujuan</option>
                                    <option value="default">Disetujui</option>
                                    <option value="default">Ditolak</option>
                                    <option value="default">Dikembalikan</option>
                                </select>
                </div>
            </div>
            <div className="dateFilter">
                <div className="text-left w-100 noSpace">
                    <p className="noSpace font-weight-bold">Semua Pengguna</p>
                    <p>{data.length} Pemohon</p>
                </div>
                <input type="date" className="date"/>
            </div>
            <div className="scrTablP">
            <table className="text-left tablP">
              <thead>
                <tr className="trow tCol">
                  <th className="text-center">No</th>
                  <th>Tanggal</th>
                  <th>Pemohon</th>
                  <th>Jenis Aktivitas</th>
                  <th>Kategori Aset</th>
                  <th>Barang</th>
                  <th>Sisa Waktu</th>
                  <th>Status</th>
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
                        <th>{item.user}</th>
                        <th>{item.activity}</th>
                        <th>{item.category}</th>
                        <th>{item.item}</th>
                        <th>{item.time}</th>
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
                            ...
                          </p>
                          {item.status === "Ditolak" ||item.status === "Dikembalikan" ||item.status === "Minta Dikembalikan"||item.status === "Menunggu Persetujuan"  ? (
                            <div
                              className="tiptool tip1 shadow bg-white p-2 pb-0"
                              style={
                                tip === pageNumber
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            >
                              <p onClick={() => setTip(0)} className="curs">
                                Lihat Detail
                              </p>
                            </div>
                          ) :
                          item.status === "Permohonan Baru"  ? (
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
                          )
                          :
                          item.status === "Digunakan"  ? (
                            <div
                              className="tiptool tip2 shadow bg-white p-2 pb-0"
                              style={
                                tip === pageNumber
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            >
                              <p onClick={() => setTip(0)} className="curs">
                                Ajukan Pengembalian
                              </p>
                              <p onClick={() => setTip(0)} className="curs">
                                Lihat Detail
                              </p>
                            </div>
                          )
                          : (
                            <div
                              className="tiptool tip3 shadow bg-white p-2 pb-0"
                              style={
                                tip === pageNumber
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            >
                              <p onClick={() => setTip(0)} className="curs">
                              <FaCheckCircle className="mr-1"/> Diterima
                              </p>
                              <p onClick={() => setTip(0)} className="curs">
                                <FaTimesCircle className="mr-1"/>Ditolak
                              </p>
                              <p onClick={() => setTip(0)} className="curs">
                                Lihat Detail
                              </p>
                            </div>
                          )}
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
    )
}