import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

interface Props {
	show: boolean;
	closeModal: any;
}
//Mapping Employee, moment js format, post request
export default function AssignAssetModal(props: Props) {
	const [userData, setUserData] = useState<any>([]);
	const [asset, setAsset] = useState<string>("1");
	const [user, setUser] = useState<string>("5");
	const [assetData, setAssetData] = useState([]);
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [return_date, setReturnDate] = useState<any>({});
	const [description, setDescription] = useState("");
	const id_user = parseInt(user);
	const id_asset = parseInt(asset);

	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		fetchUserData();
	}, []);

	const fetchData = () => {
		axios
			.get(`/assets?&avail=yes`)
			.then((res) => {
				setAssetData(res.data.data.data);
				console.log(assetData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const fetchUserData = () => {
		axios
			.get(`/users`)
			.then((res) => {
				setUserData(res.data.data);
				console.log(userData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const assignHandle = () => {
		if (isChecked) {
			axios
				.post(`/requests`, {
					id_asset,
					id_user,
					description,
					return_date,
				})
				.then((e) => {
					alert("Assign Aset berhasil dilakukan !");
					console.log(e);
				})
				.catch((e) => {
					alert(e);
				});
		} else {
			axios
				.post(`/requests`, {
					id_asset,
					id_user,
					description,
				})
				.then((e) => {
					alert("Assign Aset berhasil dilakukan !");
					console.log(e);
				})
				.catch((e) => {
					alert(e);
				});
		}
	};

	return (
		<Modal show={props.show}>
			<Modal.Header>
				<Modal.Title className="primeCol">Assign Aset Ke Karyawan</Modal.Title>
				<i className="bi bi-x-lg curs" onClick={props.closeModal}></i>
			</Modal.Header>
			<Modal.Body className="ModalForm">
				<p>Nama Aset</p>
				<select
					className="form-select"
					name="category"
					aria-label="Default select example"
					value={asset}
					onChange={(e) => setAsset(e.target.value)}
				>
					{assetData?.map((item: any) => {
						return (
							<option value={item.id}>
								{item.name}-{item.category}
							</option>
						);
					})}
				</select>
				<p>Nama Karyawan</p>
				<select
					className="form-select"
					name="category"
					aria-label="Default select example"
					value={user}
					onChange={(e) => setUser(e.target.value)}
				>
					{userData?.map((item: any) => {
						return (
							<option value={item.id}>
								{item.name} - divisi {item.divisi}
							</option>
						);
					})}
				</select>
				<p>Deskripsi Aset</p>
				<textarea
					className="w-100 form-control"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<div className="form-check mt-1">
					<input
						className="form-check-input"
						type="checkbox"
						defaultChecked={isChecked}
						onChange={() => setIsChecked(!isChecked)}
					></input>
					<label className="form-check-label">Gunakan Tanggal Pengembalian</label>
				</div>
				<p>Tanggal Pengembalian</p>
				<input
					type="datetime-local"
					className="w-100 form-control"
					value={return_date}
					disabled={!isChecked}
					onChange={(e: any) => setReturnDate(e.target.value)}
				/>
			</Modal.Body>
			<Modal.Footer>
				<p onClick={props.closeModal} className="curs">
					Kembali
				</p>
				<Button
					className="btn-detail py-2 ms-3 border-0 curs"
					onClick={() => assignHandle()}
				>
					Assign Ke Karyawan
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
