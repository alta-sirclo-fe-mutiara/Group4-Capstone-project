import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ImgDummy from "../../assets/img/dummy-asset.png";

interface Props {
	show: boolean;
	closeModal: any;
	id: number;
}

export default function UsageHistoryModal(props: Props) {
	const [history, setHistory] = useState([]);
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [photo, setPhoto] = useState("");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		axios
			.get(`/assets/usage/${props.id}`)
			.then((res) => {
				setHistory(res.data.data.List_history);
				setName(res.data.data.name);
				setCategory(res.data.data.category);
				setPhoto(res.data.data.photo);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	console.log(history, props.id);
	return (
		<Modal show={props.show}>
			<Modal.Header>
				<Modal.Title className="primeCol">History Aset</Modal.Title>
				<i className="bi bi-x-lg curs" onClick={props.closeModal}></i>
			</Modal.Header>
			<Modal.Body className="ModalForm">
				<div>
					<div className="row d-flex justify-content-center my-2">
						<div className="col-10 col-md-6">
							<img
								src={photo !== "" ? photo : `${ImgDummy}`}
								alt=""
								className="rounded-3 img-detail-aset w-100 h-100"
							/>
						</div>
						<div className="col-10 col-md-6">
							<p className="title mb-1"> {category} </p>
							<h5 className=""> {name} </h5>
						</div>
					</div>
					<div className="scrTabl">
						<table className="text-left tabl">
							<thead>
								<tr className="trow tCol">
									<th className="text-center">No</th>
									<th>Pemohon</th>
									<th>Tanggal</th>
									<th>Status</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{history?.map((item: any, index) => {
									return (
										<tr className="trow" key={index}>
											<th className="text-center">{index + 1}</th>
											<th>{item.name}</th>
											<th>{item.request_date}</th>
											<th>{item.status}</th>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button className="btn-detail border-0 curs" onClick={props.closeModal}>
					Tutup
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
