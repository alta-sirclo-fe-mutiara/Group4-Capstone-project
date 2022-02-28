import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

interface Props {
  show: boolean;
  closeModal: any;
}
//Mapping Category
export default function RequestAssetModal(props: Props) {
  const [category, setCategory] = useState<string>("");
  const [asset, setAsset] = useState<string>("1");
  const [assetData, setAssetData] = useState([]);
  const [description, setDescription] = useState("")

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://dipssyman.space/assets`)
      .then((res) => {
        setAssetData(res.data.data);
        console.log(assetData);
      })
      .catch((err) => {
        console.log(err);
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
          onChange={(e) => setAsset(e.target.value)}
        >
              <option value="1">
                Laptop
              </option>
            );
        </select>
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
        <p>Deskripsi Aset</p>
        <textarea
          className="w-100"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
