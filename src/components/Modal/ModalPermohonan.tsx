import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import RequestAssetModal from "../Modal/RequestAssetModal";
import axios from 'axios';
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import moment from "moment";

type Props = {
  photo?: string;
  category: string;
  asset_name?: string;
  avail?: number;
  user?: String;
  request_date: String;
  divisi?: String;
  return_date?: string;
  status: String;
  time?: String;
  manager?: String;
  request_description: String;
  id_status?:number;
  id?:number;
  fetch?:any;
  id_asset?:number;
};


const ModalPermohonanManager = (props: Props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const timeRemaining = moment(props.return_date).fromNow()

  const changeStatus4 = () =>{
    axios
    .put(`requests/${props.id}`, {id_status:4})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    }).finally(()=>{
      props.fetch()
    })
  }

  const changeStatus3 = () =>{
    axios
    .put(`requests/${props.id}`, {id_status:3})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    }).finally(()=>{
      props.fetch() 
    })
  }
  
  return (
    <>
    {
      props.id_status === 2 ? <><p className="curs" onClick={()=>{changeStatus3()}}><FaCheckCircle className="mr-1" />Terima Permohonan</p> <p className="curs" onClick={()=>changeStatus4()}><FaTimesCircle className="mr-1" />Tolak Permohonan</p> </>: <></>
    }
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
                  src={props.photo}
                  alt=""
                  className="rounded-3 img-detail-aset"
                />
              </div>
              <div className="col-10 col-md-6">
                <p className="title mb-1"> {props.category} </p>
                <h5 className=""> {props.asset_name} </h5>
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
                <p className="content">{props.request_date}</p>
              </div>
              <div className="col-10 col-md-6 mb-2">
                <h6 className="title">Divisi</h6>
                <p className="content">{props.divisi}</p>
              </div>
              <div className="col-10 col-md-6 mb-2">
                <h6 className="title">Waktu Pengembalian</h6>
                <p className="content">{props.return_date}</p>
              </div>
            </div>
            <div className="row">
              {props.id_status === 4 ||
              props.id_status === 3 ||
              props.id_status === 8 ? (
                <>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Status</h6>
                    <div className="col-8 p-2 status-detail-aset text-center">
                      {props.status}
                    </div>
                  </div>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Sisa Waktu </h6>
                    <p className="content">{props.return_date === "0000-00-00 00:00:00" ? <p>-</p> : <p>{timeRemaining}</p>}</p>
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
                    <p className="content">{props.return_date === "0000-00-00 00:00:00" ? <p>-</p> : <p>{timeRemaining}</p>}</p>
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
          {props.id_status === 3 ||
          props.id_status === 4 ||
          props.id_status === 8 ? (
            <Button
              className="btn-detail py-2 ms-3 border-0"
              onClick={handleClose}
            >
              Tutup
            </Button>
          ) : (
            <>
              <p className="curs" onClick={()=>{handleClose(); changeStatus4()}}>
                Tolak
              </p>
              <Button
                className="btn-detail py-2 ms-3 border-0"
                onClick={()=>{handleClose(); changeStatus3()}}
              >
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
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const changeStatus8 = () =>{
    axios
    .put(`requests/${props.id}`, {id_status:8})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    }).finally(()=>{
      props.fetch()
    })
  }

  return (
    <>
     {
      props.id_status === 4 || props.id_status === 5 || props.id_status === 8 ? <p className="curs primeCol" onClick={() => setIsRequestOpen(true)}>Ajukan Peminjaman Ulang </p> 
      : props.id_status === 6 || props.id_status === 7 ? <p className="curs" onClick={()=>changeStatus8()}>Kembalikan</p> : <></>
    }
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
                  src={props.photo}
                  alt=""
                  className="rounded-3 img-detail-aset w-100 h-100"
                />
              </div>
              <div className="col-10 col-md-6">
                <p className="title mb-1"> {props.category} </p>
                <h5 className=""> {props.asset_name} </h5>
                {props.id_status === 2 ? (
                  <p className="title mb-1"> {props.avail} item tersedia</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="row mt-3">
              {props.id_status === 3 || props.id_status === 4 ? (
                <>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Status</h6>
                    <div className="col-5 p-2 status-detail-aset text-center">
                      {props.status}
                    </div>
                  </div>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Waktu Pengajuan</h6>
                    <p className="content">{props.request_date}</p>
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
                    <p className="content">{props.request_date}</p>
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
          {props.id_status === 4 || props.id_status === 5 || props.id_status === 8 ? (
            <>
              <p className="curs" onClick={handleClose}>
                Kembali
              </p>
              <Button
                className="btn-detail py-2 ms-3 border-0"
                onClick={() => {handleClose(); setIsRequestOpen(true) }}
              >
                Ajukan Peminjaman Ulang
              </Button>
            </>
          ) : props.id_status === 6 || props.id_status === 7  ? (
            <>
              <p className="curs" onClick={handleClose}>
                Kembali
              </p>
              <Button
                className="btn-detail py-2 ms-3 border-0"
                onClick={()=>{handleClose(); changeStatus8()}}
              >
                Ajukan Pengembalian
              </Button>
            </>
          ) : (
            <>
              <Button
                className="btn-detail py-2 ms-3 border-0"
                onClick={handleClose}
              >
                Kembali
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      <RequestAssetModal
        show={isRequestOpen}
        closeModal={() => setIsRequestOpen(false)}
        id_asset={props.id_asset}
      />
    </>
  );
};

const ModalPermohonanAset = (props: Props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const timeRemaining = moment(props.return_date).fromNow()

  const changeStatus2 = () =>{
    axios
    .put(`requests/${props.id}`, {id_status:2})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    }).finally(()=>{
      props.fetch()
    })
  }

  const changeStatus5 = () =>{
    axios
    .put(`requests/${props.id}`, {id_status:5})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    }).finally(()=>{
      props.fetch()
    })
  }
  
  const changeStatus6 = () =>{
    axios
    .put(`requests/${props.id}`, {id_status:6})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    }).finally(()=>{
      props.fetch()
    })
  }

  const changeStatus7 = () =>{
    axios
    .put(`requests/${props.id}`, {id_status:7})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    }).finally(()=>{
      props.fetch()
    })
  }
  return (
    <>
    {
      props.id_status === 1 ? <p className="curs primeCol" onClick={changeStatus2}>Minta Persetujuan Manajer </p> 
      : props.id_status === 3 ? <><p className="curs" onClick={()=>changeStatus6()}><FaCheckCircle className="mr-1" />Terima Permohonan</p> <p className="curs" onClick={()=>changeStatus5()}><FaTimesCircle className="mr-1" />Tolak Permohonan</p></> 
      : props.id_status === 6 ? <p className="curs" onClick={changeStatus7}>Ajukan Pengembalian</p> : <></>
    }
      <p onClick={handleShow} className="curs mb-0">
        Lihat Detail
      </p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="modal-title">
            Detail Permohonan Aset 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-10 col-md-4">
                <img
                  src={props.photo}
                  alt=""
                  className="rounded-3 img-detail-aset"
                />
              </div>
              <div className="col-10 col-md-8">
                <p className="title mb-1"> {props.category} </p>
                <h5 className=""> {props.asset_name} </h5>
                {props.id_status === 1 || props.id_status === 2 ? (
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
                <p className="content">{props.request_date}</p>
              </div>
              <div className="col-10 col-md-6 mb-2">
                <h6 className="title">Divisi</h6>
                <p className="content">{props.divisi}</p>
              </div>
              {props.id_status === 2 ? (
                <>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Waktu Pengembalian</h6>
                    <p className="content">{props.return_date}</p>
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
              ) : props.id_status === 1 || props.id_status === 3 ? (
                <>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Waktu Pengembalian</h6>
                    <p className="content">{props.return_date}</p>
                  </div>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Status</h6>
                    <div className="col-11 p-2 status-detail-aset text-center text-capitalize">
                      Menunggu Persetujuan
                    </div>
                  </div>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Sisa Waktu</h6>
                    <p className="content"></p>
                  </div>
                </>
              ) : props.id_status === 6 ? (
                <>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Waktu Pengembalian</h6>
                    <p className="content">-</p>
                  </div>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Status</h6>
                    <div className="col-6 p-2 status-detail-aset text-center text-capitalize">
                      Diterima
                    </div>
                  </div>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Sisa Waktu</h6>
                    <p className="content">-</p>
                  </div>
                </>
              ) : props.id_status === 4 || props.id_status === 5 ? (
                <>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Waktu Pengembalian</h6>
                    <p className="content">-</p>
                  </div>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Status</h6>
                    <div className="col-6 p-2 status-detail-aset text-center text-capitalize">
                      {props.status}
                    </div>
                  </div>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Sisa Waktu</h6>
                    <p className="content">-</p>
                  </div>
                </>
              ) : props.id_status === 8 ? (
                <>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Waktu Pengembalian</h6>
                    <p className="content">-</p>
                  </div>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Status</h6>
                    <div className="col-8 p-2 status-detail-aset text-center text-capitalize">
                      {props.status}
                    </div>
                  </div>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Sisa Waktu</h6>
                    <p className="content">-</p>
                  </div>
                </>
              ) : props.id_status === 7 ? (
                <>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Waktu Pengembalian</h6>
                    <p className="content">-</p>
                  </div>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Status</h6>
                    <div className="col-11 p-2 status-detail-aset text-center text-capitalize">
                      Ajukan Pengembalian
                    </div>
                  </div>
                  <div className="col-10 col-md-6 mb-2">
                    <h6 className="title">Sisa Waktu</h6>
                    <p className="content">{props.return_date === "0000-00-00 00:00:00" ? <p>-</p> : <p>{timeRemaining}</p>}</p>
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
            <div className="row mt-3 justify-content-center">
              <div className="col-10 col-md-6">
                <h6 className="title">Manager</h6>
                <p className="content">{props.manager}</p>
              </div>
              <div className="col-10 col-md-6">
                {props.id_status === 1  ? (
                  <h6 className="request curs" onClick={()=>changeStatus2()}>Minta Persetujuan</h6>
                ) : props.id_status === 2  ? (
                  <h6 className="request curs">Menunggu Persetujuan</h6>
                ) : props.id_status === 4 || props.id_status === 5 ? (
                  <h6 className="request">Ditolak</h6>
                ) : (
                  <h6 className="request">Disetujui</h6>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          {props.id_status === 4? (
            <>
              <p className="curs" onClick={()=>{handleClose(); changeStatus5()}}>
                Tolak
              </p>
              <Button
                className="btn-detail py-2 ms-3 border-0"
                onClick={()=>{handleClose(); changeStatus6()}}
              >
                Terima Pengajuan
              </Button>
            </>
          ) : props.id_status === 6 ? (
            <>
              <p className="curs" onClick={handleClose}>
                Kembali
              </p>
              <Button
                className="btn-detail py-2 ms-3 border-0"
                onClick={()=>{handleClose(); changeStatus7()}}
              >
                Ajukan Pengembalian
              </Button>
            </>
          ) : (
            <>
              <h6 className="curs px-2" onClick={handleClose}>
                Kembali
              </h6>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export { ModalPermohonanManager, ModalPermohonanEmployee, ModalPermohonanAset };
