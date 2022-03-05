import axios from "axios";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { CardAssetAdmin } from "../components/CardAsset";
import ImgDummy from "../assets/img/dummy-asset.png";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type item = {
	photo: string;
	category: string;
	name: string;
	avail_quantity: number;
	description: string;
	id: number;
	initial_quantity: number;
	is_maintenance: boolean;
	id_category: number
};

const AdminAssets = () => {
	const category = [
		{ id: 1, name: "laptop" },
		{ id: 2, name: "monitor" },
		{ id: 3, name: "printer" },
		{ id: 4, name: "proyektor" },
		{ id: 5, name: "speaker" },
		{ id: 6, name: "headset" },
		{ id: 7, name: "keybord" },
		{ id: 8, name: "mouse" },
	];

	const available = [
		{ id: 1, name: "tersedia", value: "yes" },
		{ id: 2, name: "digunakan", value: "no" },
	];

	const [asset, setAsset] = useState([]);
	const [user, setUser] = useState([]);
	const [getCategory, setGetCategory] = useState<number>(0);
	const [getAvailable, setGetAvailable] = useState<string>("yes");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		await axios
			.get("/assets")
			.then((res) => {
				const { data } = res;
				setAsset(data.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};


	const filterCategory = async (id: number) => {
		setGetCategory(id);
		await axios
			.get(`/assets?category=${id}&avail=${getAvailable}`)
			.then((res) => {
				const { data } = res;
				setAsset(data.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const filterAvailable = async (value: string) => {
		setGetAvailable(value);
		await axios
			.get(`/assets?category=${getCategory}&avail=${value}`)
			.then((res) => {
				const { data } = res;
				console.log(data.data);
				setAsset(data.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	console.log(asset)
	
	return (
		<div className="container">
			<div className="row my-3 text-center heading">
				<h1>Daftar Aset</h1>
				<p className="sub">berikut merupakan daftar aset yang tersedia</p>
			</div>
			<div className="row justify-content-between filter mx-0 my-5">
				<div className="col-6 d-flex flex-row">
					<Form.Select
						className="col-8 col-lg-4 text-capitalize btn-status text-wrap mr-3"
						aria-label="Default select example"
						onChange={(e: any) => filterCategory(e.target.value)}
					>
						<option>Filter Ketegori</option>
						{category.map((item: any, index: number) => (
							<option key={index} value={item.id}>
								{item.name}
							</option>
						))}
					</Form.Select>
					<button
						className="col-4 col-lg-2 btn btn-status"
						onClick={() => fetchData()}
					>
						All
					</button>
				</div>
				<div className="col-4 col-lg-2 text-end">
					<Form.Select
						className="text-capitalize btn-status text-wrap mr-3"
						aria-label="Default select example"
						onChange={(e: any) => filterAvailable(e.target.value)}
					>
						<option>Status Aset</option>
						{available.map((item: any, index: number) => (
							<option key={index} value={item.value}>
								{item.name}
							</option>
						))}
					</Form.Select>
				</div>
			</div>
			<div className="row d-flex justify-content-center my-4">
				{asset ? (
					asset.map((item: item, index) => {
						return (
							<div className="col-10 col-md-6 col-lg-3" key={index}>
								<CardAssetAdmin
									name={item.name}
									photo={item.photo !== "" ? item.photo : `${ImgDummy}`}
									category={item.category}
									avail={item.avail_quantity}
									description={item.description}
									initial={item.initial_quantity}
									id={item.id}
									is_maintenance={item.is_maintenance}
									id_category={item.id_category}
								/>
							</div>
						);
					})
				) : (
					<div className="text-center">Asset Tidak Tersedia...</div>
				)}
			</div>
			<div className="my-5 d-flex justify-content-center align-items-center"></div>
		</div>
	);
};

export default AdminAssets;
