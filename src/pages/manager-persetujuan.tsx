import { ModalPermohonanManager } from "../components/Modal/ModalPermohonan";
import { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Form } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

export default function PenggunaAset() {
	const [data, setData] = useState([]);
	const [request, setRequest] = useState("");
	const [returnDate, setReturnDate] = useState("");
	const [status, setStatus] = useState("all");
	const [filterDate, setFilterDate] = useState("");
	const [category, setCategory] = useState("");

	const itemCategory = [
		{ id: 1, name: "laptop" },
		{ id: 2, name: "monitor" },
		{ id: 3, name: "printer" },
		{ id: 4, name: "proyektor" },
		{ id: 5, name: "speaker" },
		{ id: 6, name: "headset" },
		{ id: 7, name: "keybord" },
		{ id: 8, name: "mouse" },
	];

	useEffect(() => {
		fetchData();
	}, [status, request, filterDate, category, returnDate]);

	const fetchData = () => {
		axios
			.get(
				`/requests?request_date=${request}&category=${category}&status=${status}&filter_date=${filterDate}&return_date=${returnDate}`
			)
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
	console.log(returnDate)
	return (
		<div className="container">
			<div className="my-3 d-flex flex-column align-items-center w-screen text-center">
				<div className="row text-center heading">
					<h1>Pengguna Aset</h1>
					<p className="sub">
						Berikut merupakan daftar pengajuan peminjaman aset karyawan
					</p>
				</div>
				<div className="my-4 statusFilter">
					<ul className="d-flex">
						<li
							onClick={() => setStatus("all")}
							className={status === "all" ? "statusCheck" : ""}
						>
							Semua
						</li>
						<li
							onClick={() => setStatus("new")}
							className={status === "new" ? "statusCheck" : ""}
						>
							Butuh Persetujuan
						</li>
						<li
							onClick={() => setStatus("using")}
							className={status === "using" ? "statusCheck" : ""}
						>
							Diterima
						</li>
						<li
							onClick={() => setStatus("reject")}
							className={status === "reject" ? "statusCheck" : ""}
						>
							Ditolak
						</li>
						<li
							onClick={() => setStatus("returned")}
							className={status === "returned" ? "statusCheck" : ""}
						>
							Dikembalikan
						</li>
					</ul>
				</div>
				<div className="statusFilterDrop">
					<Form.Select
						className="form-select"
						name="category"
						onChange={(e: any) => setStatus(e.target.value)}
						aria-label="Default select example"
					>
						<option value="all">Semua</option>
						<option value="new">Butuh Persetujuan</option>
						<option value="using">Diterima</option>
						<option value="reject">Ditolak</option>
						<option value="returned">Dikembalikan</option>
					</Form.Select>
				</div>
			</div>
			<div className="row dateFilter">
				<div className="col-6 text-left w-100 noSpace">
					<p className="noSpace font-weight-bold">Semua Pengguna</p>
					<p>{data.length} Pemohon</p>
				</div>
				<div className="col-6 d-flex flex-row">
					<Form.Select
						className="col-8 col-lg-4 text-capitalize text-wrap mr-3"
						aria-label="Default select example"
						onChange={(e: any) => setCategory(e.target.value)}
					>
						<option value={""}>Semua Ketegori</option>
						{itemCategory.map((item: any, index: number) => (
							<option key={index} value={item.name}>
								{item.name}
							</option>
						))}
					</Form.Select>
					<input
						type="date"
						className="date px-1"
						value={filterDate}
						onChange={(e) => setFilterDate(e.target.value)}
					/>
				</div>
			</div>
			<div className="scrTablP">
				<table className="text-left tablP">
					<thead>
						<tr className="trow tCol">
							<th className="text-center">No</th>
							<th>
								<div className="d-flex align-items-center">
									Tanggal
									<div className="d-flex flex-column ml-2">
										<i
											className="bi bi-caret-up-fill curs"
											onClick={() => {setRequest("latest"); setReturnDate("")}}
											style={{ height: "15px", fontSize: "15px" }}
										></i>
										<i
											className="bi bi-caret-down-fill curs"
											onClick={() => {setRequest("oldest"); setReturnDate("")}}
											style={{ fontSize: "15px" }}
										></i>
									</div>
								</div>
							</th>
							<th>Pemohon</th>
							<th>Jenis Aktivitas</th>
							<th>Kategori Aset</th>
							<th>Barang</th>
							<th>
								<div className="d-flex align-items-center">
									Sisa Waktu
									<div className="d-flex flex-column ml-2">
										<i
											className="bi bi-caret-up-fill curs"
											onClick={() => {setReturnDate("longest"); setRequest("")}}
											style={{ height: "15px", fontSize: "15px" }}
										></i>
										<i
											className="bi bi-caret-down-fill curs"
											onClick={() => {setReturnDate("shortest"); setRequest("")}}
											style={{ fontSize: "15px" }}
										></i>
									</div>
								</div>
							</th>
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
										<th>{item.request_date}</th>
										<th>{item.user_name}</th>
										<th>Peminjaman Barang</th>
										<th>{item.category}</th>
										<th>{item.return_date}</th>
										<th>
											{item.return_date === "0000-00-00 00:00:00" || item.id_status === 4 || item.id_status === 5 || item.id_status === 8? (
												<p>-</p>
											) : (
												<p
													style={
														moment(item.return_date) <= moment() ? { color: "red" } : {}
													}
												>
													{moment(item.return_date).fromNow()}
												</p>
											)}
										</th>
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
													tip === pageNumber ? { display: "block" } : { display: "none" }
												}
											>
												<p onClick={() => setTip(0)} className="curs mb-0">
													<ModalPermohonanManger
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
	);
}
