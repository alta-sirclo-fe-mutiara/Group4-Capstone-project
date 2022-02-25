import { useState } from "react";
import ActivityCard from "../componets/ActivityCard";
import ImgModel1 from "../assets/img/peminjaman.png";
import ImgModel2 from "../assets/img/request-aset.png";

export default function EmployeeBeranda() {
	const [activity, setActivity] = useState([
		{
			image: "dummy",
			date: "20:00 20 Februari 2022",
			name: "ASUS",
			desc: "this is ASUS",
			status: "diterima",
		},
		{
			image: "dummy",
			date: "20:00 20 Februari 2022",
			name: "ASUS",
			desc: "this is ASUS",
			status: "diterima",
		},
		{
			image: "dummy",
			date: "20:00 20 Februari 2022",
			name: "ASUS",
			desc: "this is ASUS",
			status: "diterima",
		},
		{
			image: "dummy",
			date: "20:00 20 Februari 2022",
			name: "ASUS",
			desc: "this is ASUS",
			status: "diterima",
		},
		{
			image: "dummy",
			date: "20:00 20 Februari 2022",
			name: "ASUS",
			desc: "this is ASUS",
			status: "diterima",
		},
	]);
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
					<div className="row h-100 justify-content-between">
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
					<h2 className="text-left primeCol">Aktivitasmu</h2>
					<div className="scrPar mb-5">
						{activity.map((item, index) => {
							return (
								<ActivityCard
									key={index}
									desc={item.desc}
									name={item.name}
									status={item.status}
									image={require(`../assets/img/` + `${item.image}` + `.png`)}
									date={item.date}
								/>
							);
						})}
					</div>
					<h2 className="text-left mb-4 primeCol">Histori Penggunaan Aset</h2>
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
												<th className="text-center">
													{perPage * (recentPage - 1) + (index + 1)}
												</th>
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
														className="tiptool tip1 border border-1 shadow rounded-3 bg-white p-2"
														style={
															tip == pageNumber ? { display: "block" } : { display: "none" }
														}
													>
														<p
															onClick={() => setTip(0)}
															className="curs mb-0"
															data-bs-toggle="modal"
															data-bs-target="#exampleModal"
														>
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
						{data.map((item, index) => {
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
					<div className="shadow bg-white boRad text-left m-3 p-4 d-flex justify-content-between">
						<p className="w-50 m-0 p-0 font-weight-bold">Peminjaman Aset</p>
						<img className="noSpace img" src={ImgModel1} />
					</div>
					<div className=" blur shadow bg-white boRad text-left m-3 p-4 d-flex justify-content-between">
						<p className="w-50 m-0 p-0 font-weight-bold">Pengajuan Aset Baru</p>
						<img className="noSpace img" src={ImgModel2} />
					</div>
				</div>
			</div>
		</div>
	);
}
