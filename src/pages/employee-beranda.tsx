import { useEffect, useState } from "react";
import ModalDetailPenggunaan from "../componets/Modal/ModalDetailPenggunaan";
import { ModalPermohonanEmployee } from "../componets/Modal/ModalPermohonan";
import { HiDotsHorizontal } from "react-icons/hi";
// import ActivityCard from "../componets/ActivityCard";
import ImgModel1 from "../assets/img/peminjaman.png";
import ImgModel2 from "../assets/img/request-aset.png";
import RequestAssetModal from "../componets/RequestAssetModal";
import axios from "axios"
import Statistik from "../componets/statistik";

export default function EmployeeBeranda() {
	const [isRequestOpen, setIsRequestOpen] = useState(false)
	const [activity, setActivity] = useState([]);
	const [historyData, setHistoryData] = useState([]);
	
	useEffect(() => {
		fetchActivityData();
	  }, []);

	  useEffect(() => {
		fetchHistoryData()
	  }, []);

	  const fetchActivityData = () => {
		let config = {
			headers:
			{"Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6Im5hcnV0b0BtYWlsLmNvbSIsImV4cCI6MTY0NjEzOTc2MywiaWQiOjUsImlkX3JvbGUiOjJ9.nvvQdWdZJ_dV54G4g96sqnX2NnVJQNFXzYYNXD9cng4`}
		}
		axios
		  .get(`/employee/activity`, config)
		  .then((res) => {
			setActivity(res.data.data.data)
			console.log(activity);
		  })
		  .catch((err) => {
			console.log(err);
		  });
	  };

	  const fetchHistoryData = () => {
		let config = {
			headers:
			{"Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6Im5hcnV0b0BtYWlsLmNvbSIsImV4cCI6MTY0NjEzOTc2MywiaWQiOjUsImlkX3JvbGUiOjJ9.nvvQdWdZJ_dV54G4g96sqnX2NnVJQNFXzYYNXD9cng4`}
		}
		axios
		  .get(`/employee/history`, config)
		  .then((res) => {
			setHistoryData([])
			console.log(historyData);
		  })
		  .catch((err) => {
			console.log(err);
		  });
	  };

	const perPage = 3;
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
						{activity?.map((item: any, index) => {
							let pageNumber = perPage * (recentPage - 1) + (index + 1)
							return (
								<div
									className="shadow bg-white rounded text-left m-3 scrChi d-flex flex-column justify-content-between"
									key={index}
								>
									<div className="row p-3">
									<img
											src={item.photo}
											className="col-5"
										/>
										<div className="col-7">
											<p className="actDate noSpace">{item.request_date}</p>
											<p className="font-weight-bold noSpace">{item.asset_name}</p>
											<p className="noSpace">{item.description}</p>
										</div>
									</div>
									<div className="d-flex justify-content-between px-3 pt-2 noSpace bGray position-relative">
										<p className="text-capitalize">{item.status}</p>
										<p 
										onClick={() => {
											if (tip != pageNumber) {
												setActivTip(pageNumber);
											} else {
												setActivTip(0);
											}
										}}
										className="curs px-3">
											<HiDotsHorizontal />
										</p>
										<div
														className="tiptool tip1 border border-1 shadow rounded-3 bg-white px-3 py-2"
														style={
															activTip == pageNumber ? { display: "block" } : { display: "none" }
														}
													>
										<div className="tiptool tip1 border border-1 shadow rounded-3 bg-white px-3 py-2 d-block">
											{item.status === "disetujui" ? (
												<p className="curs mb-0 ajukan">Ajukan Pengembalian</p>
											) : item.status === "tolak" ? (
												<p className="curs mb-0 ajukan">Ajukan Peminjaman Ulang</p>
											) : (
												<></>
											)}
											<ModalPermohonanEmployee
												photo={item.photo}
												category={item.category}
												item={item.asset_name}
												avail={item.avail_quantity}
												date={item.request_date}
												status={item.status}
												request_description={item.description}
											/>
										</div>
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
												<th>Peminjaman Barang</th>
												<th>{item.category}</th>
												<th>{item.asset_name}</th>
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
														<HiDotsHorizontal />
													</p>
													<div
														className="tiptool tip1 border border-1 shadow rounded-3 bg-white px-3 py-2"
														style={
															tip == pageNumber ? { display: "block" } : { display: "none" }
														}
													>
														<ModalDetailPenggunaan
															photo={item.photo}
															category={item.category}
															status={item.status}
															item={item.asset_name}
															date={item.request_date}
															date_return={item.return_date}
															request_description={item.description}
														/>
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
						{historyData.map((item, index) => {
							const pageMod = historyData.indexOf(item) % perPage;
							const pageDiv = historyData.indexOf(item) / perPage + 1;
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
					<div className=" curs shadow bg-white boRad text-left m-3 p-4 d-flex justify-content-between" onClick={()=>setIsRequestOpen(true)}>
						<p className="w-50 m-0 p-0 font-weight-bold">Peminjaman Aset</p>
						<img className="noSpace img" src={ImgModel1} />
					</div>
					<div className=" blur shadow bg-white boRad text-left m-3 p-4 d-flex justify-content-between">
						<p className="w-50 m-0 p-0 font-weight-bold">Pengajuan Aset Baru</p>
						<img className="noSpace img" src={ImgModel2} />
					</div>
				</div>
			</div>
			<RequestAssetModal show={isRequestOpen} closeModal={()=>setIsRequestOpen(false)} />
		</div>
	);
}
