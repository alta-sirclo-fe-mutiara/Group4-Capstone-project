import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

interface Props {
  show: boolean;
  closeModal: any;
}
//Mapping Employee, moment js format, post request
export default function AssignAssetModal(props: Props) {
  const [employee, setEmployee] = useState<string>("");
  const [asset, setAsset] = useState<string>("1");
  const [assetData, setAssetData] = useState([1,2]);
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [return_date, setReturnDate]= useState()
  const [description, setDescription] = useState("")
  console.log(assetData, )
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://dipssyman.space/assets`)
      .then((res) => {
        setAssetData(res.data.data.data)
        console.log(assetData);
      })
      .catch((err) => {
        console.log(err);
      });
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
          onChange={(e) => setAsset(e.target.value)}
        >
          <option value="1">Zuki Marzuki - Marketing</option>
        </select>
        <p>Deskripsi Aset</p>
        <textarea
          className="w-100"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="d-flex">
          <div className="d-flex align-items-center">
        <input type="checkbox"  defaultChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)} ></input>
        </div>
        <p>Gunakan Tanggal Pengembalian</p>
        </div>
        <p>Tanggal Pengembalian</p>
        <input
          type="datetime-local"
          className="w-100"
          value={return_date}
          disabled={!isChecked}
          onChange={(e:any) => setReturnDate(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <p onClick={props.closeModal} className="curs">
          Kembali
        </p>
        <p className="modalBtn curs">Assign Ke Karyawan</p>
      </Modal.Footer>
    </Modal>
  );
}
