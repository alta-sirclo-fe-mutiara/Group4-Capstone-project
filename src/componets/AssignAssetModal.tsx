import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

interface Props {
  show: boolean;
  closeModal: any;
}
//Mapping Employee, moment js format, post request
export default function AssignAssetModal(props: Props) {
  const [userData, setUserData] = useState<any>([]);
  const [asset, setAsset] = useState<string>("1");
  const [assetData, setAssetData] = useState([]);
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [return_date, setReturnDate]= useState()
  const [description, setDescription] = useState("")
  console.log(assetData, )
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchData = () => {
    axios
      .get(`/assets`)
      .then((res) => {
        setAssetData(res.data.data.data)
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
        setUserData(res)
        console.log(userData);
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
          {assetData?.map((item: any) => {
            return (
              <option value={item.id}>
                {item.name}
              </option>
            );
          })}
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
