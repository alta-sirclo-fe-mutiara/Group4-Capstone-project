import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

interface Props {
	show: boolean;
	closeModal: any;
	fetch?: any;
	id_category?: number;
	id_asset?: number;
}
export default function RequestAssetModal(props: Props) {
	const initialCategory = props.id_category ? props.id_category : 1;
	const initialAsset = props.id_asset ? props.id_asset : 1;
	const [categoryData, setCategoryData] = useState([]);
	const [category, setCategory] = useState<number>(initialCategory);
	const [assetData, setAssetData] = useState<any>([]);
	const [asset, setAsset] = useState<number>(initialAsset);
	const [description, setDescription] = useState("");
	const [newCategory, setNewCategory] = useState(false);
	const user = localStorage.getItem("id");
	const id_user = user ? parseInt(user) : 0;
	const id_asset = newCategory ? parseInt(assetData[0]?.id) : asset;

	useEffect(() => {
		fetchAssetData();
		fetchCategoryData();
	}, [category]);

	const fetchAssetData = () => {
		axios
			.get(`/assets?category=${category}&avail=yes`)
			.then((res) => {
				setAssetData(res.data.data.data);
				console.log(assetData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const fetchCategoryData = () => {
		axios
			.get(`/assets/categories`)
			.then((res) => {
				setCategoryData(res.data.data);
				console.log(categoryData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const requestHandle = () => {
		axios
			.post(`/requests`, {
				id_asset,
				id_user,
				description,
			})
			.then((e) => {
				alert("Permohonan Aset berhasil dilakukan !");
				console.log(e);
			})
			.catch((e) => {
				console.log(e);
			})
			.finally(() => {
				props.fetch();
			});
	};

	return (
		<Modal show={props.show}>
			<Modal.Header>
				<Modal.Title className="primeCol">Peminjaman Aset</Modal.Title>
				<i className="bi bi-x-lg curs" onClick={props.closeModal}></i>
			</Modal.Header>
			<Modal.Body className="ModalForm">
				<p>Kategori Aset</p>
				<select
					className="form-select"
					name="category"
					aria-label="Default select example"
					value={category}
					onChange={(e) => {
						setCategory(parseInt(e.target.value));
						setNewCategory(true);
					}}
				>
					{categoryData?.map((item: any, index) => {
						return (
							<option value={item.id} key={index}>
								{item.description}
							</option>
						);
					})}
					);
				</select>
				<p>Nama Aset</p>
				<select
					className="form-select"
					name="category"
					aria-label="Default select example"
					value={id_asset}
					onChange={(e) => {
						setAsset(parseInt(e.target.value));
						setNewCategory(false);
					}}
				>
					{assetData?.map((item: any, index: number) => {
						return (
							<option value={item.id} key={index}>
								{item.name}-{item.category}
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
			</Modal.Body>
			<Modal.Footer>
				<p onClick={props.closeModal} className="curs">
					Kembali
				</p>
				<Button
					className="btn-detail py-2 ms-3 border-0 curs"
					onClick={() => requestHandle()}
				>
					Request Aset
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
