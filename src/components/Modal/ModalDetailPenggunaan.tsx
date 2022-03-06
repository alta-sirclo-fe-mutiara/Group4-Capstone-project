import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import RequestAssetModal from "../Modal/RequestAssetModal";

type Props = {
  photo: string;
  category: string;
  status: string;
  item: string;
  date: string;
  date_return: string;
  request_description: string;
};

const ModalDetailPenggunaan = (props: Props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  return (
    <>
      <p onClick={handleShow} className="curs mb-0">
        Lihat Detail
      </p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="modal-title">
            Detail Pengguna Aset
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-10 col-md-6">
                <img
                  src={props.photo}
                  alt=""
                  className="rounded-3 img-detail-aset"
                />
              </div>
              <div className="col-10 col-md-6">
                <p className="title mb-1"> {props.category} </p>
                <h5 className=""> {props.item} </h5>
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-3">
              <div className="col-10 col-md-6 mb-2">
                <h6 className="title">Status</h6>
                <div className="col-10 p-2 status-detail-aset text-center">
                  {props.status}
                </div>
                <div className="content "></div>
              </div>
              <div className="col-10 col-md-6">
                <h6 className="title">Waktu Pengajuan</h6>
                <p className="content">{props.date}</p>
              </div>
              <div className="col-10 col-md-6">
                <h6 className="title ">Keterangan</h6>
                <p className="content">{props.request_description}</p>
              </div>
              <div className="col-10 col-md-6">
                <h6 className="title ">Waktu Pengembalian</h6>
                <p className="content">{props.date_return}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <p className="curs" onClick={handleClose}>
            Kembali
          </p>
          <Button
            className="btn-detail py-2 ms-3 border-0"
            onClick={() => {handleClose(); setIsRequestOpen(true) }}
          >
            Ajukan Peminjaman Ulang
          </Button>
        </Modal.Footer>
      </Modal>
      <RequestAssetModal
        show={isRequestOpen}
        closeModal={() => setIsRequestOpen(false)}
      />
    </>
  );
};

export default ModalDetailPenggunaan;
