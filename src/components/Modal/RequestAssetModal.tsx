import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

interface Props {
  show: boolean;
  closeModal: any;
  fetch?:any
}
export default function RequestAssetModal(props: Props) {
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState<string>("1");
  const [assetData, setAssetData] = useState<any>([]);
  const [asset, setAsset] = useState<string>("1");
  const [description, setDescription] = useState("");
  const [newCategory, setNewCategory] = useState(false)
  const user = localStorage.getItem("id");
  const id_user = user ? parseInt(user) : 0;
  const id_asset = newCategory ? parseInt(assetData[0]?.id) : parseInt(asset);

  useEffect(() => {
    fetchAssetData();
    fetchCategoryData();
  }, [category]);

  const fetchAssetData = () => {
    axios
      .get(`/assets?category=${category}`)
      .then((res) => {
        setAssetData(res.data.data.data);
        console.log(assetData);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const fetchCategoryData = () => {
    axios
      .get(`/assets/categories`)
      .then((res) => {
        setCategoryData(res.data.data);
        console.log(categoryData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const requestHandle = () => {
    axios
      .post(`/requests`, {
        id_asset,
        id_user,
        description,
      })
      .then((e) => {
        alert("Permohonan Aset berhasil dilakukan !");
        console.log(e);
      })
      .catch((e) => {
        alert(e);
      })
      .finally(()=>{
        props.fetch()
      })
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
          onChange={(e) => {setCategory(e.target.value);setNewCategory(true)}}
        >
          {categoryData?.map((item: any) => {
            return <option value={item.id}>{item.description}</option>;
          })}
          );
        </select>
        <p>Nama Aset</p>
        <select
          className="form-select"
          name="category"
          aria-label="Default select example"
          onChange={(e) => {setAsset(e.target.value);setNewCategory(false)}}
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
        <p className="modalBtn curs" onClick={() => requestHandle()}>
          Request Aset
        </p>
      </Modal.Footer>
    </Modal>
  );
}
