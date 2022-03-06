import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

interface Props {
	show: boolean;
	closeModal: any;
	id: number;
	photo: string;
	name: string;
	category: string;
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
				console.log(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Modal show={props.show}>
			<Modal.Header>
				<Modal.Title className="primeCol">Histori Aset</Modal.Title>
				<i className="bi bi-x-lg curs" onClick={props.closeModal}></i>
			</Modal.Header>
			<Modal.Body className="ModalForm">
				<div>
					<div className="row d-flex justify-content-center">
						<div className="col-10 col-md-6">
							<img
								src={props.photo}
								alt=""
								className="rounded-3 img-detail-aset w-100 h-100"
							/>
						</div>
						<div className="col-10 col-md-6">
							<p className="title mb-1"> {props.category} </p>
							<h5 className=""> {props.name} </h5>
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
				<p className="modalBtn curs" onClick={props.closeModal}>
					Tutup
				</p>
			</Modal.Footer>
		</Modal>
	);
}
