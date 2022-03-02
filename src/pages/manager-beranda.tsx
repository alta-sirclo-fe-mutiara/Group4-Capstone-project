import { useState } from "react";
import ImgModel from "../assets/img/peminjaman.png";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { ModalPermohonanManager } from "../components/Modal/ModalPermohonan";

export default function ManagerBeranda() {
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

	const perPage = 3;
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
												<th>{item.date}</th>
												<th>{item.user}</th>
												<th>{item.category}</th>
												<th>{item.item}</th>
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
													{item.status === "Disetujui" || item.status === "Ditolak" ? (
														<div
															className="tiptool border border-1 shadow rounded-3 shadow bg-white px-3 py-2"
															style={
																tip === pageNumber ? { display: "block" } : { display: "none" }
															}
														>
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
																<FaCheckCircle className="mr-1" /> Diterima
															</p>
															<p onClick={() => setTip(0)} className="curs">
																<FaTimesCircle className="mr-1" />
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
				<div className="col-md-3 primeCol">
					<div className="shadow bg-white boRad text-left m-3 p-4 d-flex justify-content-between">
						<p className="w-50 noSpace font-weight-bold">Peminjaman Aset</p>
						<img className="noSpace img" src={ImgModel} />
					</div>
				</div>
			</div>
		</div>
	);
}
