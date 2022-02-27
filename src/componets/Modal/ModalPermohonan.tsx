import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

type Props = {
	photo: String;
	category: String;
	item?: String;
	avail?: number;
	user?: String;
	date: String;
	divisi?: String;
	date_return?: String;
	status: String;
	time?: String;
	manager?: String;
	request_description: String;
};

const ModalPermohonanManager = (props: Props) => {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	return (
		<>
			<p onClick={handleShow} className="curs mb-0">
				Lihat Detail
			</p>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton className="border-0">
					<Modal.Title className="modal-title">Detail Permohonan</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="container">
						<div className="row d-flex justify-content-center">
							<div className="col-10 col-md-6">
								<img
									src={require(`../../assets/img/` + `${props.photo}` + `.png`)}
									alt=""
									className="rounded-3 img-detail-aset"
								/>
							</div>
							<div className="col-10 col-md-6">
								<p className="title mb-1"> {props.category} </p>
								<h5 className=""> {props.item} </h5>
								<p className="title mb-1"> {props.avail} item tersedia</p>
							</div>
						</div>
						<div className="row d-flex justify-content-center mt-3">
							<div className="col-10 col-md-6 mb-2">
								<h6 className="title">Pemohon</h6>
								<p className="content">{props.user}</p>
							</div>
							<div className="col-10 col-md-6">
								<h6 className="title">Waktu Pengajuan</h6>
								<p className="content">{props.date}</p>
							</div>
							<div className="col-10 col-md-6 mb-2">
								<h6 className="title">Divisi</h6>
								<p className="content">{props.divisi}</p>
							</div>
							<div className="col-10 col-md-6 mb-2">
								<h6 className="title">Waktu Pengembalian</h6>
								<p className="content">{props.date_return}</p>
							</div>
						</div>
						<div className="row">
							{props.status === "Disetujui" ||
							props.status === "Ditolak" ||
							props.status === "Dikembalikan" ? (
								<>
									<div className="col-10 col-md-6 mb-2">
										<h6 className="title">Status</h6>
										<div className="col-8 p-2 status-detail-aset text-center">
											{props.status}
										</div>
									</div>
									<div className="col-10 col-md-6 mb-2">
										<h6 className="title">Sisa Waktu </h6>
										<p className="content">{props.time}</p>
									</div>
								</>
							) : (
								<>
									<div className="col-10 col-md-6 mb-2">
										<h6 className="title">Status</h6>
										<div className="col-11 p-2 status-detail-aset text-center">
											{props.status}
										</div>
									</div>
									<div className="col-10 col-md-6 mb-2">
										<h6 className="title">Sisa Waktu </h6>
										<p className="content">{props.time}</p>
									</div>
								</>
							)}
						</div>
						<div className="row">
							<div className="col-10 col-md-6">
								<h6 className="title">Keterangan</h6>
								<p className="content">{props.request_description}</p>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer className="border-0">
					{props.status === "Disetujui" ||
					props.status === "Ditolak" ||
					props.status === "Dikembalikan" ? (
						<Button className="btn-detail py-2 ms-3 border-0" onClick={handleClose}>
							Tutup
						</Button>
					) : (
						<>
							<p className="curs" onClick={handleClose}>
								Tolak
							</p>
							<Button className="btn-detail py-2 ms-3 border-0" onClick={handleClose}>
								Terima Permohonan
							</Button>
						</>
					)}
				</Modal.Footer>
			</Modal>
		</>
	);
};

const ModalPermohonanEmployee = (props: Props) => {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	return (
		<>
			<p onClick={handleShow} className="curs mb-0">
				Lihat Detail
			</p>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton className="border-0">
					<Modal.Title className="modal-title">Detail Permohonan</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="container">
						<div className="row d-flex justify-content-center">
							<div className="col-10 col-md-6">
								<img
									src={require(`../../assets/img/` + `${props.photo}` + `.png`)}
									alt=""
									className="rounded-3 img-detail-aset"
								/>
							</div>
							<div className="col-10 col-md-6">
								<p className="title mb-1"> {props.category} </p>
								<h5 className=""> {props.item} </h5>
								{props.status === "menunggu persetujuan" ? (
									<p className="title mb-1"> {props.avail} item tersedia</p>
								) : (
									<></>
								)}
							</div>
						</div>
						<div className="row mt-3">
							{props.status === "disetujui" || props.status === "tolak" ? (
								<>
									<div className="col-10 col-md-6 mb-2">
										<h6 className="title">Status</h6>
										<div className="col-8 p-2 status-detail-aset text-center">
											{props.status}
										</div>
									</div>
									<div className="col-10 col-md-6 mb-2">
										<h6 className="title">Waktu Pengajuan</h6>
										<p className="content">{props.date}</p>
									</div>
								</>
							) : (
								<>
									<div className="col-10 col-md-6 mb-2">
										<h6 className="title">Status</h6>
										<div className="col-11 p-2 status-detail-aset text-center">
											{props.status}
										</div>
									</div>
									<div className="col-10 col-md-6 mb-2">
										<h6 className="title">Waktu Pengajuan</h6>
										<p className="content">{props.date}</p>
									</div>
								</>
							)}
						</div>
						<div className="row justify-content-end">
							<div className="col-10 col-md-6">
								<h6 className="title">Keterangan</h6>
								<p className="content">{props.request_description}</p>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer className="border-0">
					{props.status === "menunggu persetujuan" ? (
						<>
							<p className="curs" onClick={handleClose}>
								Batalkan Pengajuan
							</p>
							<Button className="btn-detail py-2 ms-3 border-0" onClick={handleClose}>
								Kembali
							</Button>
						</>
					) : props.status === "disetujui" ? (
						<>
							<p className="curs" onClick={handleClose}>
								Kembali
							</p>
							<Button className="btn-detail py-2 ms-3 border-0" onClick={handleClose}>
								Ajukan Pengembalian
							</Button>
						</>
					) : (
						<>
							<p className="curs" onClick={handleClose}>
								Kembali
							</p>
							<Button className="btn-detail py-2 ms-3 border-0" onClick={handleClose}>
								Ajukan Peminjaman Ulang
							</Button>
						</>
					)}
				</Modal.Footer>
			</Modal>
		</>
	);
};

