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
  const [user, setUser] = useState<string>("5");
  const [assetData, setAssetData] = useState([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [return_date, setReturnDate] = useState<any>({});
  const [description, setDescription] = useState("");
  const id_user = parseInt(user);
  const id_asset = parseInt(asset);
  console.log(user, asset, description, return_date);
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
          className="w-100"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="d-flex">
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              defaultChecked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            ></input>
          </div>
          <p>Gunakan Tanggal Pengembalian</p>
        </div>
        <p>Tanggal Pengembalian</p>
        <input
          type="datetime-local"
          className="w-100"
          value={return_date}
          disabled={!isChecked}
          onChange={(e: any) => setReturnDate(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <p onClick={props.closeModal} className="curs">
          Kembali
        </p>
        <p className="modalBtn curs" onClick={() => assignHandle()}>
          Assign Ke Karyawan
        </p>
      </Modal.Footer>
    </Modal>
  );
}
