import { HiDotsHorizontal } from "react-icons/hi";
interface Props {
	name: string;
	status: string;
	image: string;
	date: string;
	desc: string;
}

export default function ActivityCard(props: Props) {
	return (
		<div className="shadow bg-white rounded text-left m-3 scrChi d-flex flex-column justify-content-between">
			<div className="row p-3">
				<img src={props.image} className="col-5" alt="activity img" />
				<div className="col-7">
					<p className="actDate noSpace">{props.date}</p>
					<p className="font-weight-bold noSpace">{props.name}</p>
					<p className="noSpace">{props.desc}</p>
				</div>
			</div>
			<div className="d-flex justify-content-between px-3 pt-2 noSpace bGray position-relative">
				<p className="text-capitalize">{props.status}</p>
				<p className="curs px-3">
					<HiDotsHorizontal />
				</p>
				<div className="tiptool tip1 border border-1 shadow rounded-3 bg-white px-3 py-2 d-block">
					<p className="curs mb-0">Lihat Detail</p>
					{props.status === "menunggu persetujuan" ? (
						<p className="curs mb-0 batal">Batalkan Pengajuan</p>
					) : props.status === "disetujui" ? (
						<p className="curs mb-0 ajukan">Ajukan Pengembalian</p>
					) : (
						<p className="curs mb-0 ajukan">Ajukan Peminjaman Ulang</p>
					)}
				</div>
			</div>
		</div>
	);
}
