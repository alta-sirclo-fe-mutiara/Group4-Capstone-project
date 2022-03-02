import { FaUserCircle } from "react-icons/fa";

type Props = {
	photo: string;
	category?: string;
	avail: number;
	name: string;
	description: string;
	user?: string;
};

const CardAsset = (props: Props) => {
	return (
		<div className="card card-asset mb-3">
			<div className="card-body">
				<div className="row mt-3">
					<img src={props.photo} alt="" className="rounded-3 img-asset" />
				</div>
				<div className="row mt-3 asset-info justify-content-between">
					<div className="col-5">{props.category}</div>
					<div className="col-7 text-end">{props.avail} item tersedia</div>
				</div>
				<div className="row mt-3 asset-content">
					<h5 className="card-title"> {props.name} </h5>
					<p className="card-text">
						{props.description.length > 20
							? `${props.description.substring(0, 20)} ...`
							: props.description}
					</p>
				</div>
				<div className="row pinjam justify-content-center mt-3">
					<button className="btn col-10 col-xl-11 btn-aset">
						Ajukan Peminjaman
					</button>
				</div>
			</div>
		</div>
	);
};

const CardAssetAdmin = (props: Props) => {
	return (
		<div className="card card-asset-admin mb-3">
			<div className="card-body">
				<div className="row mt-3">
					<img src={props.photo} alt="" className="rounded-3 img-asset" />
				</div>
				<div className="row mt-3 asset-info justify-content-between">
					<div className="col-5">{props.category}</div>
					<div className="col-7 text-end">{props.avail} item tersedia</div>
				</div>
				<div className="row mt-3 asset-content">
					<h5 className="card-title text-capitalize mb-0"> {props.name} </h5>
					<p className="card-text">
						{props.description.length > 35
							? `${props.description.substring(0, 35)} ...`
							: props.description}
					</p>
				</div>
				<div className="row mt-2 d-flex justify-content-center aset-user">
					<div className="col-2 text-center px-0">
						<FaUserCircle className="ico-user w-100" />
					</div>
					<div className="col-10 ps-0">
						<p className="count-user px-0">{props.user} pengguna</p>
					</div>
				</div>
				<div className="row pinjam justify-content-center mt-2">
					<button className="btn col-10 col-xl-11 btn-aset">Lihat Detail</button>
				</div>
			</div>
		</div>
	);
};

export { CardAsset, CardAssetAdmin };