const ModalPermohonanAset = (props: Props) => {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	return (
		<>
			<p onClick={handleShow} className="curs mb-0">
				Lihat Detail
			</p>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton className="border-0">
					<Modal.Title className="modal-title">Detail Permohonan Aset</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="container">
						<div className="row d-flex justify-content-center">
							<div className="col-10 col-md-4">
								<img
									src={require(`../../assets/img/` + `${props.photo}` + `.png`)}
									alt=""
									className="rounded-3 img-detail-aset"
								/>
							</div>
							<div className="col-10 col-md-8">
								<p className="title mb-1"> {props.category} </p>
								<h5 className=""> {props.item} </h5>
								{props.status === "menunggu persetujuan" ? (
									<p className="title mb-1"> {props.avail} item tersedia</p>
								) : (
									<></>
								)}
							</div>
						</div>
						<div className="row mt-3">
							<div className="col-10 col-md-6 mb-2">
								<h6 className="title">Pemohon</h6>
								<div className="col-10 p-2">{props.user}</div>
							</div>
							<div className="col-10 col-md-6 mb-2">
								<h6 className="title">Waktu Pengajuan</h6>
								<p className="content">{props.date}</p>
							</div>
							<div className="col-10 col-md-6 mb-2">
								<h6 className="title">Divisi</h6>
								<p className="content">{props.divisi}</p>
							</div>
							{props.status === "menunggu persetujuan" ? (
								<>
									<div className="col-10 col-md-6 mb-2">
										<h6 className="title">Waktu Pengembalian</h6>
										<p className="content">-</p>
									</div>
									<div className="col-10 col-md-6 mb-2">
										<h6 className="title">Status</h6>
										<div className="col-11 p-2 status-detail-aset text-center text-capitalize">
											{props.status}
										</div>
									</div>
									<div className="col-10 col-md-6 mb-2">
										<h6 className="title">Sisa Waktu</h6>
										<p className="content">-</p>
									</div>
								</>
							) : (
								<></>
							)}
						</div>
						<div className="row justify-content-end">
							<div className="col-10 col-md-6">
								<h6 className="title">Keterangan</h6>
								<p className="content">{props.request_description}</p>
							</div>
						</div>
						<div className="row justify-content-end">
							<div className="col-10 col-md-6">
								<h6 className="title">Manager</h6>
								<p className="content">{props.manager}</p>
							</div>
							<div className="col-10 col-md-6">
								<h6 className="request curs">Minta Persetujuan</h6>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer className="border-0">
					{props.status === "menunggu persetujuan" ? (
						<>
							<p className="curs" onClick={handleClose}>
								Tolak
							</p>
							<Button className="btn-detail py-2 ms-3 border-0" onClick={handleClose}>
								Terima Pengajuan
							</Button>
						</>
					) : props.status === "disetujui" ? (
						<>
							<p className="curs" onClick={handleClose}>
								Kembali
							</p>
							<Button className="btn-detail py-2 ms-3 border-0" onClick={handleClose}>
								Ajukan Pengembalian
							</Button>
						</>
					) : (
						<>
							<p className="curs" onClick={handleClose}>
								Kembali
							</p>
							<Button className="btn-detail py-2 ms-3 border-0" onClick={handleClose}>
								Ajukan Peminjaman Ulang
							</Button>
						</>
					)}
				</Modal.Footer>
			</Modal>
		</>
	);
};
export { ModalPermohonanManager, ModalPermohonanEmployee, ModalPermohonanAset };
