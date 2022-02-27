import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import ModalPermohonanManager from "../componets/Modal/ModalPermohonanManager";

export default function PermohonanPersetujuan() {
	const [data, setData] = useState([
		{
			date: "19:45 17 Agustus 2022",
			date_return: "-",
			activity: "Peminjaman Barang",
			photo: "image 4",
			category: "Laptop",
			item: "Apple Macbook Air",
			avail: 7,
			user: "Alex Madagascar",
			divisi: "Tech",
			time: "35 days",
			status: "Ditolak",
		},
		{
			date: "19:45 17 Agustus 2022",
			date_return: "9:45 27 Agustus 2022",
			activity: "Peminjaman Barang",
			photo: "image 5",
			category: "Monitor",
			item: "Monitor LG LED 22",
			avail: 7,
			user: "Beth Hamone",
			divisi: "Tech",
			time: "-",
			status: "Dikembalikan",
		},
		{
			date: "19:45 17 Agustus 2022",
			date_return: "-",
			activity: "Peminjaman Barang",
			photo: "image 5",
			category: "Printer",
			item: "Canon 145D",
			avail: 7,
			user: "Alex Madagascar",
			time: "35 days",
			status: "Menunggu Persetujuan",
			divisi: "Tech",
		},
		{
			date: "19:45 17 Agustus 2022",
			date_return: "-",
			activity: "Peminjaman Barang",
			photo: "image 6",
			category: "Printer",
			avail: 7,
			item: "Canon 145D",
			user: "Alex Madagascar",
			time: "35 days",
			status: "Disetujui",
			divisi: "Tech",
		},
		{
			date: "19:45 17 Agustus 2022",
			date_return: "-",
			activity: "Peminjaman Barang",
			photo: "image 5",
			category: "Printer",
			avail: 7,
			item: "Canon 145D",
			user: "Alex Madagascar",
			time: "35 days",
			status: "Disetujui",
			divisi: "Tech",
		},
		{
			date: "19:45 17 Agustus 2022",
			date_return: "-",
			activity: "Peminjaman Barang",
			photo: "image 5",
			category: "Printer",
			avail: 7,
			item: "Canon 145D",
			user: "Alex Madagascar",
			time: "35 days",
			status: "Ditolak",
			divisi: "Tech",
		},
		{
			date: "19:45 17 Agustus 2022",
			date_return: "-",
			activity: "Peminjaman Barang",
			photo: "image 6",
			category: "Printer",
			avail: 7,
			item: "Canon 145D",
			user: "Alex Madagascar",
			time: "35 days",
			status: "Menunggu Persetujuan",
			divisi: "Tech",
		},
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

	return (
		<div className="container">
			<div className="d-flex flex-column align-items-center w-screen text-center">
				<h2 className="primeCol">Permohonan Persetujuan</h2>
				<p>Berikut merupakan daftar persetujuan peminjaman aset karyawan</p>
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
					<select
						className="form-select"
						name="category"
						aria-label="Default select example"
					>
						<option value="default">Semua</option>
						<option value="default">Butuh Persetujuan</option>
						<option value="default">Disetujui</option>
						<option value="default">Ditolak</option>
						<option value="default">Dikembalikan</option>
					</select>
				</div>
			</div>
			<div className="dateFilter ">
				<div className="text-left w-100 noSpace">
					<p className="noSpace font-weight-bold">Semua Pengguna</p>
					<p>{data.length} Pemohon</p>
				</div>
				<input type="date" className="date" />
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
												<HiDotsHorizontal />
											</p>
											{item.status === "Disetujui" ||
											item.status === "Ditolak" ||
											item.status === "Dikembalikan" ? (
												<div
													className="tiptool border border-1 shadow rounded-3 tip1 shadow bg-white px-3 py-2"
													style={
														tip === pageNumber ? { display: "block" } : { display: "none" }
													}
												>
													{/* <p onClick={() => setTip(0)} className="curs mb-0">
														Lihat Detail
													</p> */}
													<ModalPermohonanManager
														photo={item.photo}
														category={item.category}
														item={item.item}
														avail={item.avail}
														user={item.user}
														date={item.date}
														divisi={item.divisi}
														date_return={item.date_return}
														status={item.status}
														time={item.time}
														request_description={item.request_description}
													/>
												</div>
											) : (
												<div
													className="tiptool tip3 border border-1 shadow rounded-3 shadow bg-white px-3 py-2"
													style={
														tip === pageNumber ? { display: "block" } : { display: "none" }
													}
												>
													<p onClick={() => setTip(0)} className="curs">
														<FaCheckCircle className="mr-2" />
														Diterima
													</p>
													<p onClick={() => setTip(0)} className="curs">
														<FaTimesCircle className="mr-2" />
														Ditolak
													</p>
													<ModalPermohonanManager
														photo={item.photo}
														category={item.category}
														item={item.item}
														avail={item.avail}
														user={item.user}
														date={item.date}
														divisi={item.divisi}
														date_return={item.date_return}
														status={item.status}
														time={item.time}
														request_description={item.request_description}
													/>
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
	);
}
